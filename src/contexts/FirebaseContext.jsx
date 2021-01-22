import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import PropTypes from 'prop-types';

const Firebase = React.createContext();

export function useAuth() {
    return useContext(Firebase);
}

export function FirebaseProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [userDoc, setUserDoc] = useState();
    const [loading, setLoading] = useState(true);

    const usersRef = db.collection('users');

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function signOut() {
        return auth.signOut();
    }

    function getUserDoc() {
        if (currentUser) {
            usersRef.doc(String(currentUser.uid)).get()
                .then((value) => {
                    if (value.exists) {
                        setUserDoc(value);
                    } else {
                        setUserDoc();
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setUserDoc();
                });
        } else {
            setUserDoc();
        }

    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        getUserDoc();
    }, [currentUser]);

    const value = {
        currentUser,
        userDoc,
        login,
        signOut,
        signup,
    };

    return (
        <Firebase.Provider value={value}>
            {!loading && children}
        </Firebase.Provider>
    );
}

FirebaseProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};
