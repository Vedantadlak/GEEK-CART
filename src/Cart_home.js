import React, { useEffect, useState } from 'react';
import './App.css';

import Cart from './Cart';
import Navbar from './Navbar';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { db } from './firebase';

import { collection, getDocs, doc, onSnapshot, updateDoc, serverTimestamp } from 'firebase/firestore';


function CartHome() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
            const productsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(productsData);
            setLoading(false);
        });

        return () => {
            unsubscribe(); // Unsubscribe from the snapshot listener when the component unmounts
        };
    }, []);




    async function handleIncreaseQuantity(product) {
        const docRef = doc(db, 'products', product.id);
        const updatedQty = product.qty + 1;

        try {
            await updateDoc(docRef, { qty: updatedQty, updatedAt: serverTimestamp() });
            const updatedProducts = products.map((p) =>
                p.id === product.id ? { ...p, qty: updatedQty } : p
            );
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    }


    async function handleDecreaseQuantity(product) {
        if (product.qty === 0) {
            return;
        }

        const docRef = doc(db, 'products', product.id);
        const updatedQty = product.qty - 1;

        try {
            await updateDoc(docRef, { qty: updatedQty, updatedAt: serverTimestamp() });
            const updatedProducts = products.map((p) =>
                p.id === product.id ? { ...p, qty: updatedQty } : p
            );
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    }







    function handleDeleteProduct(id) {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
    }

    function getCartCount() {
        let count = 0;
        products.forEach((product) => {
            count += product.qty;
        });
        return count;
    }

    function getCartTotal() {
        let total = 0;
        products.forEach((product) => {
            total += product.qty * product.price;
        });
        return total;
    }

    return (
        <div className="App">
            <Navbar count={getCartCount()} />
            <Cart
                products={products}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
                onHandleDeleteProduct={handleDeleteProduct}
            />

            {loading && <h1>Loading Products...</h1>}

            <div
                style={{
                    padding: 10,
                    fontSize: 20,
                    display: 'flex',
                    alignItems: 'flex-start',
                }}
            >
                TOTAL: {getCartTotal()}
            </div>
        </div>
    );
}

export default CartHome;
