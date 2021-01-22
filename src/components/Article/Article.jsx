/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArticleViewer from './ArticleViewer/ArticleViewer';
import Loading from '../Loading/Loading';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import './Article.scss';
import { useAuth } from '../../contexts/FirebaseContext';

export default function Article() {
    const { getArticle } = useAuth();
    const [doc, setDoc] = useState()
    const [article, setArticle] = useState();
    const [error, setError] = useState('');
    const [title, setTitle] = useState(localStorage.getItem('title'));
    const [subtitle, setSubTitle] = useState(localStorage.getItem('subtitle'));
    const { articleId } = useParams();

    useEffect(() => {
        let mounted = true;
        getArticle(articleId)
            .then((value) => {
                if (mounted) {
                    if (value.exists) {
                        setDoc(value);
                        setTitle(value.data().title);
                        setSubTitle(value.data().subtitle);
                        setArticle(JSON.parse(value.data().content));
                    } else {
                        setError('The article you are looking for could not be found!');
                    }
                }
            })
            .catch((error) => {
                if (mounted) {
                    setError(error);
                }
            });

        return () => {
            mounted = false;
        }
    }, [])

    if (article) {
        return (
            <Container className="article">
                <Row>
                    <Col
                        className="d-lg-block d-none"
                        lg="2"
                        >
                    </Col>
                    <Col lg="9" xs="12">
                        <h1 className="article--title"> { title } </h1>
                        { subtitle && <h2 className="article--subtitle"> { subtitle }</h2>}
                        <ArticleViewer className="mt-3" article={ article } />            
                    </Col>
                    <Col
                        className="d-lg-block d-none"
                        lg="1"
                        />
                </Row>

            </Container>
        );
    } else {
        if (error) {
            return (
                <Alert variant="danger">
                    { error }
                </Alert>
            );
        } else {
            return (
                <Loading />
            );
        }
    }
    
}
