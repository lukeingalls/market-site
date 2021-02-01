/* eslint-disable react/prop-types */

import React, { useRef, useState } from 'react';
import { Button, Col, Container, Form, Spinner } from 'react-bootstrap';
import Byline from '../../Article/Byline/Byline';
import { useAuth } from '../../../contexts/FirebaseContext';

/* eslint-disable-next-line */
export default function AuthorForm({ style, displayName, title: t, bio: b }) {
    const [title, setTitle] = useState(t || '');
    const [bio, setBio] = useState(b || '');
    const [loading, setLoading] = useState(false);
    const [img, setImage] = useState();
    const imgRef = useRef();
    
    /* eslint-disable-next-line */
    const { updateProfile, uploadProfilePic } = useAuth();

    const submit = (e) => {
        e.preventDefault();
        // TODO: error checking
        setLoading(true);
        updateProfile({
            title: title,
            bio: bio,
            displayName: displayName,
        })
            .then(() => {
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });

        // if (img) {
        //     uploadProfilePic(imgRef.current.files[0])
        //         .then((snapshot) => {
        //             console.log(snapshot, typeof(snapshot));
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         });
        // }
    };

    return (
        <Form style={style} onSubmit={submit}>
            <Form.Row>
                <Form.Group
                    as={Col}
                    md={6}
                    xs={12}
                >
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        placeholder="Security Analyst at..."
                        type="text"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                </Form.Group>

                <Form.Group
                    as={Col}
                    md={6}
                    xs={12}
                >
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                        placeholder="5yrs experience..."
                        type="text"
                        value={bio}
                        onChange={(e) => {
                            setBio(e.target.value);
                        }}
                    />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group
                    as={Col}
                >
                    <Form.File
                        label="Upload a profile picture"
                        ref={imgRef}
                        onChange={(e) => {
                            if (e.target.value) {
                                setImage(URL.createObjectURL(e.target.files[0]));
                                console.log(e.target.files[0]);
                            }
                        }}
                    />
                </Form.Group>
            </Form.Row>
            <Container>
                <h3>
                    Here is a preview of your byline
                </h3>
                <Byline
                    displayName={displayName}
                    title={title}
                    bio={bio}
                    timestamp={String(new Date)}
                    img={img}
                />
            </Container>
            <Button
                className="my-2"
                disabled={loading}
                style={{
                    float: 'right',
                }}
                type="submit"
                variant="info"
            >
                {loading ? 
                    <Spinner animation="grow" /> :
                    'Submit'
                }
            </Button>
            <hr 
                style={{
                    clear: 'both',
                }} 
            />
        </Form>
    );
}
