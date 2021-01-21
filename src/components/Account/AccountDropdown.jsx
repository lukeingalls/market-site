/* eslint-disable react/prop-types,react/display-name */
import React from 'react';
import { Col, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AccountDropdown.scss';

const AccountCircle = React.forwardRef(({ onClick }, ref) => {
    return (
        <div
            className="account-dropdown text-light d-flex align-items-center"
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            role="dropdown"
            aria-label="Account Options"
        >
            <span className="account-dropdown--icon material-icons mr-2">
                account_circle
            </span>
            <span className="account-dropdown--text d-md-none">
                Account Details
            </span>
        </div>
    );
});

export default function AccountDropdown({ className }) {
    return (
        <Dropdown className={className}>
            <Dropdown.Toggle as={AccountCircle} />
            <Dropdown.Menu as={Col} md="auto" xs="12" align="right" className="text-center">
                <Dropdown.Header>Username</Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item><Link to="/create-doc">New Article</Link></Dropdown.Item>
                <Dropdown.Item>Account Info</Dropdown.Item>
                <Dropdown.Item>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
