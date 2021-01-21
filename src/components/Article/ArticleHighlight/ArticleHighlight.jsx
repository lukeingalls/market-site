/* eslint-disable */

import React, { useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import ArticleViewer from '../ArticleViewer/ArticleViewer';
import './ArticleHighlight.scss';
import Label from '../../Label/Label';

const Shadow = () => {
    return (
        <div className="highlight-shadow"></div>
    );
};

const ViewMore = () => {
    return (
        <Button className="view-more" variant="outline-info">View More</Button>
    );
};

export default function ArticleHighlight() {
    const [title, setTitle] = useState(localStorage.getItem('title') || 'Sample title');
    const [subTitle, setSubTitle] = useState(localStorage.getItem('subtitle') || 'Sample subtitle');
    const [article, setArticle] = useState(JSON.parse(localStorage.getItem('content')) || '');

    return (
        <Container className="article">
            <Card bg="light">
                <Card.Header>
                    <Container>
                        <Row>
                            <Col xs="10">
                                <h1 className="article--title">
                                    {title}
                                </h1>
                                <h3 className="article--subtitle">
                                    {subTitle}
                                </h3>
                            </Col>
                            <Col>
                                Author info
                            </Col>
                        </Row>
                    </Container>
                    <Label>
                        Most Popular
                    </Label>
                </Card.Header>
                <Card.Body style={{ position: "relative", }}>
                    <ArticleViewer
                        article={article}
                        className="highlight"
                    />
                    <Shadow />
                    <ViewMore />
                </Card.Body>
            </Card>
        </Container>
    );
}
