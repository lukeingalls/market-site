/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import ArticleViewer from '../ArticleViewer/ArticleViewer';
import './ArticleCard.scss';
import getTimeString from '../../../functions/getTimeString';

export default function ArticleCard({ article }) {
    /* eslint-disable-next-line */
    const [timeString, setTimeString] = useState(
        getTimeString(article.data().created.toDate())
    );

    console.log(timeString);
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
            <Card.Footer className="article-card__timestamp">
                <small className="text-muted">Posted {timeString}</small>
            </Card.Footer>
        </Card>
    );
}
