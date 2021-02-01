import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArticleViewer from './ArticleViewer/ArticleViewer';
import Loading from '../Loading/Loading';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import './Article.scss';
import { useAuth } from '../../contexts/FirebaseContext';
import Reactions from './Reactions/Reactions';
import Disclaimer from './Disclaimer/Disclaimer';
import Byline from './Byline/Byline';
import { Helmet } from 'react-helmet';

export default function Article() {
    const { getArticle, setView, getUser } = useAuth();
    const [doc, setDoc] = useState();
    const [article, setArticle] = useState();
    const [author, setAuthor] = useState();
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
                        setTitle(value.data().title);
                        setDoc(value);
                        setSubTitle(value.data().subtitle);
                        setArticle(JSON.parse(value.data().content));
                        // TODO: error checking
                        setView(articleId);

                        getUser(value.data().authorId)
                            .then((doc) => {
                                if (mounted && doc.exists) {
                                    setAuthor(doc);
                                }
                            });

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
        };
    }, []);

    if (article) {
        return (
            <Container className="article">
                <Row>
                    <Col
                        md={{
                            span: 2,
                            order: 'first',
                        }}
                        xs={{
                            span: 12,
                            order: 'last',
                        }}
                    >
                        <Reactions />
                    </Col>
                    <Col md="9" xs="12">
                        <h1 className="article--title"> { title } </h1>
                        { subtitle && <h2 className="article--subtitle"> { subtitle }</h2>}
                        { author && 
                            <Byline
                                bio={author.data().bio}
                                displayName={author.data().displayName}
                                title={author.data().title}
                                timestamp={String(doc.data().created.toDate())}
                            />
                        }
                        <ArticleViewer className="mt-3" article={ article } />            
                    </Col>
                    <Col
                        md={{
                            span: 1,
                        }}
                        xs={false}
                    />
                </Row>
                <hr />
                <Disclaimer />
                <Helmet>
                    { title && <title>{title}</title> }
                    { article && 
                        <script type="application/ld+json">
                            {`
                                "@context": "https://bountfiulfinance.com",
                                "@type": "NewsArticle",
                                "author": ${ author?.data().displayName },
                                "dateCreated": ${ doc?.data().created.toDate().toString() },
                                "dateModified": ${ doc?.data().lastModified.toDate().toString() },
                                "headline": ${ title },
                            `}
                        </script>
                    }
                </Helmet>
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
