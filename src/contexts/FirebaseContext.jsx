import React, { useContext, useState, useEffect } from 'react';
import { auth, db, firestoreTimestamp, increment, storage } from '../firebase';
import PropTypes from 'prop-types';
import Loading from '../components/Loading/Loading';

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

    function getReaction(articleId) {
        return usersRef
            .doc(currentUser.uid)
            .collection('reactions')
            .doc(articleId)
            .get();
    }

    function getUser(uid) {
        return usersRef
            .doc(uid)
            .get();
    }

    function getUserArticles() {
        return articlesRef
            .where('authorId', '==', currentUser.uid)
            .get();
    }

    // TODO: make this work with time constraint
    function getTopArticles(limit = 3) {
        let weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return articlesRef
            .orderBy('views', 'desc')
            .limit(limit)
            .get();
    }

    function setArticle(authorId, content, title, subtitle = '', articleId = undefined) {
        const now = firestoreTimestamp(new Date());
        if (!articleId) {
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
        } else {
            return articlesRef
                .doc(articleId)
                .set({
                    content: content,
                    lastModified: now,
                    subtitle: subtitle,
                    title: title,
                }, { merge: true });
        }
    }

    function setView(articleId) {
        if (currentUser) {
            const now = firestoreTimestamp(new Date());
            const batch = db.batch();
            const viewRef = userDoc.ref.collection('views').doc(articleId);
            const articleRef = articlesRef.doc(articleId);
            return viewRef.get()
                .then((value) => {
                    if (value.exists) {
                        return viewRef
                            .set({
                                lastViewed: now,
                                numViews: increment,
                            }, { merge: true });
                    } else {
                        batch.set(viewRef, {
                            lastViewed: now,
                            numViews: 1,
                        });
                        batch.set(articleRef, {
                            views: increment,
                        }, { merge: true });
                        return batch.commit();
                    }
                });
        }
    }

    function updateProfile(updates) {
        return userDoc.ref
            .update(
                updates
            );
    }

    function updateReaction(articleId, reaction) {
        return usersRef
            .doc(currentUser.uid)
            .collection('reactions')
            .doc(articleId)
            .set({
                reaction: reaction,
            });
    }

    function uploadProfilePic(pic) {
        const name = `profile.${pic.type === 'image/jpeg' ? 'jpg' : 'png'}`;
        const userPic = storage.ref(`${currentUser.uid}/${name}`);

        return userPic.put(pic);
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
        let mounted = true;
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            if (user) {
                getUser(user.uid)
                    .then((value) => {
                        if (mounted) {
                            if (value.exists) {
                                setUserDoc(value);
                            } else {
                                setUserDoc();
                            }
                            setLoading(false);
                        }
                    })
                    .catch((error) => {
                        if (mounted) {
                            console.log(error);
                            setUserDoc();
                            setLoading(false);
                        }
                    });
            } else {
                setUserDoc();
                setLoading(false);
            }

        });

        return () => {
            mounted = false;
            unsubscribe();
        };
    }, []);

    const value = {
        currentUser,
        userDoc,
        getArticle,
        getNewestArticles,
        getTopArticles,
        getReaction,
        getUser,
        getUserArticles,
        setArticle,
        setView,
        login,
        signOut,
        signup,
        updateProfile,
        updateReaction,
        uploadProfilePic,
    };

    return (
        <Firebase.Provider value={value}>
            {!loading ?
                children :
                <Loading />
            }
        </Firebase.Provider>
    );
}

FirebaseProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};
