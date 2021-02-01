import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form } from 'react-bootstrap';
import { useAuth } from '../../../contexts/FirebaseContext';
import AuthorForm from './AuthorForm';

export default function AccountManage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { userDoc, updateProfile } = useAuth();
    const [displayName, setDisplayName] = useState(userDoc?.data().displayName || '');
    const email = userDoc?.data().email;

    const updateUserProfile = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        if (displayName.length > 0 && displayName.length < 40) {
            updateProfile({
                displayName: displayName,
            })
                .then(() => {
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    console.log(error);
                    setError('Failed to update profile!');
                });
        } else {
            setLoading(false);
            setError('Your display name must be between 0 and 40 characters.');
        }

    };

    const displayNameChange = (e) => {
        setDisplayName(e.target.value);
    };

    return (
        <Container>

            <Form>
                {error &&
                    <Alert variant="danger">
                        {error}
                    </Alert>
                }
                <Form.Row>
                    <Form.Group
                        as={Col}
                        md={6}
                        xs={12}
                    >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            readOnly
                            value={email}
                        />
                    </Form.Group>

                    <Form.Group
                        as={Col}
                        md={6}
                        xs={12}
                    >
                        <Form.Label>Display Name</Form.Label>
                        <Form.Control
                            onChange={displayNameChange}
                            type="text"
                            value={displayName}
                        />
                    </Form.Group>
                </Form.Row>
                <Button
                    disabled={loading}
                    style={{
                        float: 'right',
                        marginBottom: '15px',
                    }}
                    type="submit"
                    variant="info"
                    onClick={updateUserProfile}
                >
                    Update
                </Button>
            </Form>
            <hr 
                style={{
                    clear: 'both',
                }} 
            />
            { !userDoc?.data().author ?
                <Alert variant="warning">
                    <Alert.Heading>
                        {'That\'s all the settings for your account!'}
                    </Alert.Heading>
                    {'This page may seem rather empty, but that\'s because you are not an author! \
                    We give our authors lots of control over their content. You should consider becoming one!'}
                </Alert> :
                <AuthorForm
                    displayName={displayName}
                    title={userDoc.data()?.title}
                    bio={userDoc.data()?.bio}
                />
            }
        </Container>
    );
}
