import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Button, Badge, Flex, IconButton, Icon } from '@chakra-ui/react';
import { AiOutlineHome } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
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
                <Flex align="center">
                    <Badge colorScheme="purple">{displayName}</Badge>
                    <Icon as={FaUser} boxSize={6} ml={2} color="purple.500" />
                </Flex>
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
