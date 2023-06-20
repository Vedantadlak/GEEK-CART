import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './Home';
import Signup from './signup';
import Login from './signin';
import CartHome from './Cart_home';
import { FirebaseProvider } from './FirebaseContext';
import firebase from './firebase';

function App() {
  return (
    <ChakraProvider>
      <FirebaseProvider value={firebase}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/signup" element={<Signup />} exact />
            <Route path="/login" element={<Login />} exact />
            <Route path="/cart" element={<CartHome />} />
          </Routes>
        </BrowserRouter>
      </FirebaseProvider>
    </ChakraProvider>
  );
}

export default App;
