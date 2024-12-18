import React from 'react';
import { Box } from '@chakra-ui/react';
import HomeHeader from './Components/HomeHeader';
import Footer from './Components/Footer';

const HomeLayout = ({ children }) => {
  return (
    <Box>
      {/* Header */}
      <HomeHeader />

      {/* Main Content */}
      <Box as="main" minHeight="80vh">
        {children}
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default HomeLayout;
