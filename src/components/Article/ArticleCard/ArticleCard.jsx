/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import ArticleViewer from '../ArticleViewer/ArticleViewer';
import './ArticleCard.scss';
import getTimeString from '../../../functions/getTimeString';
import { routes } from '../../../routes';
import { useHistory } from 'react-router-dom';

export default function ArticleCard({ article }) {
    const history = useHistory();
    const timeString = getTimeString(article.data().created.toDate());

    function viewArticle(e) {
        e.preventDefault();
        history.push(routes.article.get(article.id));
    }

    return (
        <Card>
            {/* <Card.Img variant="top" /> */}
            <Card.Body className="article-card__body">
                <Card.Title
                    className="article-card__title"
                >
                    {article.data().title}
                </Card.Title>
                {article.data().subtitle && 
                    <Card.Title
                        className="article-card__subtitle"
                    >
                        {article.data().subtitle}
                    </Card.Title>
                }
                <hr />
                <Card.Text
                    article={ JSON.parse(article.data().content) }
                    as={ArticleViewer}
                    className="mt-3 article-card__text"
                />
            </Card.Body>
            <Card.Footer className="article-card__footer">
                <p
                    className="text-muted"
                >
                    Posted {timeString}
                </p>
                <Button
                    onClick={viewArticle}
                    variant="outline-info"
                >
                    Read More
                </Button>
            </Card.Footer>
        </Card>
    );
}
