import { renderHook } from "@testing-library/react";
import { useSanitizedBookDescription } from "../useSanitizedBookDescription";

describe("book description sanitization", () => {
  it("preserves basic formatting while removing executable HTML and attributes", () => {
    const { result } = renderHook(() => useSanitizedBookDescription(
      '<p onclick="alert(1)">Read <strong>this</strong><br><em>book</em></p>' +
      '<img src=x onerror="alert(1)"><script>alert(1)</script>' +
      '<svg onload="alert(1)"></svg><a href="javascript:alert(1)">link</a>'
    ));
    expect(result.current).toBe('<p>Read <strong>this</strong><br><em>book</em></p>link');
  });

  it("sanitizes replacement descriptions and handles missing descriptions", () => {
    const { result, rerender } = renderHook(
      ({ description }: { description?: string }) => useSanitizedBookDescription(description),
      { initialProps: { description: '<b>First</b>' } }
    );
    rerender({ description: '<ul><li style="color:red">Second</li></ul>' });
    expect(result.current).toBe('<ul><li>Second</li></ul>');
    rerender({ description: undefined });
    expect(result.current).toBe('');
  });
});
