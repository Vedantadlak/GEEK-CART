import React, { useEffect, useState } from 'react';
import { Box, Heading, Flex, Spinner, Text, Icon, IconButton,Button } from '@chakra-ui/react';
import { MdHome } from 'react-icons/md';
import { FaRupeeSign ,FaShoppingBag} from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Cart from './Cart';
import Navbar from './Navbar';

import { db } from './firebase';

import { collection, getDocs, deleteDoc, doc, onSnapshot, updateDoc, serverTimestamp } from 'firebase/firestore';

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

    async function handleDeleteProduct(id) {
        const docRef = doc(db, 'products', id);

        try {
            // Delete the product document from Firestore
            await deleteDoc(docRef);

            // Remove the product from the state
            const updatedProducts = products.filter((product) => product.id !== id);
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
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
        <Box bg="purple.100" minHeight="100vh" py={8}>
            <Navbar count={getCartCount()} />
            <Box maxWidth="800px" mx="auto" px={4}>
                <Flex align="center" mb={4}>
                    <Link to="/">
                        <IconButton
                            aria-label="Home"
                            icon={<Icon as={MdHome} boxSize={6} />}
                            variant="ghost"
                            colorScheme="purple"
                            mr={2}
                        />
                    </Link>
                    <Heading as="h1" flex="1" textAlign="center">
                        Shopping Cart
                    </Heading>
                </Flex>
                {loading ? (
                    <Spinner size="xl" alignSelf="center" />
                ) : (
                    <>
                        <Cart
                            products={products}
                            onIncreaseQuantity={handleIncreaseQuantity}
                            onDecreaseQuantity={handleDecreaseQuantity}
                            onHandleDeleteProduct={handleDeleteProduct}
                        />

                            <Box
                                p={4}
                                fontSize="20px"
                                fontWeight="bold"
                                display="flex"
                                justifyContent="space-between"
                                borderTop="1px solid"
                                borderColor="gray.200"
                                alignItems="center"
                                bg="purple.200"
                                rounded="md"
                                mt={4}
                            >
                                <Flex align="flex-start">
                                    <Button
                                        colorScheme="purple"
                                        size="lg"
                                        leftIcon={<Icon as={FaShoppingBag} boxSize={6} />}
                                    >
                                        Buy Now
                                    </Button>
                                </Flex>
                                <Flex align="center">
                                    <Icon as={FaRupeeSign} boxSize={6} mr={2} />
                                    <Text>Total:</Text>
                                    <Box
                                        ml={2}
                                        bg="white"
                                        py={1}
                                        px={2}
                                        rounded="md"
                                        boxShadow="sm"
                                        _hover={{ boxShadow: 'md' }}
                                    >
                                        {getCartTotal()}
                                    </Box>
                                </Flex>
                            </Box>


                    </>
                )}
            </Box>
        </Box>
    );
}

export default CartHome;
