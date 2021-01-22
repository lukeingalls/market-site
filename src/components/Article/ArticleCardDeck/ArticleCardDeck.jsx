/* eslint-disable react/prop-types */

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ArticleCard from '../ArticleCard/ArticleCard';
import './ArticleCardDeck.scss';

export default function ArticleCardDeck({ Articles }) {
    return (
        <Container>
            <Row className="article-card__deck justify-content-center">
                {Articles.docs.map((article) => {
                    return (
                        <Col
                            className="article-card"
                            xl={4}
                            md={6}
                            xs={12}
                            key={article.id}
                        >
                            <ArticleCard article={article} />
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
}
