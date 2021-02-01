import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import { useAuth } from '../../../contexts/FirebaseContext';
import { routes } from '../../../routes';
import './ArticleManage.scss';
import Loading from '../../Loading/Loading';

function ArticleManage({ className }) {
    /* eslint-disable-next-line */
    const { currentUser, getUserArticles } = useAuth();
    const [loading, setLoading] = useState(true);
    const [docs, setDocs] = useState();
    useEffect(() => {
        let mount = true;
        if (currentUser) {
            getUserArticles()
                .then((docs) => {
                    if (mount) {
                        if (!docs.empty) {
                            setDocs(docs.docs);
                        }
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    if (mount) {
                        setLoading(false);
                    }
                    console.log(error);
                });
        }
        return () => {
            mount = false;
        };
    }, []);

    if (loading) {
        return (
            <Loading />
        );
    } else if (currentUser) {

        return (
            <Container className={className}>
                <Row 
                    className="mb-3 align-items-center"
                >
                    <Col>
                        <h1>
                            My Articles
                        </h1>
                    </Col>
                    <Col xs={3}>
                        <Button
                            as={Link}
                            to={routes.article.edit.get()}
                            variant="info"
                        >
                            New Article
                        </Button>
                    </Col>
                </Row>
                {docs ? docs.map((doc) => {
                    return (
                        <Row
                            className="border manage-article"
                            key={doc.id}
                        >
                            <Col
                                className="manage-article--title"
                            >
                                {doc.data().title}
                            </Col>
                            <Col
                                xs={2}
                            >
                                <span className="text-muted mr-3">
                                    {`Views ${doc.data().views}`}
                                </span>
                                <Button
                                    as={Link}
                                    to={routes.article.edit.get(doc.id)}
                                    variant="info"
                                >
                                    Edit
                                </Button>
                            </Col>
                        </Row>
                    );
                }) :
                    <Alert variant="warning">You do not have any articles.</Alert>
                }
            </Container>
        );
    } else {
        return (
            <p> You are not signed in. </p>
        );
    }

}

ArticleManage.propTypes = {
    className: PropTypes.string,
};

export default ArticleManage;
