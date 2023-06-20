import React, { useEffect, useState } from 'react';
import './App.css';

import Cart from './Cart';
import Navbar from './Navbar';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { collection, getDocs, doc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

function CartHome() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('products').onSnapshot((snapshot) => {
            const productsData = snapshot.docs.map((doc) => doc.data());
            setProducts(productsData);
            setLoading(false);
        });

        return () => {
            unsubscribe(); // Unsubscribe from the snapshot listener when the component unmounts
        };
    }, []);



    function handleIncreaseQuantity(product) {
        const updatedProducts = products.map((p) =>
            p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
        setProducts(updatedProducts);
    }

    function handleDecreaseQuantity(product) {
        const updatedProducts = products.map((p) =>
            p.id === product.id && p.qty > 0 ? { ...p, qty: p.qty - 1 } : p
        );
        setProducts(updatedProducts);
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
