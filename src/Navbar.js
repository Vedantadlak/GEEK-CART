import React from 'react';
import { Box, Image, Badge, useColorModeValue } from '@chakra-ui/react';

function Navbar(props) {
    const cartCountBg = useColorModeValue('yellow', 'purple.500');

    return (
        <Box
            bg="purple.700"
            height="70px"
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            marginBottom="4px"
        >
            <Box position="relative" marginRight="20px">
                <Image src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png" alt="cart-icon" h="32px" />
                <Badge
                    bg={cartCountBg}
                    borderRadius="50%"
                    padding="4px 8px"
                    position="absolute"
                    right="0"
                    top="-9px"
                >
                    {props.count}
                </Badge>
            </Box>
        </Box>
    );
}

export default Navbar;
