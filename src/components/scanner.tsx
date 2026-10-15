"use client";

import { ArrowCounterClockwiseIcon, CameraIcon, CameraSlashIcon, CropIcon, FlashlightIcon, ImageIcon, UploadSimpleIcon, WarningCircleIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { BarcodeFormat, BarcodeScanner, BarcodeScannerProvider, useTorch } from "react-barcode-scanner";
import { barcodeDetectorPolyfillReady } from "react-barcode-scanner/polyfill";
import { extractISBN, searchVolumes, volumeToBook, type GoogleVolume } from "@/lib/books-api";
import { useLibrary } from "@/lib/store";
import type { NewBook } from "@/lib/types";
import { attempt } from "./toast";
import { Badge, Button, buttonClass, cn, Segmented, Spinner } from "./ui";
import { VolumeCard } from "./volume";

type Method = "camera" | "upload";
type Status =
  | { kind: "idle" }
  | { kind: "searching"; isbn: string }
  | { kind: "found"; isbn: string; volume: GoogleVolume; method: Method }
  | { kind: "error"; message: string };

const FORMATS = [BarcodeFormat.EAN_13, BarcodeFormat.UPC_A, BarcodeFormat.CODE_128];

/** Scan an ISBN barcode with the camera or from a photo, look it up, and add it. */
export function Scanner({ onAdded }: { onAdded: (id: string, book: NewBook) => void }) {
  const { actions } = useLibrary();
  const [method, setMethod] = useState<Method>("camera");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [adding, setAdding] = useState(false);
  const capturedAt = useRef(0);

  const lookup = async (raw: string, via: Method) => {
    capturedAt.current = Date.now();
    const isbn = extractISBN(raw);
    if (!isbn) return setStatus({ kind: "error", message: "No valid ISBN found in barcode. Please try again or enter the book manually." });
    setStatus({ kind: "searching", isbn });
    try {
      const [volume] = await searchVolumes(isbn, "isbn", 5);
      setStatus(volume ? { kind: "found", isbn, volume, method: via } : { kind: "error", message: "Book not found in Google Books. You can add it manually instead." });
    } catch {
      setStatus({ kind: "error", message: "Failed to search for book. Please try again or check your internet connection." });
    }
  };

  const add = async (found: Extract<Status, { kind: "found" }>) => {
    setAdding(true);
    const book = volumeToBook(found.volume);
    let id = "";
    const scan = { method: found.method, isbn: found.isbn, seconds: (Date.now() - capturedAt.current) / 1000 };
    if (await attempt(actions.addScannedBook(book, scan).then((x) => void (id = x)), `Added “${book.title}” to your library`)) {
      onAdded(id, book);
      setStatus({ kind: "idle" });
    }
    setAdding(false);
  };

  return (
    <div className="space-y-5">
      <Segmented
        label="Scan from"
        value={method}
        onChange={(m) => (setMethod(m), setStatus({ kind: "idle" }))}
        options={[{ value: "camera", label: <><CameraIcon /> Camera</> }, { value: "upload", label: <><UploadSimpleIcon /> Photo</> }]}
      />
      {status.kind === "found" ? (
        <div className="space-y-4 animate-settle">
          <VolumeCard volume={status.volume} added={false} adding={adding} onAdd={() => add(status)} />
          <Button variant="outline" onClick={() => setStatus({ kind: "idle" })} disabled={adding}><ArrowCounterClockwiseIcon /> Scan another book</Button>
        </div>
      ) : (
        <div className="relative">
          {method === "camera" ? <Camera paused={status.kind !== "idle"} onCode={(c) => lookup(c, "camera")} /> : <Upload onCode={(c) => lookup(c, "upload")} />}
          {status.kind === "searching" && (
            <div className="absolute inset-0 grid place-items-center rounded-2xl bg-background/80 backdrop-blur-sm animate-fade">
              <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground"><Spinner /> Looking up <Badge tone="outline">{status.isbn}</Badge></div>
            </div>
          )}
        </div>
      )}
      {status.kind === "error" && (
        <div role="alert" className="flex gap-3 rounded-xl border border-status-error/25 bg-status-error/8 p-4 animate-settle">
          <WarningCircleIcon className="mt-0.5 size-5 shrink-0 text-status-error" />
          <div className="space-y-3">
            <p className="text-sm text-foreground">{status.message}</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setStatus({ kind: "idle" })}>Try again</Button>
              <Link href="/add-books?tab=manual" className={buttonClass("ghost", "sm")}>Add manually</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const cameraMessage = (e: Error) => {
  const m = `${e.name} ${e.message}`.toLowerCase();
  if (/permission|denied|notallowed/.test(m)) return "Camera access denied. Please allow camera permissions to scan barcodes.";
  if (/notfound|no camera/.test(m)) return "No camera found on this device. Try scanning a photo instead.";
  if (/security|https|notsupported/.test(m)) return "Camera access requires a secure (HTTPS) connection.";
  return "Unable to access the camera. Try scanning a photo instead.";
};

function Camera(props: { paused: boolean; onCode: (code: string) => void }) {
  return (
    <BarcodeScannerProvider>
      <CameraView {...props} />
    </BarcodeScannerProvider>
  );
}

function CameraView({ paused, onCode }: { paused: boolean; onCode: (code: string) => void }) {
  const [error, setError] = useState<string>();
  const last = useRef("");
  const torch = useTorch();
  if (error)
    return (
      <div className="flex aspect-video flex-col items-center justify-center gap-3 rounded-2xl bg-muted p-6 text-center">
        <CameraSlashIcon className="size-10 text-muted-foreground" />
        <p className="max-w-sm text-sm text-muted-foreground">{error}</p>
        <Button variant="outline" size="sm" onClick={() => setError(undefined)}><CameraIcon /> Try again</Button>
      </div>
    );
  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
      <BarcodeScanner
        className="size-full object-cover"
        paused={paused}
        options={{ formats: FORMATS, delay: 500 }}
        trackConstraints={{ facingMode: "environment" }}
        onCameraError={(e) => setError(cameraMessage(e))}
        onCapture={(codes) => {
          const code = codes[0]?.rawValue;
          if (code && code !== last.current) onCode((last.current = code));
        }}
      />
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="relative h-2/5 w-3/4 overflow-hidden rounded-xl border-2 border-white/80 shadow-[0_0_0_100vmax_rgb(0_0_0/0.35)]">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-brand-accent shadow-[0_0_12px_2px] shadow-brand-accent [animation:scanline_2.2s_ease-in-out_infinite_alternate]" />
        </div>
        <p className="absolute bottom-4 rounded-full bg-black/50 px-3 py-1 text-xs text-white">Position the barcode within the frame</p>
      </div>
      {torch.isTorchSupported && (
        <Button size="icon" variant="ghost" aria-label="Toggle flashlight" aria-pressed={torch.isTorchOn} onClick={() => torch.setIsTorchOn(!torch.isTorchOn)} className="absolute right-3 top-3 bg-black/50 text-white hover:bg-black/70 hover:text-white">
          <FlashlightIcon weight={torch.isTorchOn ? "fill" : "regular"} />
        </Button>
      )}
    </div>
  );
}

async function detect(image: Blob): Promise<string | undefined> {
  await barcodeDetectorPolyfillReady;
  const detector = new (window as unknown as { BarcodeDetector: new (o: object) => { detect(i: ImageBitmapSource): Promise<{ rawValue: string }[]> } }).BarcodeDetector({ formats: FORMATS });
  return (await detector.detect(await createImageBitmap(image)))[0]?.rawValue;
}

type Rect = { x: number; y: number; w: number; h: number };

function Upload({ onCode }: { onCode: (code: string) => void }) {
  const [file, setFile] = useState<{ blob: Blob; url: string } | null>(null);
  const [message, setMessage] = useState<string>();
  const [busy, setBusy] = useState(false);
  const [crop, setCrop] = useState<Rect | null>(null);
  const [cropping, setCropping] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  const origin = useRef<{ x: number; y: number } | null>(null);

  const scan = async (blob: Blob) => {
    setBusy(true);
    setMessage(undefined);
    try {
      const code = await detect(blob);
      if (code) onCode(code);
      else setMessage("No barcode detected in this image. Try cropping it to just the barcode.");
    } catch {
      setMessage("Barcode detection failed in this browser. Try the camera instead.");
    }
    setBusy(false);
  };
  const choose = (f?: File) => {
    if (!f) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(f.type)) return setMessage("Please select a JPEG, PNG or WebP image.");
    if (f.size > 10 * 1024 * 1024) return setMessage("Image size must be less than 10MB.");
    setFile({ blob: f, url: URL.createObjectURL(f) });
    setCrop(null);
    scan(f);
  };
  const point = (e: React.PointerEvent) => {
    const r = img.current!.getBoundingClientRect();
    return { x: Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), y: Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)) };
  };
  const scanCrop = () => {
    const el = img.current!;
    if (!crop || crop.w < 0.02 || crop.h < 0.02) return;
    const canvas = document.createElement("canvas");
    const [sx, sy, sw, sh] = [crop.x * el.naturalWidth, crop.y * el.naturalHeight, crop.w * el.naturalWidth, crop.h * el.naturalHeight];
    Object.assign(canvas, { width: sw, height: sh });
    canvas.getContext("2d")!.drawImage(el, sx, sy, sw, sh, 0, 0, sw, sh);
    canvas.toBlob((b) => b && (setCropping(false), scan(b)), "image/jpeg", 0.9);
  };

  if (!file)
    return (
      <label
        onDragOver={(e) => (e.preventDefault(), setDragOver(true))}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => (e.preventDefault(), setDragOver(false), choose(e.dataTransfer.files[0]))}
        className={cn("flex aspect-video cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-6 text-center transition-colors", dragOver ? "border-brand-accent bg-brand-accent/8" : "border-border hover:border-brand-accent/50 hover:bg-muted/50")}
      >
        <ImageIcon className="size-10 text-brand-accent" weight="duotone" />
        <span className="font-medium">Drop a photo of the barcode, or click to choose</span>
        <span className="text-xs text-muted-foreground">JPEG, PNG or WebP · up to 10MB</span>
        {message && <span className="text-sm text-status-error">{message}</span>}
        <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(e) => choose(e.target.files?.[0])} />
      </label>
    );

  return (
    <div className="space-y-3">
      <div
        className={cn("relative mx-auto w-fit select-none overflow-hidden rounded-2xl", cropping && "cursor-crosshair touch-none")}
        onPointerDown={(e) => cropping && ((origin.current = point(e)), setCrop({ ...origin.current, w: 0, h: 0 }))}
        onPointerMove={(e) => {
          if (!cropping || !origin.current) return;
          const p = point(e), o = origin.current;
          setCrop({ x: Math.min(o.x, p.x), y: Math.min(o.y, p.y), w: Math.abs(p.x - o.x), h: Math.abs(p.y - o.y) });
        }}
        onPointerUp={() => (origin.current = null)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- a local object URL being cropped, not a remote asset */}
        <img ref={img} src={file.url} alt="Uploaded barcode" className="max-h-80 w-auto" draggable={false} />
        {cropping && crop && (
          <div className="absolute border-2 border-brand-accent shadow-[0_0_0_100vmax_rgb(0_0_0/0.45)]" style={{ left: `${crop.x * 100}%`, top: `${crop.y * 100}%`, width: `${crop.w * 100}%`, height: `${crop.h * 100}%` }} />
        )}
        {busy && <div className="absolute inset-0 grid place-items-center bg-background/70"><Spinner /></div>}
      </div>
      {cropping && <p className="text-center text-xs text-muted-foreground">Drag across the barcode to select it.</p>}
      {message && !cropping && <p className="text-center text-sm text-status-error">{message}</p>}
      <div className="flex flex-wrap justify-center gap-2">
        {cropping ? (
          <>
            <Button size="sm" onClick={scanCrop} disabled={!crop || crop.w < 0.02}><CropIcon /> Scan selection</Button>
            <Button size="sm" variant="ghost" onClick={() => setCropping(false)}>Cancel</Button>
          </>
        ) : (
          <>
            {message && <Button size="sm" variant="soft" onClick={() => (setCropping(true), setCrop(null))}><CropIcon /> Crop to barcode</Button>}
            <Button size="sm" variant="outline" onClick={() => (setFile(null), setMessage(undefined))}><UploadSimpleIcon /> Choose another photo</Button>
          </>
        )}
      </div>
    </div>
  );
}
