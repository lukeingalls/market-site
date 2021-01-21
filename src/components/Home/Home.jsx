import React from 'react';
import { Container } from 'react-bootstrap';
import ArticleCardDeck from '../Article/ArticleCardDeck/ArticleCardDeck';
import ArticleHighlight from '../Article/ArticleHighlight/ArticleHighlight';

export default function Home() {
    return (
        <Container>
            <ArticleHighlight />
            {/* <br /> */}
            <Container>
                <h3 className="text-center my-4">Popular Articles</h3>
                <ArticleCardDeck />
            </Container>
            {/* <br /> */}
            <Container>
                <h3 className="text-center my-4">New Articles</h3>
                <ArticleCardDeck />
            </Container>
        </Container>
    );
}
