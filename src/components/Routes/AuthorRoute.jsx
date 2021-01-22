import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/FirebaseContext';
import { routes } from '../../routes';
import PropTypes from 'prop-types';

export default function AuthorRoute({ path, exact, children }) {
    const { userDoc } = useAuth();

    if (userDoc && userDoc.data().author) {
        return (
            <Route path={path} exact={exact}>
                {children}
            </Route>
        );
    } else {
        return (
            <Redirect to={routes.default.get()} />
        );
    }
}

AuthorRoute.propTypes = {
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool,
    children: PropTypes.node,
};