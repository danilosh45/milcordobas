'use client';

import { Box, Dialog, Image, Portal } from '@chakra-ui/react';
import { useState } from 'react';

interface PosterThumbProps {
  src: string;
  alt: string;
  size?: string;
}

export function PosterThumb({ src, alt, size = '72px' }: PosterThumbProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        w={size}
        h={size}
        objectFit="cover"
        borderRadius="lg"
        border="1px solid"
        borderColor="whiteAlpha.200"
        flexShrink={0}
        cursor="zoom-in"
        onClick={() => setOpen(true)}
        _hover={{ borderColor: 'red.500' }}
        transition="all 0.2s"
      />

      <Dialog.Root
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        placement="center"
        size="lg"
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
                onClick={() => setOpen(false)}
                _hover={{ bg: 'red.400' }}
                aria-label="Cerrar cartel"
              >
                ✕
              </Box>
              <Image
                src={src}
                alt={alt}
                w="full"
                maxH="80vh"
                objectFit="contain"
                borderRadius="xl"
              />
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}
