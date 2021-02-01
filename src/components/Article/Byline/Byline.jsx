import React, { useState } from 'react';
import { Col, Collapse, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Byline.scss';
import getTimeString from '../../../functions/getTimeString';

export default function Byline({ displayName, title, bio, timestamp, img }) {
    const [open, setOpen] = useState(false);
    const time = getTimeString(timestamp);
    return (
        <Container
            className="byline border"
            onMouseOver={() => {
                setOpen(true);
            }}
            onMouseOut={() => {
                setOpen(false);
            }}
        >
            <Row>
                {img &&
                    <Col className="profile-picture__col">
                        <img
                            alt={displayName}
                            className="profile-picture"
                            src={img}
                        />
                    </Col>
                }
                <Col>
                    {displayName && <Row className="mx-0">
                        <address className="mb-0">
                            {`${displayName}${title ? `, ${title}` : ''}`}
                        </address>
                    </Row>}
                    <Row className="mx-0">
                        <time
                            style={{
                                fontSize: '80%',
                                fontWeight: 400,
                            }}
                            role="time"
                            dateTime={timestamp}
                            className="text-muted"
                        >
                            {`Published ${time}`}
                        </time>
                    </Row>
                </Col>
            </Row>
            {bio &&
                <Collapse in={open}>
                    <Row className="mx-0">
                        <p className="m-0 mt-2">
                            {bio}
                        </p>
                    </Row>
                </Collapse>
            }
        </Container>
    );
}

Byline.propTypes = {
    displayName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    bio: PropTypes.string,
    img: PropTypes.string,
};
