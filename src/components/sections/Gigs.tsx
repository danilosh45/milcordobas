import { Box, Heading, VStack, HStack, Badge, Button, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FadeIn } from '@/components/ui/FadeIn';
import type { Gig } from '@/lib/notion';

interface GigsProps {
  gigs: Gig[];
}

export function Gigs({ gigs }: GigsProps) {
  return (
    <Box as="section" id="conciertos" py={24} position="relative">
      {/* Decoración de fondo */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="1px"
        bgGradient="linear(to-r, transparent, brand.500, transparent)"
      />

      <FadeIn>
        <Heading 
          size="2xl" 
          mb={16} 
          textAlign="center" 
          textTransform="uppercase"
          letterSpacing="widest"
        >
          Próximos Conciertos
        </Heading>
      </FadeIn>

      <VStack gap={6} align="stretch" maxW="4xl" mx="auto">
        {gigs.length === 0 ? (
          <FadeIn delay={0.2}>
            <Text textAlign="center" color="gray.500" fontSize="xl">
              Próximamente nuevas fechas...
            </Text>
          </FadeIn>
        ) : (
          gigs.map((gig, index) => (
            <FadeIn key={gig.id} delay={index * 0.1}>
              <HStack
                p={8}
                bg="whiteAlpha.50"
                borderRadius="2xl"
                justify="space-between"
                wrap="wrap"
                gap={6}
                border="1px"
                borderColor="whiteAlpha.100"
                backdropFilter="blur(10px)"
                _hover={{ 
                  borderColor: 'brand.500', 
                  bg: 'whiteAlpha.100',
                  transform: 'translateX(10px)',
                  transition: 'all 0.3s ease'
                }}
                transition="all 0.3s ease"
              >
                <VStack align="start" gap={2}>
                  <Text 
                    fontSize="sm" 
                    color="brand.500" 
                    fontWeight="bold" 
                    textTransform="uppercase"
                    letterSpacing="widest"
                  >
                    {format(new Date(gig.date), 'EEEE d MMMM yyyy', { locale: es })}
                  </Text>
                  <Heading size="lg" fontWeight="bold">
                    {gig.venue}
                  </Heading>
                  <Text color="gray.400" fontSize="lg">
                    {gig.city}
                  </Text>
                </VStack>

                <HStack gap={4}>
                  <Badge 
                    colorScheme={gig.status === 'Agotado' ? 'red' : gig.status === 'Cancelado' ? 'gray' : 'green'} 
                    size="lg" 
                    px={4} 
                    py={2}
                    fontSize="md"
                    textTransform="uppercase"
                  >
                    {gig.status}
                  </Badge>
                  {gig.ticketUrl && gig.status !== 'Agotado' && (
                    <Button 
                      as="a" 
                      href={gig.ticketUrl} 
                      target="_blank" 
                      size="md" 
                      bg="brand.500" 
                      color="white" 
                      _hover={{ bg: 'red.600', transform: 'scale(1.05)' }}
                      transition="all 0.2s"
                    >
                      Entradas
                    </Button>
                  )}
                </HStack>
              </HStack>
            </FadeIn>
          ))
        )}
      </VStack>
    </Box>
  );
}