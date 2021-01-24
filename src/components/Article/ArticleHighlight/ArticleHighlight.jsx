/* eslint-disable */

import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import ArticleViewer from '../ArticleViewer/ArticleViewer';
import './ArticleHighlight.scss';
import Label from '../../Label/Label';
import { Link } from 'react-router-dom';
import { routes } from '../../../routes';

const Shadow = () => {
    return (
        <div className="highlight-shadow"></div>
    );
};

const ViewMore = ({articleId}) => {
    return (
        <Button
            as={Link}
            className="view-more"
            to={routes.article.get(articleId)}
            variant="outline-info"
        >
            Read More
        </Button>
    );
};

export default function ArticleHighlight({ Article }) {
    const { title, subtitle, content: article } = Article.data();
    const articleId = Article.id;

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
                                    {subtitle}
                                </h3>
                            </Col>
                        </Row>
                    </Container>
                    <Label>
                        Most Popular
                    </Label>
                </Card.Header>
                <Card.Body style={{ position: "relative", }}>
                    <ArticleViewer
                        article={JSON.parse(article)}
                        className="highlight"
                    />
                    <Shadow />
                    <ViewMore articleId={articleId} />
                </Card.Body>
            </Card>
        </Container>
    );
}
