import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ArticleCardDeck from '../Article/ArticleCardDeck/ArticleCardDeck';
import ArticleHighlight from '../Article/ArticleHighlight/ArticleHighlight';
import { useAuth } from '../../contexts/FirebaseContext';
import Loading from '../Loading/Loading';

export default function Home() {
    const { getNewestArticles, getTopArticles } = useAuth();
    const [newestArticles, setNewestArticles] = useState();
    const [popularArticles, setPopularArticles] = useState();
    const [topArticle, setTopArticle] = useState();
    const [loading, setLoading] = useState(true);

    // const sortByViews = (a, b) => {
    //     return b.data().views - a.data().views;
    // };

    useEffect(() => {
        let mounted = true;

        getNewestArticles(4)
            .then((value) => {
                if (mounted) {
                    if (!value.empty) {
                        setNewestArticles(value.docs);
                    } else {
                        console.log('Couldn\'t fetch newest articles', value);
                    }
                }
            })
            .catch((error) => {
                if (mounted) {
                    console.log(error);
                }
            });
        
        getTopArticles(5)
            .then((value) => {
                if (mounted) {
                    if (!value.empty) {
                        const docs = value.docs;

                        setTopArticle(docs[0]);
                        setPopularArticles(
                            docs
                                .slice(1, docs.length)
                        );
                    } else {
                        console.log('Couldn\'t fetch top articles', value);
                    }
                    setLoading(false);
                }
            })
            .catch((error) => {
                if (mounted) {
                    console.log(error);
                    setLoading(false);
                }
            });

        return () => {
            mounted = false;
        };
    }, []);

    if (loading) {
        return (
            <Loading />
        );
    } else {
        return (
            <Container>
                {topArticle && 
                    <ArticleHighlight Article={topArticle}/>
                }
                {(popularArticles && popularArticles.length > 1) &&
                    <Container>
                        <h3 className="text-center my-4">Popular Articles</h3>
                        <ArticleCardDeck Articles={popularArticles} />
                    </Container>
                }
                {newestArticles &&
                    <Container>
                        <h3 className="text-center my-4">New Articles</h3>
                        <ArticleCardDeck Articles={newestArticles} />
                    </Container>
                }
            </Container>
        );
    }
}
