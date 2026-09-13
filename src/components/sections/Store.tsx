'use client';

import { Box, Heading, SimpleGrid, VStack, HStack, Image, Text, Badge, Link } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/ui/FadeIn';
import type { Product } from '@/lib/notion';

interface StoreProps {
  products: Product[];
}

const PLACEHOLDER_PRODUCTS: Product[] = [
  { id: '1', name: 'Camiseta Logo', description: 'Camiseta negra con el logo de Mil Córdoba serigrafiado.', price: '25 €', photos: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600'], sizes: ['S', 'M', 'L', 'XL'], status: 'Disponible', url: '', order: 1 },
  { id: '2', name: 'Sudadera Wanted', description: 'Sudadera con capucha, diseño WANTED en la espalda.', price: '45 €', photos: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600'], sizes: ['M', 'L'], status: 'Disponible', url: '', order: 2 },
  { id: '3', name: 'Vinilo Edición Limitada', description: 'Próximo lanzamiento en vinilo 12".', price: '20 €', photos: ['https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=600'], sizes: [], status: 'Próximamente', url: '', order: 3 },
  { id: '4', name: 'Gorra Bordada', description: 'Gorra negra con bordado frontal.', price: '18 €', photos: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600'], sizes: ['Única'], status: 'Agotado', url: '', order: 4 },
];

const STATUS_COLORS: Record<string, string> = {
  Disponible: 'green',
  Agotado: 'red',
  Próximamente: 'yellow',
};

export function Store({ products }: StoreProps) {
  const displayProducts = products.length > 0 ? products : PLACEHOLDER_PRODUCTS;

  return (
    <Box as="section" id="tienda" py={24} position="relative" overflow="hidden">
      <Box position="absolute" inset={0} bgGradient="linear(to-b, black, gray.900)" />
      <Box position="absolute" top={0} left={0} right={0} h="1px" bgGradient="linear(to-r, transparent, brand.500, transparent)" />

      <Box position="relative" zIndex={1}>
        <FadeIn>
          <VStack mb={16} textAlign="center">
            <Text color="red.500" fontSize="sm" fontWeight="bold" letterSpacing="widest" textTransform="uppercase">
              Merchandising oficial
            </Text>
            <Heading size="2xl" textTransform="uppercase" letterSpacing="tight" fontWeight="black">
              Tienda
            </Heading>
            <Text color="gray.500" fontSize="sm">Los pedidos se gestionan a través de Bandcamp</Text>
          </VStack>
        </FadeIn>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={8} px={{ base: 4, md: 8 }} maxW="7xl" mx="auto">
          {displayProducts.map((product, index) => {
            const available = product.status === 'Disponible' && !!product.url;
            return (
              <FadeIn key={product.id} delay={index * 0.1}>
                <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <Box
                    bg="whiteAlpha.50"
                    border="1px solid"
                    borderColor="whiteAlpha.100"
                    borderRadius="xl"
                    overflow="hidden"
                    _hover={{ borderColor: 'brand.500', boxShadow: '0 20px 40px rgba(220, 38, 38, 0.2)' }}
                    transition="all 0.3s"
                    h="full"
                  >
                    <Box position="relative">
                      <Image
                        src={product.photos[0] ?? undefined}
                        alt={product.name}
                        w="full"
                        aspectRatio="1"
                        objectFit="cover"
                        filter={product.status === 'Agotado' ? 'grayscale(80%)' : undefined}
                      />
                      <Badge
                        position="absolute"
                        top={3}
                        right={3}
                        colorScheme={STATUS_COLORS[product.status] ?? 'gray'}
                        px={3}
                        py={1}
                        fontSize="xs"
                        textTransform="uppercase"
                      >
                        {product.status}
                      </Badge>
                    </Box>

                    <VStack align="start" gap={2} p={5}>
                      <HStack w="full" justify="space-between" align="start">
                        <Heading size="md" fontWeight="black" textTransform="uppercase" letterSpacing="tight">
                          {product.name}
                        </Heading>
                        <Text fontSize="lg" fontWeight="black" color="red.500" whiteSpace="nowrap">
                          {product.price}
                        </Text>
                      </HStack>

                      {product.description && (
                        <Text color="gray.400" fontSize="sm">{product.description}</Text>
                      )}

                      {product.sizes.length > 0 && (
                        <HStack gap={1} flexWrap="wrap">
                          {product.sizes.map((size) => (
                            <Badge key={size} variant="outline" colorScheme="gray" fontSize="10px">
                              {size}
                            </Badge>
                          ))}
                        </HStack>
                      )}

                      {product.url ? (
                        <Link
                          href={available ? product.url : undefined}
                          target="_blank"
                          display="inline-flex"
                          alignItems="center"
                          justifyContent="center"
                          w="full"
                          mt={2}
                          px={4}
                          py={2}
                          borderRadius="md"
                          bg={available ? 'brand.500' : 'gray.700'}
                          color={available ? 'white' : 'gray.500'}
                          fontSize="sm"
                          fontWeight="bold"
                          textTransform="uppercase"
                          letterSpacing="widest"
                          pointerEvents={available ? 'auto' : 'none'}
                          _hover={available ? { bg: 'red.600', transform: 'scale(1.02)', textDecoration: 'none' } : undefined}
                          transition="all 0.2s"
                        >
                          {product.status === 'Agotado' ? 'Agotado' : product.status === 'Próximamente' ? 'Próximamente' : 'Comprar en Bandcamp'}
                        </Link>
                      ) : (
                        <Box
                          w="full"
                          mt={2}
                          px={4}
                          py={2}
                          borderRadius="md"
                          bg="gray.700"
                          color="gray.500"
                          fontSize="sm"
                          fontWeight="bold"
                          textTransform="uppercase"
                          letterSpacing="widest"
                          textAlign="center"
                        >
                          {product.status === 'Disponible' ? 'Enlace pendiente' : product.status}
                        </Box>
                      )}
                    </VStack>
                  </Box>
                </motion.div>
              </FadeIn>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
