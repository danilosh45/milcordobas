'use client';

import { Box, Heading, VStack, HStack, Text, Link } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { PosterThumb } from '@/components/sections/PosterThumb';
import type { Gig } from '@/lib/notion';

interface NextGigProps {
  gig: Gig;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({ value, label }: { value: number | null; label: string }) {
  return (
    <VStack gap={0}>
      <Box
        bg="blackAlpha.700"
        border="1px solid"
        borderColor="red.500"
        borderRadius="md"
        px={{ base: 3, md: 4 }}
        py={2}
        minW={{ base: '56px', md: '68px' }}
        textAlign="center"
      >
        <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="black" fontFamily="mono" color="white">
          {value === null ? '--' : String(value).padStart(2, '0')}
        </Text>
      </Box>
      <Text fontSize="10px" color="gray.400" textTransform="uppercase" letterSpacing="widest" mt={1}>
        {label}
      </Text>
    </VStack>
  );
}

export function NextGig({ gig }: NextGigProps) {
  const target = new Date(`${gig.date}T21:00:00`);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    const update = () => {
      const next = getTimeLeft(target);
      setTimeLeft(next);
      setIsToday(next === null);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Box
        position="relative"
        maxW="4xl"
        mx="auto"
        mb={12}
        borderRadius="2xl"
        overflow="hidden"
        border="2px solid"
        borderColor="red.500"
        boxShadow="0 25px 60px rgba(220, 38, 38, 0.25)"
      >
        <Box position="absolute" inset={0} bgGradient="linear(to-br, gray.900, black)" />

        <VStack position="relative" zIndex={1} gap={5} px={{ base: 6, md: 12 }} py={{ base: 8, md: 12 }} textAlign="center">
          <Text
            color="red.500"
            fontSize="sm"
            fontWeight="black"
            letterSpacing="widest"
            textTransform="uppercase"
            border="2px solid"
            borderColor="red.500"
            px={4}
            py={1}
            transform="rotate(-2deg)"
          >
            Próximo show
          </Text>

          <Box>
            <Text color="gray.300" fontSize="md" textTransform="capitalize">
              {format(new Date(gig.date), "EEEE d 'de' MMMM", { locale: es })}
            </Text>
            <Heading size={{ base: '2xl', md: '3xl' }} fontWeight="black" textTransform="uppercase" letterSpacing="tight">
              {gig.venue}
            </Heading>
            <Text color="gray.400" fontSize="xl">{gig.city}</Text>
          </Box>

          {gig.poster && (
            <PosterThumb src={gig.poster} alt={`Cartel ${gig.venue}`} size="120px" />
          )}

          {isToday ? (
            <Text fontSize="3xl" fontWeight="black" color="red.500" textTransform="uppercase" letterSpacing="widest">
              ¡Es hoy!
            </Text>
          ) : (
            <HStack gap={{ base: 2, md: 4 }}>
              <CountdownUnit value={timeLeft?.days ?? null} label="días" />
              <CountdownUnit value={timeLeft?.hours ?? null} label="horas" />
              <CountdownUnit value={timeLeft?.minutes ?? null} label="min" />
              <CountdownUnit value={timeLeft?.seconds ?? null} label="seg" />
            </HStack>
          )}

          {gig.ticketUrl && gig.status !== 'Agotado' && (
            <Link
              href={gig.ticketUrl}
              target="_blank"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              px={8}
              py={3}
              borderRadius="full"
              bg="brand.500"
              color="white"
              fontSize="md"
              fontWeight="black"
              textTransform="uppercase"
              letterSpacing="widest"
              _hover={{ bg: 'red.600', transform: 'scale(1.05)', textDecoration: 'none' }}
              transition="all 0.2s"
            >
              Conseguir entradas
            </Link>
          )}
          {gig.status === 'Agotado' && (
            <Text fontSize="lg" fontWeight="black" color="red.500" textTransform="uppercase" letterSpacing="widest">
              Entradas agotadas
            </Text>
          )}
        </VStack>
      </Box>
    </motion.div>
  );
}
