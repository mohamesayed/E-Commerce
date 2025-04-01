import React from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100vw',
        maxWidth: '100%',
        overflowX: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 8, sm: 9 }, // Add padding top to account for fixed navbar
          width: '100vw',
          maxWidth: '100%',
          overflowX: 'hidden',
          px: { xs: 2, sm: 3, md: 4 }, // Add padding on sides
          bgcolor: 'background.default',
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout; 