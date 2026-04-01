'use client';

import { Box } from '@chakra-ui/react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box minH="100vh" bg="brand.900" color="white">
      <Navbar />
      <Box pt="80px">
        {children}
      </Box>
      <Footer />
    </Box>
  );
}