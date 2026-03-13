'use client';

import { Box, Flex, Link, Heading, HStack, IconButton, VStack, Text } from '@chakra-ui/react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import NextLink from 'next/link';
import { useState, useEffect } from 'react';

function Logo({ scrolled }: { scrolled: boolean }) {
  return (
    <Box display="flex" alignItems="center" gap={3}>
      <Box
        as="svg"
        viewBox="0 0 40 40"
        w="40px"
        h="40px"
        fill="none"
      >
        <motion.circle
          cx="20"
          cy="20"
          r="18"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
          color={scrolled ? '#dc2626' : '#dc2626'}
        />
        <motion.path
          d="M12 28V12L20 20L28 12V28"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          color="currentColor"
        />
        <circle cx="20" cy="32" r="2" fill="currentColor" />
      </Box>
      
      <Box>
        <Heading 
          size="md" 
          letterSpacing="tight"
          fontWeight="black"
          lineHeight="1"
        >
          <Box
            as="span"
            bgGradient="linear(to-r, brand.500, red.400)"
            bgClip="text"
          >
            MIL
          </Box>
        </Heading>
        <Text 
          fontSize="xs" 
          color="gray.500" 
          letterSpacing="widest"
          textTransform="uppercase"
          mt={-1}
        >
        </Text>
      </Box>
    </Box>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const navHeight = useTransform(scrollY, [0, 100], [80, 70]);
  const bgOpacity = useTransform(scrollY, [0, 100], [0.3, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/#conciertos', label: 'Conciertos' },
    { href: '/#galeria', label: 'Galería' },
    { href: '/#banda', label: 'La Banda' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href.replace('/', ''));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      style={{
        height: navHeight,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(10, 10, 10, 0.9)',
          opacity: bgOpacity,
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(220, 38, 38, 0.2)',
        }}
      />

      <Flex
        maxW="7xl"
        mx="auto"
        px={{ base: 4, md: 8 }}
        h="100%"
        align="center"
        justify="space-between"
        position="relative"
        zIndex={1}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          <NextLink href="/" style={{ textDecoration: 'none' }}>
            <Logo scrolled={scrolled} />
          </NextLink>
        </motion.div>

        <HStack gap={8} display={{ base: 'none', md: 'flex' }}>
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                fontSize="sm"
                fontWeight="medium"
                textTransform="uppercase"
                letterSpacing="widest"
                color="whiteAlpha.900"
                position="relative"
                _hover={{ color: 'brand.500', textDecoration: 'none' }}
                sx={{
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    width: 0,
                    height: '2px',
                    bg: 'brand.500',
                    transition: 'width 0.3s ease',
                  },
                  '&:hover::after': {
                    width: '100%',
                  },
                }}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              as={NextLink}
              href="/"
              px={4}
              py={2}
              borderRadius="full"
              bg="brand.500"
              color="white"
              fontSize="sm"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="widest"
              _hover={{ 
                bg: 'red.600', 
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 20px rgba(220, 38, 38, 0.3)'
              }}
              transition="all 0.3s"
            >
              Inicio
            </Link>
          </motion.div>
        </HStack>

        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={() => setIsOpen(!isOpen)}
          variant="ghost"
          aria-label="Toggle navigation"
          color="white"
          _hover={{ bg: 'whiteAlpha.200' }}
        >
          <Box w="6" h="6" position="relative">
            <motion.span
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              style={{
                position: 'absolute',
                top: '4px',
                left: 0,
                width: '100%',
                height: '2px',
                background: 'white',
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              style={{
                position: 'absolute',
                top: '11px',
                left: 0,
                width: '100%',
                height: '2px',
                background: 'white',
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              style={{
                position: 'absolute',
                top: '18px',
                left: 0,
                width: '100%',
                height: '2px',
                background: 'white',
              }}
              transition={{ duration: 0.3 }}
            />
          </Box>
        </IconButton>
      </Flex>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              display={{ md: 'none' }}
              bg="blackAlpha.950"
              backdropFilter="blur(20px)"
              borderBottom="1px"
              borderColor="whiteAlpha.200"
              px={4}
              py={6}
            >
              <VStack gap={4} align="start">
                <NextLink href="/" style={{ width: '100%' }}>
                  <Box
                    w="full"
                    px={4}
                    py={3}
                    borderRadius="lg"
                    bg="brand.500"
                    color="white"
                    fontWeight="bold"
                    textAlign="center"
                    textTransform="uppercase"
                    letterSpacing="widest"
                    onClick={() => setIsOpen(false)}
                  >
                    Inicio
                  </Box>
                </NextLink>
                
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    fontSize="lg"
                    fontWeight="medium"
                    textTransform="uppercase"
                    letterSpacing="widest"
                    color="white"
                    _hover={{ color: 'brand.500' }}
                    pl={4}
                  >
                    {link.label}
                  </Link>
                ))}
              </VStack>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}