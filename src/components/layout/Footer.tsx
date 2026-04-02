import { Box, Flex, Text, Link, HStack, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/ui/FadeIn';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FadeIn>
      <Box as="footer" bg="black" py={12} borderTop="1px" borderColor="whiteAlpha.200">
        <Flex 
          maxW="6xl" 
          mx="auto" 
          px={6} 
          justify="space-between" 
          align="center"
          wrap="wrap"
          gap={8}
          direction={{ base: 'column', md: 'row' }}
        >
          <VStack align={{ base: 'center', md: 'start' }} gap={2}>
            <Text 
              fontSize="xl" 
              fontWeight="black" 
              textTransform="uppercase"
              letterSpacing="tight"
              bgGradient="linear(to-r, brand.500, red.400)"
              bgClip="text"
            >
              Mil Córdobas
            </Text>
            <Text color="gray.500" fontSize="sm">
              Rock desde Alfaro desde el 2019 
            </Text>
          </VStack>

          <HStack gap={6}>
            {[
              { label: 'Instagram', href: 'https://instagram.com' },
              { label: 'Spotify', href: 'https://spotify.com' },
              { label: 'YouTube', href: 'https://youtube.com' },
            ].map((social) => (
              <motion.div
                key={social.label}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={social.href}
                  target="_blank"
                  color="gray.500"
                  fontSize="sm"
                  textTransform="uppercase"
                  letterSpacing="widest"
                  borderBottom="1px solid"
                  borderColor="transparent"
                  _hover={{ 
                    color: 'brand.500', 
                    textDecoration: 'none',
                    borderColor: 'brand.500'
                  }}
                  transition="all 0.3s"
                  pb={1}
                >
                  {social.label}
                </Link>
              </motion.div>
            ))}
          </HStack>

          <Text color="gray.600" fontSize="xs">
            © {currentYear} Todos los derechos reservados
          </Text>
        </Flex>
      </Box>
    </FadeIn>
  );
}
