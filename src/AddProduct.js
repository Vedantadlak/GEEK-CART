import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Button, Badge, Flex, IconButton } from '@chakra-ui/react';
import { AiOutlineHome } from 'react-icons/ai';
import AddProductPopup from './AddProductPopup';
import { FirebaseContext } from './FirebaseContext';

function AddProduct() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const firebase = useContext(FirebaseContext);
    const currentUser = firebase.auth.currentUser;

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    // Retrieve the first name and last name from the logged-in user's data
    const firstName = currentUser?.displayName?.split(' ')[0] || 'Unknown';
    const lastName = currentUser?.displayName?.split(' ')[1] || 'Seller';

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
                <Badge colorScheme="purple">{`${firstName} ${lastName}`}</Badge>
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
