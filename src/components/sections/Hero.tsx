'use client';

import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import NextLink from 'next/link';

interface HeroProps {
  heroImage?: string | null;
  heroVideo?: string | null;
}

export function Hero({ heroImage, heroVideo }: HeroProps) {
  const bgMedia = heroVideo || heroImage || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920';
  const isVideo = heroVideo || bgMedia.endsWith('.mp4') || bgMedia.endsWith('.webm');

  return (
    <Box
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      position="relative"
      overflow="hidden"
      w="100vw"
      left="50%"
      right="50%"
      marginLeft="-50vw"
      marginRight="-50vw"
    >
      {isVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src={bgMedia} type="video/mp4" />
        </video>
      ) : (
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url('${bgMedia}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      <Box
        position="absolute"
        inset={0}
        bg="blackAlpha.700"
        zIndex={1}
      />

      <VStack gap={8} position="relative" zIndex={2} px={4}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Text 
            fontSize="lg" 
            letterSpacing="widest" 
            textTransform="uppercase" 
            color="brand.500"
            fontWeight="bold"
          >
            Rock desde Córdoba
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Heading 
            size="4xl" 
            textTransform="uppercase" 
            letterSpacing="tight"
            fontWeight="black"
            lineHeight="1"
            textShadow="0 4px 30px rgba(0,0,0,0.8)"
          >
            Mil Córdobas
          </Heading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Text fontSize="2xl" color="gray.200" fontWeight="light" maxW="600px">
            Buenas Prácticas, malas decisiones, mejor música
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Button asChild size="lg" bg="brand.500" color="white" _hover={{ bg: 'red.600', transform: 'translateY(-2px)' }} px={10} py={7} fontSize="lg" boxShadow="0 10px 40px rgba(220, 38, 38, 0.4)" transition="all 0.3s">
            <NextLink href="#conciertos">
              Ver Conciertos
            </NextLink>
          </Button>
        </motion.div>
      </VStack>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Box
            w="30px"
            h="50px"
            border="2px solid"
            borderColor="whiteAlpha.600"
            borderRadius="full"
            position="relative"
          >
            <motion.div
              animate={{ y: [0, 20, 0], opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{
                width: '6px',
                height: '6px',
                background: 'white',
                borderRadius: '50%',
                position: 'absolute',
                top: '8px',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />
          </Box>
        </motion.div>
      </motion.div>
    </Box>
  );
}
