import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './Home';
import Signup from './signup';
import Login from './signin';
import CartHome from './Cart_home';
import { FirebaseProvider } from './FirebaseContext';
import firebase from './firebase';

function App() {
  const [user, setUser] = useState(null);

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

  return (
    <ChakraProvider>
      <FirebaseProvider value={firebase}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/cart"
              element={<PrivateRoute component={CartHome} />}
            />
          </Routes>
        </BrowserRouter>
      </FirebaseProvider>
    </ChakraProvider>
  );
}

export default App;
