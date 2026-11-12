"use client";

import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

// Descriptions start empty during server rendering and hydration. DOMPurify
// needs the browser DOM; untrusted HTML must never be rendered before it runs.
export function useSanitizedBookDescription(description?: string) {
  const [sanitized, setSanitized] = useState("");

  useEffect(() => {
    setSanitized(DOMPurify.sanitize(description ?? "", {
      ALLOWED_TAGS: ["b", "i", "em", "strong", "p", "br", "ul", "ol", "li"],
      ALLOWED_ATTR: [],
      ALLOW_DATA_ATTR: false,
      ALLOW_ARIA_ATTR: false,
    }));
  }, [description]);

  return sanitized;
}
