import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Button, Badge, Flex, IconButton } from '@chakra-ui/react';
import { AiOutlineHome } from 'react-icons/ai';
import AddProductPopup from './AddProductPopup';
import { FirebaseContext } from './FirebaseContext';



function AddProduct() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const firebase = useContext(FirebaseContext);
    const currentUser = firebase.auth().currentUser;
    const [displayName, setDisplayName] = useState('');

    useEffect(() => {
        if (currentUser) {
            const { displayName } = currentUser;
            setDisplayName(displayName);
        }
    }, [currentUser]);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <Box p="8" bg="rgba(255, 255, 255, 0.8)" boxShadow="md" rounded="md" textAlign="center">
            <Flex justify="space-between" align="center" mb="4">
                <IconButton
                    as={Link}
                    to="/"
                    variant="ghost"
                    colorScheme="purple"
                    icon={<AiOutlineHome size={24} />}
                    aria-label="Home"
                />
                <Badge colorScheme="purple">{displayName}</Badge>
            </Flex>

            <Heading size="lg" mb="4">
                Seller Dashboard
            </Heading>

            <Button colorScheme="purple" onClick={handleOpenPopup}>
                Add Product
            </Button>

            {/* Add the AddProductPopup component */}
            <AddProductPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
        </Box>
    );
}

export default AddProduct;
