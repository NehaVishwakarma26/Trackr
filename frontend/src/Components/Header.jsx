import React from 'react';
import { Flex, Heading, Link, Spacer, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from localStorage
    navigate('/'); // Navigate to the home page
  };

  const user = JSON.parse(localStorage.getItem('user')); // Parse the JSON string

  return (
    <Flex as="header" bg="white" p={4} boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" align="center">
      {/* Logo */}
      <Heading as="h1" fontSize="3xl" fontWeight="bold" color="black">
        <span style={{ color: '#003366' }}>T</span>rackr
      </Heading>

      <Spacer />

      {/* Navbar Links */}
      <Flex gap={4} align="center">
        <Link
          fontWeight="medium"
          fontSize="md"
          _hover={{ textDecoration: 'underline', color: '#003366' }}
          onClick={() => {
            if (user?.role === 'admin') {
              navigate('/admin-dashboard');
            } else {
              navigate('/candidate-dashboard');
            }
          }}
        >
          Dashboard
        </Link>

        <Button
          colorScheme="blue"
          size="sm"
          onClick={handleLogout}
          _hover={{ bg: '#003366' }}
        >
          Log Out
        </Button>
      </Flex>
    </Flex>
  );
}

export default Header;
