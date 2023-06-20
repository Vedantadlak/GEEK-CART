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
    Link,
    VStack
} from '@chakra-ui/react';

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useFirebase } from './FirebaseContext';

export default function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); // Use useNavigate hook instead of navigate function
    const firebase = useFirebase();

    const handleSignup = async () => {
        try {
            const response = await firebase
                .auth()
                .createUserWithEmailAndPassword(formData.email, formData.password);

            // Update user profile with first and last name
            await response.user.updateProfile({
                displayName: `${formData.firstName} ${formData.lastName}`,
            });

            console.log(response);
            alert('Signup successful!');
            navigate('/cart'); // Use navigate function to redirect to '/cart'
        } catch (error) {
            console.error(error);
            alert('Signup error');
        }
    };

    // Rest of the component code...



    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('purple.100', 'purple.800')}
        >
            <VStack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <VStack align={'center'}>
                    <Heading
                        fontSize={'4xl'}
                        textAlign={'center'}
                        color={useColorModeValue('purple.800', 'white')}
                    >
                        Sign up
                    </Heading>
                    <Text
                        fontSize={'lg'}
                        color={useColorModeValue('gray.600', 'gray.400')}
                    >
                        to enjoy all of our cool features ✌
                    </Text>
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
                                loadingText="Submitting"
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
                                Already a user? <Link color={'blue.400'} to="/login">Login</Link>
                            </Text>

                        </Stack>
                    </Stack>
                </Box>
            </VStack>
        </Flex>
    );
}
