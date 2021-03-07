import * as functions from "firebase-functions";
import { User } from "../../lib/db/models";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const newUser = functions.auth.user().onCreate(async (user, context) => {
  console.log(user);
  return User.create({
    idUsers: user.uid,
    email: user.email,
    displayName: user.displayName,
  } as User).then((val) => {
    functions.logger.log(val);
  });
});

// export const checkuserfunc = functions.firestore
//   .document("tests/{test}")
//   .onCreate(() => {
//     return functions.logger.log("Func");
//     // return User.create({
//     //   idUsers: "ABCD",
//     //   email: "luke@apple.com",
//     //   displayName: "Luke",
//     // } as User);
//   });
