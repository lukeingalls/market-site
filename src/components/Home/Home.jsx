import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ArticleCardDeck from '../Article/ArticleCardDeck/ArticleCardDeck';
import ArticleHighlight from '../Article/ArticleHighlight/ArticleHighlight';
import { useAuth } from '../../contexts/FirebaseContext';

export default function Home() {
    const { getNewestArticles } = useAuth();
    const [newestArticles, setNewestArticles] = useState();

    useEffect(() => {
        let mounted = true;

        getNewestArticles()
            .then((value) => {
                if (mounted) {
                    if (!value.empty) {
                        setNewestArticles(value);
                    } else {
                        console.log('Couldn\'t fetch newest articles');
                    }
                }
            })
            .catch((error) => {
                if (mounted) {
                    console.log(error);
                }
            });
        return () => {
            mounted = false;
        };
    }, []);

    console.log(newestArticles);

    return (
        <Container>
            <ArticleHighlight />
            {/* <Container>
                <h3 className="text-center my-4">Popular Articles</h3>
                <ArticleCardDeck />
            </Container> */}
            {newestArticles &&
                <Container>
                    <h3 className="text-center my-4">New Articles</h3>
                    <ArticleCardDeck Articles={newestArticles} />
                </Container>
            }
        </Container>
    );
}
