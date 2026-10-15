import { getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const env = process.env;
const useEmulators = env.NEXT_PUBLIC_FIREBASE_EMULATORS === "true";

export const app =
  getApps()[0] ??
  initializeApp({
    apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  });
export const auth = getAuth(app);
export const db = getFirestore(app);

const g = globalThis as { __librariumEmulators?: boolean };
if (useEmulators && !g.__librariumEmulators) {
  g.__librariumEmulators = true;
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
}

if (typeof window !== "undefined" && env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID && !useEmulators) {
  import("firebase/analytics").then(({ getAnalytics, isSupported }) => isSupported().then((ok) => ok && getAnalytics(app)));
}
