import firebase from "firebase";

let app, auth;

if (!firebase.apps.length) {
  app = firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    appId: process.env.NEXT_APP_ID,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  });

  auth = app.auth();

  // if (process.env.NEXT_USE_EMULATOR === "true") {
  //   console.log("using auth...");
  //   auth.useEmulator("http://localhost:9099");
  // }
}

export { app, auth };
