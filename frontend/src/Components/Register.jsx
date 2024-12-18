import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Stack, Box, Heading, Text, Flex, Radio, RadioGroup } from '@chakra-ui/react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('candidate'); // Default role is 'candidate'
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // Add register logic here (e.g., API call)
  };

  return (
    <Flex height="100vh">
      {/* Left side: Registration Form */}
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
        <Heading as="h1" size="xl">Join Our Community!</Heading>
        <Text fontSize="xl">Create an account to get started.</Text>
      </Box>


      <Box width="40%" bg="gray.100" p={10}>
        <Stack spacing={4}  alignItems="center" pt="7em">
          <Heading as="h2" size="lg">Register</Heading>
          
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Radio Buttons for Role */}
          <RadioGroup onChange={setRole} value={role}>
            <Stack direction="row">
              <Radio value="candidate">Candidate</Radio>
              <Radio value="admin">Admin</Radio>
            </Stack>
          </RadioGroup>

          <Button colorScheme="blue" onClick={handleRegister}>Register</Button>
          <Button variant="link" onClick={() => navigate('/')}>Already have an account?</Button>
        </Stack>
      </Box>

      {/* Right side: Welcome Message */}
      
    </Flex>
  );
};

export default Register;
