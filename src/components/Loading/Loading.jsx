import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function Loading() {
    return (
        <Spinner
            animation="border"
            style={{
                position: 'fixed',
                width: '50px',
                height: '50px',
                left: '50%',
                top: '20%',
                marginLeft: '-25px',
                marginRight: '-25px',
            }}
        />
    );
}
