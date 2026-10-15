/** Loads a module of the pinned pre-modernization code (.legacy/, see scripts/legacy.sh), untyped. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const legacy = (path: string): Promise<any> => import(/* @vite-ignore */ `../.legacy/src/lib/${path}`);
