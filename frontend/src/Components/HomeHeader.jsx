import React from 'react';
import { Flex, Heading, Box, Button, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // Updated hook for navigation

function HomeHeader() {
  const navigate = useNavigate();

  // Navigation handler
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Flex as="header" bg="white" p={6} boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" justify="space-between" align="center">
      {/* Logo Section */}
      <Heading as="h1" fontSize="3xl" fontWeight="bold" color="black">
        <span style={{ color: '#003366' }}>T</span>rackr
      </Heading>

      {/* Navigation Section */}
      <Box>
        <Link onClick={() => handleNavigation('/register')}>
          <Button colorScheme="blue" variant="link" mr={4}>
            Sign Up
          </Button>
        </Link>
        <Link onClick={() => handleNavigation('/login')}>
          <Button colorScheme="blue" variant="link">
            Log In
          </Button>
        </Link>
      </Box>
    </Flex>
  );
}

export default HomeHeader;
