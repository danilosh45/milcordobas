import { Box, Flex, Text, Link, HStack, VStack } from '@chakra-ui/react';
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
              Rock desde Córdoba desde {currentYear}
            </Text>
          </VStack>

          <HStack gap={6}>
            {[
              { label: 'Instagram', href: 'https://instagram.com' },
              { label: 'Spotify', href: 'https://spotify.com' },
              { label: 'YouTube', href: 'https://youtube.com' },
            ].map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                color="gray.500"
                fontSize="sm"
                textTransform="uppercase"
                letterSpacing="widest"
                position="relative"
                _hover={{ color: 'brand.500', textDecoration: 'none' }}
                _after={{
                  content: '""',
                  position: 'absolute',
                  bottom: '-2px',
                  left: 0,
                  width: 0,
                  height: '1px',
                  bg: 'brand.500',
                  transition: 'width 0.3s',
                }}
                __css={{
                  '&:hover::after': {
                    width: '100%',
                  },
                }}
              >
                {social.label}
              </Link>
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