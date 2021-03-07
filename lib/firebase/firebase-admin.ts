import admin from "firebase-admin";
import * as creds from "../../market-site-dev.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: creds.project_id,
      privateKey: creds.private_key,
      clientEmail: creds.client_email,
    }),
  });
}

const auth = admin.auth();

export { auth };
