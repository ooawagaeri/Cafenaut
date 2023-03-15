import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, sendPasswordReset } from './firebase';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

function Reset() {
  const [email, setEmail] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/dashboard');
  }, [user, loading, navigate]);

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack width="150%" spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Forget password</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Cafenaut
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input onChange={(e) => setEmail(e.target.value)} type="email" />
            </FormControl>

            <Stack spacing={10}>
              <Stack align={'start'} justify={'space-between'}>
                <Link color={'blue.400'} href="/register">
                  Not a user? Register here!
                </Link>
                <Link color={'blue.400'} href="/">
                  Remembered your password? Go back to Login
                </Link>
              </Stack>
              <Button
                onClick={() => sendPasswordReset(email)}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Send password reset email
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Reset;
