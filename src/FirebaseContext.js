import React, { createContext, useContext } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAWiyUiFXpriya8cxGPnruTwh41HZZmtqI",
    authDomain: "cart-9c010.firebaseapp.com",
    projectId: "cart-9c010",
    storageBucket: "cart-9c010.appspot.com",
    messagingSenderId: "1059196634005",
    appId: "1:1059196634005:web:a39793fba8e0599b93ec9c"
};

firebase.initializeApp(firebaseConfig);

export const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
    return (
        <FirebaseContext.Provider value={firebase}>
            {children}
        </FirebaseContext.Provider>
    );
};

export function useFirebase() {
    return useContext(FirebaseContext);
}

export default firebase;
