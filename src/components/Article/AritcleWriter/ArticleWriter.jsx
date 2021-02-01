/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { DocumentEditor } from '../../Editor/Editor';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useAuth } from '../../../contexts/FirebaseContext';
import { useParams, useHistory } from 'react-router-dom';
import Loading from '../../Loading/Loading';
import { routes } from '../../../routes';

export default function ArticleWriter() {
    const { articleId } = useParams();
    const cached = {
        title: localStorage.getItem('draft-title' || ''),
        subtitle: localStorage.getItem('draft-subtitle' || ''),
        content: localStorage.getItem('draft-content' || undefined),
    }
    const { userDoc, setArticle, getArticle } = useAuth();
    const history = useHistory();
    const [title, setTitle] = useState(cached.title);
    const [show, setShow] = useState(true);
    const [subtitle, setSubTitle] = useState(cached.subtitle);
    const [content, setContent] = useState(cached.content);
    const [remoteArticle, setRemoteArticle] = useState();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const contentRef = useRef();

    useEffect(() => {
        let mount = true;
        if (articleId !== 'new') {
            setLoading(true);
            getArticle(articleId)
                .then((article) => {
                    if (mount) {
                        if (article.exists) {
                            setRemoteArticle(article);
                            setContent(article.data().content);
                            setTitle(article.data().title);
                            setSubTitle(article.data().subtitle);
                            setLoading(false);
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                })
        }
        return () => {
            mount = false;
        }
    }, [])

    function submitArticle(e) {
        e.preventDefault();

        if (
            title &&
            title.length >= 10 &&
            title.length <= 140
        ) {
            if (subtitle.length <= 140) {
                const authorId = userDoc.data().uid;
                const c = JSON.stringify(contentRef.current)
                setLoading(true);
                if (articleId === 'new') {
                    setArticle(
                        authorId,
                        c,
                        title,
                        subtitle || '',
                    )
                        .then((value) => {
                            setLoading(false);
                            history.push(routes.article.get(value.id));
                        })
                        .catch((error) => {
                            setLoading(false);
                            setError(error);
                        });
                } else {
                    setArticle(
                        authorId,
                        c,
                        title,
                        subtitle || '',
                        articleId,
                    )
                        .then(() => {
                            setLoading(false);
                            history.push(routes.article.get(articleId));
                        })
                        .catch((error) => {
                            setLoading(false);
                            setError(error);
                        })
                }
            } else {
                setError('Your subtitle may not be longer than 140 characters!');
            }
        } else {
            if (!title) {
                setError('You must enter a title for you article!');
            } else if (title < 10) {
                setError('Your title may be shorter than 10 characters!');
            } else {
                setError('You title may not be longer than 140 characters!');
            }
        }
    }

    const titleChange = (e) => {
        setTitle(e.target.value);
        localStorage.setItem('draft-title', e.target.value);
    };

    const subTitleChange = (e) => {
        setSubTitle(e.target.value);
        localStorage.setItem('draft-subtitle', e.target.value);
    };

    if (!loading) {
        return (
            <Container>
                { error &&
                    <Alert variant="danger">{error}</Alert>
                }
                { (!!remoteArticle && !!(cached.content)) &&
                    <Alert
                        dismissible
                        show={show}
                        onClose={() => setShow(false)}
                        variant="warning"
                    >
                        <Alert.Heading
                            as={Row}
                            className="justify-content-center h6"
                        >
                            You have a local and remote cache for this article. Select which you would like to use.
                        </Alert.Heading>
                        <Row className="justify-content-center mt-3">
                            <Button
                                variant="warning mr-3"
                                onClick={() => {
                                    setContent(cached.content);
                                    setTitle(cached.title);
                                    setSubTitle(cached.subtitle);
                                }}
                            >
                                Local
                            </Button>
                            <Button
                                onClick={() => {
                                    setContent(remoteArticle.data().content);
                                    setTitle(remoteArticle.data().title);
                                    setSubTitle(remoteArticle.data().subtitle);
                                }}
                                variant="warning"
                            >
                                Remote
                            </Button>
                        </Row>
                    </Alert>
                }
                <Form>
                    <Form.Group as={Row} controlId="exampleForm.ControlInput1">
                        <Form.Label column xs="1">Title</Form.Label>
                        <Col sm="11" xs="12">
                            <Form.Control
                                aria-required
                                onChange={titleChange}
                                required
                                size="lg"
                                type="text"
                                value={title}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="exampleForm.ControlInput1">
                        <Form.Label column xs="2">Subtitle</Form.Label>
                        <Col sm="10" xs="12">
                            <Form.Control
                                onChange={subTitleChange}
                                type="text"
                                value={subtitle}
                            />
                        </Col>
                    </Form.Group>
                </Form>
                <DocumentEditor prevContent={content} ref={contentRef} />
                <Row className="d-flex justify-content-end my-3" noGutters>
                    <Button
                        className="mr-3"
                        disabled={loading}
                        type="button"
                        variant="outline-info"
                        onClick={submitArticle}
                    >
                        Update
                    </Button>
                    <Button
                        disabled={loading}
                        type="button"
                        variant="outline-info"
                        onClick={submitArticle}
                    >
                        Done!
                    </Button>
                </Row>
            </Container>
        );
    } else {
        return (
            <Loading />
        );
    }
}
