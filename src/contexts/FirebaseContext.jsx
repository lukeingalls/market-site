import React, { useContext, useState, useEffect } from 'react';
import { auth, db, firestoreTimestamp } from '../firebase';
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
    const articlesRef = db.collection('articles');

    function getArticle(articleId) {
        return articlesRef
            .doc(articleId)
            .get();
    }
    
    function getNewestArticles(limit = 3) {
        return articlesRef
            .orderBy('created', 'desc')
            .limit(limit)
            .get();
    }

    function setArticle(authorId, content, title, subtitle = '') {
        const now = firestoreTimestamp(new Date());
        
        return articlesRef
            .add({
                authorId: authorId,
                content: content,
                created: now,
                lastModified: now,
                subtitle: subtitle,
                title: title,
                views: 0,
            });
    }
    
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }
    
    function signOut() {
        return auth.signOut();
    }
    
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        
        return unsubscribe;
    }, []);
    
    useEffect(() => {
        let mounted = true;
        if (currentUser) {
            usersRef.doc(String(currentUser.uid)).get()
                .then((value) => {
                    if (mounted) {
                        if (value.exists) {
                            setUserDoc(value);
                        } else {
                            setUserDoc();
                        }
                    }
                })
                .catch((error) => {
                    if (mounted) {
                        console.log(error);
                        setUserDoc();
                    }
                });
        } else {
            setUserDoc();
        }

        return () => {
            mounted = false;
        };
    }, [currentUser]);

    const value = {
        currentUser,
        userDoc,
        getArticle,
        getNewestArticles,
        setArticle,
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
