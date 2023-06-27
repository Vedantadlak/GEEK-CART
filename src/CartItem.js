import React from 'react';
import {
    Box,
    Image,
    Text,
    Button,
    Flex,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon, DeleteIcon } from '@chakra-ui/icons';

function CartItem(props) {
    const { product, onIncreaseQuantity, onDecreaseQuantity, onHandleDeleteProduct } = props;

    return (
        <Flex alignItems="center" justifyContent="space-between" mb={4}>
            <Box width={110} height={110} borderRadius="md" overflow="hidden" mr={4}>
                <Image src={product.imageLink} alt={product.title} objectFit="cover" />
            </Box>
            <Box flex="1">
                <Text fontSize="lg" fontWeight="bold">{product.title}</Text>
                <Text color="gray.600">Rs {product.price}</Text>
                <Text color="gray.600">Qty: {product.qty}</Text>
                <Flex mt={2}>
                    <Button
                        size="sm"
                        colorScheme="purple"
                        leftIcon={<AddIcon />}
                        onClick={() => onIncreaseQuantity(product)}
                    >
                        Increase
                    </Button>
                    <Button
                        size="sm"
                        colorScheme="purple"
                        leftIcon={<MinusIcon />}
                        onClick={() => onDecreaseQuantity(product)}
                        disabled={product.qty === 1}
                        ml={2}
                    >
                        Decrease
                    </Button>
                    <Button
                        size="sm"
                        colorScheme="red"
                        leftIcon={<DeleteIcon />}
                        onClick={() => onHandleDeleteProduct(product.id)}
                        ml={2}
                    >
                        Delete
                    </Button>
                </Flex>
            </Box>
        </Flex>
    );
}

export default CartItem;
