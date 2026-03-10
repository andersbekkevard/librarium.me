import Image from "next/image";

export function ScreenshotSection() {
  return (
    <section className="mx-auto max-w-[640px] px-6 mt-20">
      <div className="border border-[#E8E8E8]">
        <Image
          src="/images/dashboard.png"
          alt="Librarium — track your reading, follow friends, explore together"
          width={1280}
          height={800}
          className="w-full h-auto block"
          priority
        />
      </div>
      <p className="text-[13px] text-[#666666] mt-3">
        Track your reading, follow friends, explore together.
      </p>
    </section>
  );
}
