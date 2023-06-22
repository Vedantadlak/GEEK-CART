import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { ChakraProvider, Box, Spinner } from '@chakra-ui/react';
import Home from './Home';
import Signup from './signup';
import Login from './signin';
import CartHome from './Cart_home';
import { FirebaseProvider } from './FirebaseContext';
import firebase from './firebase';
import SellerLogin from './seller_login';
import SellerSignup from './seller_signup';
import AddProduct from './AddProduct';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return user ? <Component {...rest} /> : <Navigate to="/login" replace />;
  };

  useEffect(() => {
    const handleStartLoading = () => {
      setIsLoading(true);
    };

    const handleFinishLoading = () => {
      setIsLoading(false);
    };

    const handleRouteChange = () => {
      handleStartLoading();
      setTimeout(handleFinishLoading, 250); // Simulating a delay of 1 second
    };

    const unlisten = () => handleRouteChange();

    return () => {
      unlisten();
    };
  }, [location.pathname]);

  return (
    <ChakraProvider>
      <FirebaseProvider value={firebase}>
        
          <Box minHeight="100vh" position="relative">
            {isLoading && (
              <Box
                position="fixed"
                top="0"
                left="0"
                width="100vw"
                height="100vh"
                display="flex"
                justifyContent="center"
                alignItems="center"
                bg="rgba(0, 0, 0, 0.5)"
                zIndex="9999"
              >
                <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="purple.700" size="xl" />
              </Box>
            )}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<PrivateRoute component={CartHome} />} />
              <Route path="/seller-login" element={<SellerLogin />} />
            <Route path="/seller-signup" element={<SellerSignup />} />
            <Route path="/add-product" element={<PrivateRoute component={AddProduct} />} />

            </Routes>
          </Box>
        
      </FirebaseProvider>
    </ChakraProvider>
  );
}

export default App;
