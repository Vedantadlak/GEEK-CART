import React, { useState } from 'react';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link as ChakraLink,
    VStack,
    IconButton,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useFirebase } from './FirebaseContext';

export default function SellerSignup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const firebase = useFirebase();

    const handleSignup = async () => {
        try {
            const response = await firebase.auth().createUserWithEmailAndPassword(
                formData.email,
                formData.password
            );

            // Update user profile with first and last name
            await response.user.updateProfile({
                displayName: `${formData.firstName} ${formData.lastName}`,
            });

            // Send a POST request to the backend to set custom claim 'seller' for the user
            const res = await fetch('http://localhost:4000/seller-signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                }),
            });

            if (res.ok) {
                alert('Signup successful!');
                navigate('/seller-login'); // Navigate to the seller login page
            } else {
                const errorResponse = await res.text(); // Get the error response as text
                throw new Error(errorResponse); // Throw an error with the error message
            }
        } catch (error) {
            console.error(error);
            alert('Signup error: ' + error.message);
        }
    };



    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('purple.100', 'purple.800')}
        >
            <Box position="absolute" top={4} left={4}>
                <IconButton
                    icon={<ArrowBackIcon />}
                    variant="ghost"
                    colorScheme="purple"
                    size="lg"
                    onClick={() => navigate('/')}
                />
            </Box>
            <VStack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <VStack align={'center'}>
                    <Heading
                        fontSize={'4xl'}
                        textAlign={'center'}
                        color={useColorModeValue('purple.800', 'white')}
                    >
                        Seller Sign-up
                    </Heading>
                </VStack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="firstName" isRequired>
                            <FormLabel>First Name</FormLabel>
                            <Input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) =>
                                    setFormData({ ...formData, firstName: e.target.value })
                                }
                            />
                        </FormControl>
                        <FormControl id="lastName">
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) =>
                                    setFormData({ ...formData, lastName: e.target.value })
                                }
                            />
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                            />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }
                                    >
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                isLoading={false} // Set to true while the signup request is being processed
                                loadingText="Signing up"
                                size="lg"
                                bg={'purple.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'purple.500',
                                }}
                                onClick={handleSignup}
                            >
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user?{' '}
                                <ChakraLink as={Link} color={'blue.400'} to="/seller-login">
                                    Login
                                </ChakraLink>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </VStack>
        </Flex>
    );
}
