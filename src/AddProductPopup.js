import React, { useState } from 'react';
import { Box, Heading, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Input } from '@chakra-ui/react';

function AddProductPopup({ isOpen, onClose }) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [imageLink, setImageLink] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleImageLinkChange = (event) => {
        setImageLink(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform the necessary actions to add the product
        // You can use the title, price, quantity, and imageLink states to submit the form
        // Reset the form fields
        setTitle('');
        setPrice('');
        setQuantity('');
        setImageLink('');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <FormControl mb="4">
                            <FormLabel>Title</FormLabel>
                            <Input type="text" value={title} onChange={handleTitleChange} />
                        </FormControl>
                        <FormControl mb="4">
                            <FormLabel>Price</FormLabel>
                            <Input type="number" value={price} onChange={handlePriceChange} />
                        </FormControl>
                        <FormControl mb="4">
                            <FormLabel>Quantity</FormLabel>
                            <Input type="number" value={quantity} onChange={handleQuantityChange} />
                        </FormControl>
                        <FormControl mb="4">
                            <FormLabel>Image Link</FormLabel>
                            <Input type="text" value={imageLink} onChange={handleImageLinkChange} />
                        </FormControl>
                        <Button type="submit" colorScheme="purple">Add Product</Button>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default AddProductPopup;
