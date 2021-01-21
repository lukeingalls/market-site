import React from 'react';
import './Label.scss';
import PropTypes from 'prop-types';

export default function Label({ children }) {
    return (
        <div className="label">{children}</div>
    );
}

Label.propTypes = {
    children: PropTypes.node.isRequired,
};
