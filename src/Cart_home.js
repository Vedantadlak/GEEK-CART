import React, { useEffect, useState, useContext } from 'react';
import { Box, Heading, Flex, Spinner, Text, Icon, IconButton, Button, Badge, useBreakpointValue } from '@chakra-ui/react';
import { MdHome } from 'react-icons/md';
import { FaRupeeSign, FaShoppingBag, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Cart from './Cart';
import Navbar from './Navbar';
import { FirebaseContext } from './FirebaseContext';

import { collection, getDocs, deleteDoc, doc, onSnapshot, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

function CartHome() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const firebase = useContext(FirebaseContext);
    const currentUser = firebase.auth().currentUser;
    
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

    // Retrieve the first name and last name from the logged-in user's data
    const displayName = currentUser?.displayName;
    const firstName = displayName?.split(' ')[0] || 'Unknown';
    const lastName = displayName?.split(' ')[1] || '';

    async function handleIncreaseQuantity(product) {
        const docRef = doc(db, 'products', product.id);
        const updatedQty = product.qty + 1;

        try {
            await updateDoc(docRef, { qty: updatedQty, updatedAt: serverTimestamp() });
            const updatedProducts = products.map((p) => (p.id === product.id ? { ...p, qty: updatedQty } : p));
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
            const updatedProducts = products.map((p) => (p.id === product.id ? { ...p, qty: updatedQty } : p));
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

    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Box bg="purple.100" minHeight="100vh" py={8}>
            <Navbar count={getCartCount()} />
            <Flex justify="flex-end" pr={4} pt={4}>
                <Flex align="center">
                    <Icon as={FaUser} boxSize={8} mr={2} color="purple.500" />
                    <Badge colorScheme="purple" fontSize="xl">
                        {`${firstName} ${lastName}`}
                    </Badge>
                </Flex>
            </Flex>
            
            <Box maxWidth="800px" mx="auto" px={4}>
                <Flex direction={isMobile ? 'column' : 'row'} align="center" mb={4}>
                    <Link to="/">
                        <IconButton
                            aria-label="Home"
                            icon={<Icon as={MdHome} boxSize={6} />}
                            variant="ghost"
                            colorScheme="purple"
                            mr={2}
                            mb={isMobile ? 2 : 0}
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
                            flexDir={isMobile ? 'column' : 'row'}
                        >
                            <Flex align="flex-start" mb={isMobile ? 2 : 0}>
                                <Button
                                    colorScheme="purple"
                                    size={isMobile ? 'md' : 'lg'}
                                    leftIcon={<Icon as={FaShoppingBag} boxSize={6} />}
                                    mb={isMobile ? 2 : 0}
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
