import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, isAuthenticated, isSeller, ...rest }) => {
    if (rest.path === '/seller-login' && !isSeller) {
        return <Navigate to="/login" replace state={{ from: rest.location }} />;
    }

    return (
        <Route
            {...rest}
            element={isAuthenticated ? <Element /> : <Navigate to="/login" replace state={{ from: rest.location }} />}
        />
    );
};

export default PrivateRoute;
