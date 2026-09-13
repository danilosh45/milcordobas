'use client';

import { Box, Heading, SimpleGrid, VStack, Image, Text, HStack, Badge, Dialog, Portal } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FadeIn } from '@/components/ui/FadeIn';

interface DisplayMember {
  id: string;
  name: string;
  role: string;
  photo: string | null;
  order: number;
  crimes: string;
  wanted: string;
  since: string;
}

interface MembersProps {
  members: DisplayMember[];
}

const PLACEHOLDER_MEMBERS: DisplayMember[] = [
  { id: '1', name: 'DASH', role: 'Voz & Guitarra', photo: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', crimes: 'Distorsión excesiva', wanted: 'A1', since: '2019', order: 1 },
  { id: '2', name: 'KIKO', role: 'Guitarra Principal', photo: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400', crimes: 'Solos interminables', wanted: 'B2', since: '2019', order: 2 },
  { id: '3', name: 'MARTA', role: 'Bajo', photo: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400', crimes: 'Grooves ilegales', wanted: 'C3', since: '2020', order: 3 },
  { id: '4', name: 'LUCAS', role: 'Batería', photo: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400', crimes: 'Ritmos peligrosos', wanted: 'D4', since: '2019', order: 4 },
];

function WantedStamp({ code }: { code: string }) {
  return (
    <Box position="absolute" top={4} right={4} transform="rotate(12deg)" zIndex={10}>
      <Box
        border="3px solid"
        borderColor="red.500"
        color="red.500"
        px={3}
        py={1}
        fontWeight="black"
        fontSize="xs"
        textTransform="uppercase"
        letterSpacing="widest"
        position="relative"
        _before={{ content: '""', position: 'absolute', inset: 0, border: '1px solid', borderColor: 'red.500', m: '2px' }}
      >
        WANTED
        <Text fontSize="10px" textAlign="center" mt={-1}>{code}</Text>
      </Box>
    </Box>
  );
}

function BackgroundPattern() {
  return (
    <Box
      position="absolute"
      inset={0}
      opacity={0.03}
      style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`,
      }}
    />
  );
}

function MemberCard({ member }: { member: DisplayMember }) {
  return (
    <Box
      bg="gray.800"
      border="2px solid"
      borderColor="red.500"
      borderRadius="xl"
      overflow="hidden"
      position="relative"
      boxShadow="0 25px 50px rgba(220, 38, 38, 0.3)"
    >
      <BackgroundPattern />
      <WantedStamp code={member.wanted} />

      <Box bg="gray.900" px={4} py={2} borderBottom="1px" borderColor="gray.600">
        <HStack justify="space-between" align="center">
          <Text fontSize="xs" fontWeight="bold" color="gray.400" letterSpacing="widest">
            REPÚBLICA DEL ROCK
          </Text>
          <Badge bg="red.500" color="white" fontSize="10px" px={2} py={0.5}>
            PELIGROSO
          </Badge>
        </HStack>
      </Box>

      <Box position="relative" p={4}>
        <Box bg="gray.200" p={2} border="4px solid" borderColor="white" boxShadow="inset 0 0 20px rgba(0,0,0,0.3)">
          <Image
            src={member.photo ?? undefined}
            alt={member.name}
            w="full"
            aspectRatio="1"
            objectFit="cover"
            filter="grayscale(100%) contrast(120%)"
            transition="all 0.3s"
          />
          <Box position="absolute" bottom={6} left={6} bg="blackAlpha.800" color="white" px={2} py={1} fontSize="xs" fontFamily="mono">
            EXP: {member.wanted}-{member.since}
          </Box>
        </Box>
      </Box>

      <Box px={4} pb={4}>
        <VStack align="start" gap={3}>
          <Box w="full">
            <Text fontSize="xs" color="gray.500" textTransform="uppercase">Nombre</Text>
            <Text fontSize="xl" fontWeight="black" textTransform="uppercase" letterSpacing="tight" color="white">
              {member.name}
            </Text>
          </Box>
          <Box w="full">
            <Text fontSize="xs" color="gray.500" textTransform="uppercase">Función</Text>
            <Text fontSize="md" fontWeight="bold" color="gray.300">{member.role}</Text>
          </Box>
          <Box w="full" bg="rgba(127, 29, 29, 0.2)" border="1px solid" borderColor="red.500" borderRadius="md" p={3} position="relative" overflow="hidden">
            <Text fontSize="10px" color="red.400" fontWeight="bold" mb={1}>CRÍMENES MUSICALES:</Text>
            <Text fontSize="sm" color="red.200" fontStyle="italic">"{member.crimes}"</Text>
            <Box position="absolute" top={-2} right={-2} w={16} h={16} border="2px solid" borderColor="red.500" borderRadius="full" opacity={0.3} transform="rotate(-15deg)" />
          </Box>
          <HStack w="full" justify="space-between" pt={2}>
            <Text fontSize="10px" color="gray.600" fontFamily="mono">
              MIEMBRO DESDE: {member.since}
            </Text>
            <svg width="60" height="60" viewBox="0 0 100 100">
              {[...Array(20)].map((_, i) => (
                <rect key={i} x={i * 5} y={20} width={i % 2 === 0 ? 3 : 1} height={40} fill="white" />
              ))}
            </svg>
          </HStack>
        </VStack>
      </Box>

      <Box position="absolute" bottom={-10} left={-30} transform="rotate(-35deg)" bg="yellow.400" color="black" px={20} py={1} fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="widest" boxShadow="0 2px 10px rgba(0,0,0,0.3)">
        Evidencia #{member.wanted}
      </Box>
    </Box>
  );
}

export function Members({ members }: MembersProps) {
  const displayMembers = members.length > 0 ? members : PLACEHOLDER_MEMBERS;
  const [selected, setSelected] = useState<DisplayMember | null>(null);

  return (
    <Box as="section" id="banda" py={16} position="relative" overflow="hidden">
      <Box position="absolute" inset={0} bgGradient="linear(to-b, gray.900, black)" />
      <Box position="absolute" top={0} left={0} right={0} h="1px" bgGradient="linear(to-r, transparent, red.500, transparent)" opacity={0.5} />

      <Box position="relative" zIndex={1}>
        <FadeIn>
          <VStack mb={10} textAlign="center">
            <Text color="red.500" fontSize="sm" fontWeight="bold" letterSpacing="widest" textTransform="uppercase">
              Ficheros de la banda
            </Text>
            <Heading size="2xl" textTransform="uppercase" letterSpacing="tight" fontWeight="black">
              Identificaciones
            </Heading>
            <Text color="gray.500" fontSize="sm">RIESGO: Alto nivel de rock</Text>
          </VStack>
        </FadeIn>

        <SimpleGrid columns={{ base: 2, md: 4 }} gap={{ base: 6, md: 10 }} px={{ base: 4, md: 8 }} maxW="5xl" mx="auto">
          {displayMembers.map((member, index) => (
            <FadeIn key={member.id} delay={index * 0.1}>
              <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300 }}>
                <VStack
                  gap={3}
                  cursor="pointer"
                  onClick={() => setSelected(member)}
                  role="button"
                  aria-label={`Ver ficha de ${member.name}`}
                >
                  <Box
                    w={{ base: '110px', md: '140px' }}
                    h={{ base: '110px', md: '140px' }}
                    borderRadius="full"
                    overflow="hidden"
                    border="2px solid"
                    borderColor="gray.600"
                    boxShadow="0 10px 25px rgba(0,0,0,0.5)"
                    _hover={{ borderColor: 'red.500', boxShadow: '0 15px 30px rgba(220, 38, 38, 0.3)' }}
                    transition="all 0.3s"
                  >
                    <Image
                      src={member.photo ?? undefined}
                      alt={member.name}
                      w="full"
                      h="full"
                      objectFit="cover"
                      filter="grayscale(100%) contrast(120%)"
                      _hover={{ filter: 'grayscale(0%) contrast(100%)' }}
                      transition="all 0.3s"
                    />
                  </Box>
                  <VStack gap={0} textAlign="center">
                    <Text fontWeight="black" textTransform="uppercase" letterSpacing="tight" fontSize="lg">
                      {member.name}
                    </Text>
                    <Text fontSize="sm" color="gray.400">{member.role}</Text>
                    <Text fontSize="xs" color="red.500" fontWeight="bold" letterSpacing="widest" textTransform="uppercase" mt={1}>
                      Ver ficha →
                    </Text>
                  </VStack>
                </VStack>
              </motion.div>
            </FadeIn>
          ))}
        </SimpleGrid>

        <FadeIn delay={0.4}>
          <Text textAlign="center" mt={10} color="gray.600" fontSize="sm" fontFamily="mono">
            ⚠️  Si tiene información sobre estos individuos, no llame a nadie. Solo vaya a un concierto.
          </Text>
        </FadeIn>
      </Box>

      <Dialog.Root
        open={selected !== null}
        onOpenChange={(e) => { if (!e.open) setSelected(null); }}
        placement="center"
        size={{ base: 'xs', md: 'sm' }}
      >
        <Portal>
          <Dialog.Backdrop bg="blackAlpha.800" backdropFilter="blur(4px)" />
          <Dialog.Positioner>
            <Dialog.Content bg="transparent" boxShadow="none" overflow="visible">
              <Box
                position="absolute"
                top={-3}
                right={-3}
                zIndex={20}
                w={8}
                h={8}
                borderRadius="full"
                bg="red.500"
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontWeight="black"
                cursor="pointer"
                onClick={() => setSelected(null)}
                _hover={{ bg: 'red.400' }}
                aria-label="Cerrar ficha"
              >
                ✕
              </Box>
              {selected && <MemberCard member={selected} />}
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
}
