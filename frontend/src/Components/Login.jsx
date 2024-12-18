import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Stack, Box, Heading, Text, Flex } from '@chakra-ui/react';
import axios from 'axios';  // Import axios here

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Basic input validation
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });
      console.log(response.data);  // Log response data to verify user and token
  
      const { user, token } = response.data;
  
      // Store user info and token in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));  // Store the entire user object
  
      console.log(localStorage.getItem('token')); // Should log the token
      console.log(localStorage.getItem('user'));  // Should log the full user object as a string
  
      // Redirect based on user role
      if (user.role === 'candidate') {
        navigate('/candidate-dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin-dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };
  

  return (
    <Flex height="100vh">
      <Box
        width="60%"
        bg="blue.500"
        color="white"
        p={10}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Heading as="h1" size="xl">Welcome to Our Community!</Heading>
        <Text fontSize="xl">Log in to start your journey.</Text>
      </Box>

      <Box width="40%" bg="gray.100" p={10}>
        <Stack spacing={4} alignItems="center" pt="7em">
          <Heading fontSize="4xl">Sign in to your account</Heading>
          <Text fontSize="lg" color="gray.600">
            to schedule and track your projects 🚀
          </Text>

          <Input
            mt="4em"
            width="25em"
            height="3em"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            mt="2em"
            width="25em"
            height="3em"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errorMessage && <Text color="red.500">{errorMessage}</Text>}

          <Button colorScheme="blue" mt="2em" onClick={handleLogin}>
            Login
          </Button>

          <Button variant="link" onClick={() => navigate('/register')}>
            Don't have an account? Register
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Login;
