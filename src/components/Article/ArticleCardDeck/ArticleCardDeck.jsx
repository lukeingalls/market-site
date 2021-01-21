import React from 'react';
import { CardDeck } from 'react-bootstrap';
import ArticleCard from '../ArticleCard/ArticleCard';

export default function ArticleCardDeck() {

    let cards = [];

    for (let i = 0; i < 5; i++) {
        cards = [...cards, <ArticleCard key={i} />];
    }

    return (
        <CardDeck>
            {cards}
        </CardDeck>
    );
}
