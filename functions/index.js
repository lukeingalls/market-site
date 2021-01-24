const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.createUser = functions.auth.user()
    .onCreate((user) => {
        const { uid, displayName, email } = user;

        return admin.firestore()
            .collection('users')
            .doc(uid)
            .set({
                author: false,
                displayName: displayName,
                email: email,
                uid: uid,
            });
    });

exports.sumReactions = functions.firestore
    .document('users/{userId}/reactions/{articleId}')
    .onUpdate((change, context) => {
        const articleRef = db.collection('articles').doc(context.params.articleId);
        const oldReaction = change.before.data().reaction;
        const newReaction = change.after.data().reaction;
        // functions.logger.log(articleRef);
        if (oldReaction !== newReaction) {
            if (oldReaction && newReaction) {
                return articleRef
                    .set({
                        [`reactions.${oldReaction}`]: admin.firestore.FieldValue.increment(-1),
                        [`reactions.${newReaction}`]: admin.firestore.FieldValue.increment(1),
                    }, { merge: true });
            } else if (oldReaction) {
                return articleRef
                    .set({
                        [`reactions.${oldReaction}`]: admin.firestore.FieldValue.increment(-1),
                    }, { merge: true });
            } else {
                return articleRef
                    .set({
                        [`reactions.${newReaction}`]: admin.firestore.FieldValue.increment(1),
                    }, { merge: true });
            }
        } else return null;
    })