/* eslint-disable */
import React, { useRef, useState } from 'react';
import DocumentEditor from '../../Editor/Editor';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

export default function ArticleWriter() {
    const [title, setTitle] = useState(localStorage.getItem('title') || '');
    const [subTitle, setSubTitle] = useState(localStorage.getItem('subtitle') || '');
    const titleRef = useRef();
    const subTitleRef = useRef();

    const titleChange = (e) => {
        setTitle(e.target.value);
        localStorage.setItem('title', e.target.value);
    };

    const subTitleChange = (e) => {
        setSubTitle(e.target.value);
        localStorage.setItem('subtitle', e.target.value);
    };

    return (
        <Container>
            <Form>
                <Form.Group as={Row} controlId="exampleForm.ControlInput1">
                    <Form.Label column xs="1">Title</Form.Label>
                    <Col sm="11" xs="12">
                        <Form.Control
                            aria-required
                            onChange={(e) => { titleChange(e) }}
                            required
                            ref={titleRef}
                            size="lg"
                            type="text"
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="exampleForm.ControlInput1">
                    <Form.Label column xs="2">Subtitle</Form.Label>
                    <Col sm="10" xs="12">
                        <Form.Control
                            onChange={(e) => subTitleChange(e)}
                            ref={subTitleRef}
                            type="text"
                        />
                    </Col>
                </Form.Group>
            </Form>
            <DocumentEditor />
            <Row className="d-flex justify-content-end my-3" noGutters>
                <Button
                // TODO: Make preview work
                    className="mr-3"
                    type="button"
                    variant="outline-info"
                >
                    Preview
                </Button>
                <Button
                // TODO: Make done work
                    type="button"
                    variant="outline-info"
                >
                    Done!
                </Button>
            </Row>
        </Container>
    );
}
