import { Box, Heading, VStack, Text, chakra } from '@chakra-ui/react';
import { FadeIn } from '@/components/ui/FadeIn';

// ID del artista en Spotify (la parte final de open.spotify.com/artist/<ID>)
const SPOTIFY_ARTIST_ID = '';

export function Spotify() {
  if (!SPOTIFY_ARTIST_ID) return null;

  return (
    <Box as="section" id="musica" py={24} position="relative">
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="1px"
        bgGradient="linear(to-r, transparent, brand.500, transparent)"
      />

      <FadeIn>
        <VStack mb={12} textAlign="center">
          <Text color="red.500" fontSize="sm" fontWeight="bold" letterSpacing="widest" textTransform="uppercase">
            Dale al play
          </Text>
          <Heading size="2xl" textTransform="uppercase" letterSpacing="tight" fontWeight="black">
            Escúchanos
          </Heading>
        </VStack>
      </FadeIn>

      <FadeIn delay={0.2}>
        <Box maxW="2xl" mx="auto" px={{ base: 4, md: 0 }}>
          <chakra.iframe
            src={`https://open.spotify.com/embed/artist/${SPOTIFY_ARTIST_ID}?utm_source=generator&theme=0`}
            w="full"
            h="352px"
            borderRadius="xl"
            border="1px solid"
            borderColor="whiteAlpha.100"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </Box>
      </FadeIn>
    </Box>
  );
}
