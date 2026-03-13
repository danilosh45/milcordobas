'use client';

import { Box, Heading, SimpleGrid, Image, Text } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FadeIn } from '@/components/ui/FadeIn';
import type { GalleryItem } from '@/lib/notion';

interface GalleryProps {
  items: GalleryItem[];
}

const PLACEHOLDER_PHOTOS = [
  { url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800', caption: 'Soundcheck Madrid' },
  { url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800', caption: 'Backstage vibes' },
  { url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800', caption: 'La primera' },
  { url: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800', caption: 'Festival Sur' },
  { url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800', caption: 'Ensayo intenso' },
  { url: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800', caption: 'After party' },
];

export function Gallery({ items }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<{url: string, caption: string} | null>(null);
  
  // Preparar fotos con captions
  const photos = items.length > 0 && items[0].photos.length > 0 
    ? items.flatMap(item => 
        item.photos.map((photo, idx) => ({
          url: photo,
          caption: item.name || `Foto ${idx + 1}`
        }))
      )
    : PLACEHOLDER_PHOTOS;

  // Rotaciones aleatorias para efecto "tiradas en mesa"
  const rotations = [-5, 3, -2, 4, -4, 2, 5, -3, 1, -6];

  return (
    <Box as="section" id="galeria" py={24} position="relative" overflow="hidden">
      {/* Fondo con textura sutil */}
      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(to-b, brand.900, gray.900)"
        opacity={0.5}
      />
      
      <Box position="relative" zIndex={1}>
        <FadeIn>
          <Heading 
            size="2xl" 
            mb={16} 
            textAlign="center" 
            textTransform="uppercase"
            letterSpacing="widest"
          >
            Momentos
          </Heading>
        </FadeIn>

        <SimpleGrid 
          columns={{ base: 2, md: 3, lg: 4 }} 
          gap={8} 
          px={{ base: 4, md: 8 }}
          maxW="7xl"
          mx="auto"
        >
          {photos.map((photo, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <motion.div
                initial={{ rotate: rotations[idx % rotations.length] }}
                whileHover={{ 
                  rotate: 0, 
                  scale: 1.1, 
                  zIndex: 50,
                  y: -20
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  cursor: 'pointer',
                  transformOrigin: 'center bottom',
                }}
                onClick={() => setSelectedImage(photo)}
              >
                {/* Marco Polaroid */}
                <Box
                  bg="white"
                  p={3}
                  pb={12}
                  borderRadius="2px"
                  boxShadow="0 10px 30px rgba(0,0,0,0.4), 0 2px 5px rgba(0,0,0,0.2)"
                  position="relative"
                  _hover={{
                    boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 10px 20px rgba(0,0,0,0.3)',
                  }}
                  transition="box-shadow 0.3s"
                >
                  {/* Cinta adhesiva */}
                  <Box
                    position="absolute"
                    top="-10px"
                    left="50%"
                    transform="translateX(-50%) rotate(-2deg)"
                    w="30%"
                    h="25px"
                    bg="rgba(255,255,255,0.6)"
                    opacity={0.8}
                    zIndex={10}
                    boxShadow="0 1px 3px rgba(0,0,0,0.2)"
                  />
                  
                  {/* Imagen */}
                  <Box
                    overflow="hidden"
                    bg="gray.200"
                    aspectRatio="1"
                    position="relative"
                  >
                    <Image
                      src={photo.url}
                      alt={photo.caption}
                      objectFit="cover"
                      w="100%"
                      h="100%"
                      filter="sepia(20%) contrast(110%)"
                      transition="all 0.3s"
                      _hover={{ filter: 'sepia(0%) contrast(100%)' }}
                    />
                    
                    {/* Efecto "brillo" de foto antigua */}
                    <Box
                      position="absolute"
                      inset={0}
                      bgGradient="linear(to-br, whiteAlpha.300, transparent, blackAlpha.100)"
                      pointerEvents="none"
                    />
                  </Box>

                  {/* Caption estilo handwriting */}
                  <Text
                    position="absolute"
                    bottom={3}
                    left={0}
                    right={0}
                    textAlign="center"
                    fontFamily="cursive"
                    fontSize="sm"
                    color="gray.700"
                    transform="rotate(-1deg)"
                  >
                    {photo.caption}
                  </Text>
                </Box>
              </motion.div>
            </FadeIn>
          ))}
        </SimpleGrid>
      </Box>

      {/* Lightbox estilo "proyector" */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.95)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
            }}
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 10 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Marco polaroid grande */}
              <Box
                bg="white"
                p={6}
                pb={16}
                borderRadius="4px"
                boxShadow="0 50px 100px rgba(0,0,0,0.5)"
                maxW="90vw"
                maxH="90vh"
              >
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.caption}
                  maxH="70vh"
                  maxW="80vw"
                  objectFit="contain"
                />
                <Text
                  mt={4}
                  textAlign="center"
                  fontFamily="cursive"
                  fontSize="xl"
                  color="gray.800"
                >
                  {selectedImage.caption}
                </Text>
              </Box>
            </motion.div>

            {/* Instrucción para cerrar */}
            <Text
              position="absolute"
              bottom={8}
              color="whiteAlpha.600"
              fontSize="sm"
              textTransform="uppercase"
              letterSpacing="widest"
            >
              Click para cerrar
            </Text>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}