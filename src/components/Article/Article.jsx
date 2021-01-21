/* eslint-disable */

import React, { useState } from 'react';
import ArticleViewer from './ArticleViewer/ArticleViewer';
import Loading from '../Loading/Loading';
import { Container } from 'react-bootstrap';
import './Article.scss';

export default function Article() {
    const [article, setArticle] = useState(JSON.parse(localStorage.getItem('content') || ''));
    const [title, setTitle] = useState(localStorage.getItem('title'));
    const [subTitle, setSubTitle] = useState(localStorage.getItem('subtitle'));

    if (article) {
        return (
            <Container className="article">
                <h1 className="article--title"> { title } </h1>
                <h2 className="article--subtitle"> { subTitle }</h2>
                <ArticleViewer className="mt-3" article={article} />            
            </Container>
        );
    } else {
        return (
            <Loading />
        )
    }
    
}
