import React from 'react';
import { Box, Text } from '@chakra-ui/react';

function Footer() {
  return (
    <Box as="footer" bg="#003366" color="white" py={4} textAlign="center">
      <Text>&copy; 2024 Trackr. All rights reserved.</Text>
    </Box>
  );
}

export default Footer;
