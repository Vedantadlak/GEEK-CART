import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    IconButton,
    useColorModeValue,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import firebase from './firebase'; // Import the firebase instance
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await firebase.auth().signInWithEmailAndPassword(
                formData.email,
                formData.password
            );
            console.log(response);
            alert('Login successful!');
            navigate('/cart');
        } catch (error) {
            console.error(error);
            alert('Login error');
        }
    };

    return (
        <Flex
            minH={'100vh'}
            align={'start'}
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
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} color={useColorModeValue('purple.800', 'white')}>
                        Sign in to your account
                    </Heading>
                </Stack>
                <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                                <Checkbox colorScheme="purple">Remember me</Checkbox>
                                <Link color={'blue.400'}>Forgot password?</Link>
                            </Stack>
                            <Button
                                bg={'purple.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'purple.500',
                                }}
                                onClick={handleLogin}
                            >
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
