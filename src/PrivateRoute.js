// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, isAuthenticated, isSeller, ...rest }) => {
    if (rest.path === '/add-product') {
        if (isAuthenticated && isSeller) {
            return <Route {...rest} element={<Element />} />;
        } else {
            return <Navigate to="/seller-login" replace state={{ from: rest.location }} />;
        }
    }

    if (rest.path === '/cart') {
        if (isAuthenticated) {
            return <Route {...rest} element={<Element />} />;
        } else {
            return <Navigate to="/login" replace state={{ from: rest.location }} />;
        }
    }

    if (isAuthenticated) {
        return <Route {...rest} element={<Element />} />;
    } else {
        return <Navigate to="/login" replace state={{ from: rest.location }} />;
    }
};

export default PrivateRoute;
