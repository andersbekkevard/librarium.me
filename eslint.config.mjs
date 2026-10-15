import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTs,
  { ignores: [".next/**", ".legacy/**", "legacy/**", "next-env.d.ts", "analysis/**", "kiro/**", "playwright-report/**"] },
];

export default config;
