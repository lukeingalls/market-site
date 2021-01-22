import { Alert, Button, Form, Modal, Spinner } from 'react-bootstrap';
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../../contexts/FirebaseContext';

export default function SignUpModal({ show, onClose }) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        if (passwordRef.current.value === confirmPasswordRef.current.value) {
            signup(emailRef.current.value, passwordRef.current.value)
                .then(() => {
                    onClose();
                    setLoading(false);
                })
                .catch(() => {
                    setError('Could not complete sign up!');
                    setLoading(false);
                });
        }
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header>
                Sign Up
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
                    <Form.Group id="confirm-password">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" ref={confirmPasswordRef} required></Form.Control>
                    </Form.Group>
                    <Button
                        className="w-100"
                        disabled={loading}
                        type="submit"
                        variant="info"
                    >
                        {loading ? <Spinner animation="grow" /> : 'Sign Up'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

SignUpModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

