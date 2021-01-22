import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

function firestoreTimestamp(date) {
    return firebase.firestore.Timestamp.fromDate(date);
}

const auth = app.auth();
const db = app.firestore();
if (location.hostname === 'localhost') {
    console.log('Connecting to emulated db...');
    db.useEmulator('localhost', 8080);
    auth.useEmulator('http://localhost:9099');
}
export { auth, db, firestoreTimestamp };
export default app;
