/* eslint-disable react/prop-types,react/display-name */
import React, { useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/FirebaseContext';
import LoginModal from '../LoginModal/LoginModal';
import '../../../styles/btn-block.scss';
import './AccountDropdown.scss';
import SignUpModal from '../SignUp/SignUpModal';
import { routes } from '../../../routes';

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
    const { userDoc, signOut } = useAuth();
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    const handleShowLogin = () => {
        setShowLogin(true);
    };

    const handleCloseSignUp = () => {
        setShowSignUp(false);
    };

    const handleShowSignUp = () => {
        setShowSignUp(true);
    };

    if (userDoc && userDoc.exists) {
        return (
            <Dropdown className={className}>
                <Dropdown.Toggle as={AccountCircle} />
                <Dropdown.Menu
                    align="right"
                    className="text-center w-sm-100"
                >
                    <Dropdown.Header>{ userDoc.data().displayName || userDoc.data().email }</Dropdown.Header>
                    <Dropdown.Divider />
                    {(userDoc && userDoc.data().author) &&
                        <Dropdown.Item
                            as={Link}
                            to={routes.article.manage.get()}
                        >
                            Manage Articles
                        </Dropdown.Item>
                    }
                    <Dropdown.Item
                        as={Link}
                        to={routes.account.get()}
                    >
                        Manage Account
                    </Dropdown.Item>
                    <Dropdown.Item onClick={(e) => {
                        e.preventDefault();
                        signOut();
                    }}>Sign Out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    } else {
        return (
            <>
                <Button
                    className={`${className} btn-sm-block`}
                    onClick={ handleShowLogin }
                    variant="outline-light"
                >
                    Sign In
                </Button>
                <LoginModal
                    show={showLogin}
                    onClose={handleCloseLogin}
                    onSignUp={handleShowSignUp}
                />
                <SignUpModal
                    show={showSignUp}
                    onClose={handleCloseSignUp}
                />
            </>
        );
    }
}
