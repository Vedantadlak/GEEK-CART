import { Link } from 'react-router-dom';
import { Flex, Box, Heading, ButtonGroup, Button } from '@chakra-ui/react';
import React from 'react';

function Home() {
    return (
        <div
            className="Home"
            style={{
                backgroundImage: `url("https://d2gg9evh47fn9z.cloudfront.net/1600px_COLOURBOX31548492.jpg")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                p="8"
                bg="rgba(255, 255, 255, 0.8)"
                boxShadow="md"
                rounded="md"
                textAlign="center"
            >
                <Heading size="lg" mb="4">
                    Welcome to the GEEK CART
                </Heading>

                <ButtonGroup>
                    <Link to="/signup">
                        <Button colorScheme="purple" variant="outline" mr="2">
                            Sign Up
                        </Button>
                    </Link>
                    <Link to="/login">
                        <Button colorScheme="purple">Log in</Button>
                    </Link>
                </ButtonGroup>
            </Box>
        </div>
    );
}

export default Home;
