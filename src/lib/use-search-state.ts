"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

/** Page state kept in the query string; values equal to their default are left out of the URL. */
export function useSearchState<T extends Record<string, string>>(defaults: T): [T, (updates: Partial<T>) => void] {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const state = Object.fromEntries(Object.entries(defaults).map(([k, d]) => [k, params.get(k) ?? d])) as T;
  const update = (updates: Partial<T>) => {
    const next = new URLSearchParams(params);
    for (const [k, v] of Object.entries(updates)) {
      if (v === undefined || v === "" || v === defaults[k]) next.delete(k);
      else next.set(k, v);
    }
    router.replace(next.size ? `${pathname}?${next}` : pathname, { scroll: false });
  };
  return [state, update];
}
