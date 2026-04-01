'use client';

import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import NextLink from 'next/link';

interface HeroProps {
  heroImage?: string | null;
}

export function Hero({ heroImage }: HeroProps) {
  const bgImage = heroImage || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920';

  return (
    <Box
      h="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      bgGradient="linear(to-b, gray.900, brand.900)"
      position="relative"
    >
      <Box
        position="absolute"
        inset={0}
        bgImage={`url('${bgImage}')`}
        bgSize="cover"
        backgroundPosition="center"
        opacity={0.3}
      />
      <VStack gap={6} position="relative" zIndex={1}>
        <Heading size="4xl" textTransform="uppercase" letterSpacing="widest" fontWeight="black">
          Mil Córdobas
        </Heading>
        <Text fontSize="2xl" color="gray.300" fontWeight="light">
          Buenas Practicas
        </Text>
        <Button as={NextLink} href="#conciertos" size="lg" bg="brand.500" color="white" _hover={{ bg: 'red.600' }} px={8}>
          Ver Conciertos
        </Button>
      </VStack>
    </Box>
  );
}
