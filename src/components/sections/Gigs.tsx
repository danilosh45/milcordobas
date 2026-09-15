import { Box, Heading, VStack, HStack, Badge, Text, Link } from '@chakra-ui/react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FadeIn } from '@/components/ui/FadeIn';
import { NextGig } from '@/components/sections/NextGig';
import { PosterThumb } from '@/components/sections/PosterThumb';
import type { Gig } from '@/lib/notion';

interface GigsProps {
  gigs: Gig[];
}

function GigRow({ gig, index, past = false }: { gig: Gig; index: number; past?: boolean }) {
  return (
    <FadeIn delay={index * 0.1}>
      <HStack
        p={6}
        bg="whiteAlpha.50"
        borderRadius="2xl"
        justify="space-between"
        wrap="wrap"
        gap={6}
        border="1px"
        borderColor="whiteAlpha.100"
        backdropFilter="blur(10px)"
        opacity={past ? 0.55 : 1}
        _hover={{
          borderColor: 'brand.500',
          bg: 'whiteAlpha.100',
          opacity: 1,
          transform: 'translateX(10px)',
          transition: 'all 0.3s ease'
        }}
        transition="all 0.3s ease"
      >
        <HStack gap={5} align="center">
          {gig.poster && (
            <PosterThumb src={gig.poster} alt={`Cartel ${gig.venue}`} />
          )}
          <VStack align="start" gap={2}>
            <Text
              fontSize="sm"
              color="brand.500"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="widest"
            >
              {gig.date
                ? format(new Date(gig.date), 'EEEE d MMMM yyyy', { locale: es })
                : 'Fecha por confirmar'
              }
            </Text>
            <Heading size="lg" fontWeight="bold">
              {gig.venue}
            </Heading>
            <Text color="gray.400" fontSize="lg">
              {gig.city}
            </Text>
          </VStack>
        </HStack>

        <HStack gap={4}>
          {past ? (
            <Badge colorScheme="gray" size="lg" px={4} py={2} fontSize="md" textTransform="uppercase">
              Finalizado
            </Badge>
          ) : (
            <>
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
                <Link
                  href={gig.ticketUrl}
                  target="_blank"
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  px={4}
                  py={2}
                  borderRadius="md"
                  bg="brand.500"
                  color="white"
                  fontSize="md"
                  fontWeight="semibold"
                  _hover={{ bg: 'red.600', transform: 'scale(1.05)' }}
                  transition="all 0.2s"
                >
                  Entradas
                </Link>
              )}
            </>
          )}
        </HStack>
      </HStack>
    </FadeIn>
  );
}

export function Gigs({ gigs }: GigsProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = gigs.filter((gig) => gig.date && new Date(gig.date) >= today);
  const past = gigs
    .filter((gig) => gig.date && new Date(gig.date) < today)
    .reverse();

  return (
    <Box as="section" id="conciertos" py={24} position="relative">
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

      <VStack gap={6} align="stretch" maxW="4xl" mx="auto" px={{ base: 4, md: 0 }}>
        {upcoming.length === 0 ? (
          <FadeIn delay={0.2}>
            <Text textAlign="center" color="gray.500" fontSize="xl">
              Próximamente nuevas fechas...
            </Text>
          </FadeIn>
        ) : (
          <>
            <NextGig gig={upcoming[0]} />
            {upcoming.slice(1).map((gig, index) => (
              <GigRow key={gig.id} gig={gig} index={index} />
            ))}
          </>
        )}

        {past.length > 0 && (
          <>
            <FadeIn>
              <HStack mt={12} mb={2} gap={4} align="center">
                <Box flex={1} h="1px" bgGradient="linear(to-r, transparent, gray.600)" />
                <Text color="gray.500" fontSize="sm" fontWeight="bold" textTransform="uppercase" letterSpacing="widest">
                  Archivo
                </Text>
                <Box flex={1} h="1px" bgGradient="linear(to-l, transparent, gray.600)" />
              </HStack>
            </FadeIn>
            {past.map((gig, index) => (
              <GigRow key={gig.id} gig={gig} index={index} past />
            ))}
          </>
        )}
      </VStack>
    </Box>
  );
}
