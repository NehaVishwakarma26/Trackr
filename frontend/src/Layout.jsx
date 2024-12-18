import React from 'react';
import { Box } from '@chakra-ui/react';
import Header from './Components/Header';
import Footer from './Components/Footer';

const Layout = ({ children }) => {
  return (
    <Box>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <Box as="main" minHeight="80vh">
        {children}
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Layout;
