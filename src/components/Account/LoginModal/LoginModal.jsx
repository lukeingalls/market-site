import { Alert, Button, Form, Modal, Spinner } from 'react-bootstrap';
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../../contexts/FirebaseContext';

export default function LoginModal({ show, onClose, onSignUp }) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        login(emailRef.current.value, passwordRef.current.value)
            .then(() => {
                onClose();
                setLoading(false);
            })
            .catch(() => {
                setError('Username or password is incorrect');
                setLoading(false);
            });
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header>
                Log In
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger"> {error} </Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required></Form.Control>
                    </Form.Group>
                    <Button
                        className="w-100"
                        disabled={loading}
                        type="submit"
                        variant="info"
                    >
                        {loading ? <Spinner animation="grow" /> : 'Log In'}
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer className="text-center justify-content-center">
                {'Don\'t have an account?'}
                <Button
                    className="p-0"
                    onClick={(e) => {
                        e.preventDefault();
                        onClose();
                        onSignUp();
                    }}
                    variant="link"
                >
                    Sign Up
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

LoginModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSignUp: PropTypes.func.isRequired,
};

