/* eslint-disable */
import React, { useRef, useState } from 'react';
import { DocumentEditor } from '../../Editor/Editor';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useAuth } from '../../../contexts/FirebaseContext';
import { useHistory } from 'react-router-dom';
import Loading from '../../Loading/Loading';
import { routes } from '../../../routes';

export default function ArticleWriter() {
    const { userDoc, setArticle } = useAuth();
    const history = useHistory();
    const [title, setTitle] = useState(localStorage.getItem('draft-title') || '');
    const [subtitle, setSubTitle] = useState(localStorage.getItem('draft-subtitle') || '');
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const contentRef = useRef();

    function submitArticle(e) {
        e.preventDefault();

        if (
            title &&
            title.length >= 10 &&
            title.length <= 140
        ) {
            if (subtitle.length <= 140) {
                const authorId = userDoc.data().uid;
                const content = JSON.stringify(contentRef.current)
                setLoading(true);
                setArticle(
                    authorId,
                    content,
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
                <DocumentEditor ref={contentRef}/>
                <Row className="d-flex justify-content-end my-3" noGutters>
                    <Button
                    // TODO: Make preview work
                        className="mr-3"
                        disabled={loading}
                        type="button"
                        variant="outline-info"
                    >
                        Preview
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
