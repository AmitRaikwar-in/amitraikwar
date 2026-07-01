import { useRef, useState } from 'react';
import { useCursor } from '../Cursor';
import { CardBasic } from './Card';
import { CardExportProps } from './types';
import { Box, Button, HStack, Text, Wrap } from '@chakra-ui/react';
import { Chip, Language } from '../Chip';
import { Link } from 'react-router-dom';
import { PROJECT_NAME_ICON_MAP } from '@assets';
import { Status } from '@data';

const Card = ({
  titleText,
  chips,
  centerText,
  icon,
  description,
  link,
  npmLink,
  status,
}: CardExportProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const { setCursorInsets } = useCursor();

  return (
    <div
      ref={ref}
      onMouseEnter={() => {
        setCursorInsets({ height: 0, width: 0, top: 0, left: 0 });
        setHovered(true);
      }}
      onMouseLeave={() => {
        setCursorInsets(undefined);
        setHovered(false);
      }}
      className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[240px] lg:max-w-[220px] flex flex-col items-start p-3"
      style={{
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backgroundColor: '#120f17e6',
        animation: hovered
          ? 'float 10s ease-in-out infinite alternate'
          : 'none',
        position: 'relative',
        willChange: 'transform',
      }}
    >
      {status && (
        <HStack
          spacing={1}
          position="absolute"
          top={3}
          left={3}
          bg="rgba(0, 0, 0, 0.6)"
          px={1.5}
          py={0.5}
          borderRadius="full"
          border="1px solid"
          borderColor={
            status === Status.LIVE
              ? 'rgba(72, 187, 120, 0.3)'
              : status === Status.DEVELOPMENT
                ? 'rgba(237, 137, 54, 0.3)'
                : 'rgba(66, 153, 225, 0.3)'
          }
          zIndex={10}
        >
          <Box
            w={1.5}
            h={1.5}
            borderRadius="full"
            bg={
              status === Status.LIVE
                ? 'green.400'
                : status === Status.DEVELOPMENT
                  ? 'orange.400'
                  : 'blue.400'
            }
            className="animate-pulse"
            style={{
              boxShadow:
                status === Status.LIVE
                  ? '0 0 8px #48BB78'
                  : status === Status.DEVELOPMENT
                    ? '0 0 8px #ED8936'
                    : '0 0 8px #4299E1',
            }}
          />
          <Text
            fontSize="8px"
            fontWeight="bold"
            color="white"
            letterSpacing="wide"
          >
            {status}
          </Text>
        </HStack>
      )}
      {npmLink && (
        <Box
          as="a"
          href={npmLink}
          target="_blank"
          rel="noopener noreferrer"
          bg="#CB3837"
          color="white"
          px={2}
          py={0.5}
          borderRadius="md"
          fontSize="9px"
          fontWeight="black"
          letterSpacing="wider"
          _hover={{ opacity: 0.8 }}
          boxShadow="0 0 8px rgba(203, 56, 55, 0.4)"
          zIndex={10}
          position="absolute"
          top={3}
          right={3}
        >
          NPM
        </Box>
      )}

      <CardBasic text={centerText} icon={icon && PROJECT_NAME_ICON_MAP[icon]} />
      <HStack
        justifyContent={'space-between'}
        width={'full'}
        alignItems={'center'}
        alignContent={'center'}
        marginTop={2}
        mb={2}
      >
        <Text
          fontSize="sm"
          color="white"
          fontWeight="bold"
          textAlign="left"
          lineHeight={5}
          as="a"
          href={link}
        >
          {titleText}
        </Text>
        <Button size="xs" py={1} px={2} as={Link} to={'projects/' + icon}>
          Know More
        </Button>
      </HStack>
      <Text
        maxW={'full'}
        fontSize="xs"
        color="gray.300"
        textAlign="justify"
        lineHeight={4}
        mb={2}
      >
        {description}
      </Text>
      <Wrap mt={2} maxW={'full'}>
        {chips
          ?.slice(0, 5)
          ?.map((tag) => <Chip key={tag} type={tag} size="xs" />)}
        <Chip type={Language.more} size="xs" />
      </Wrap>
    </div>
  );
};

export default Card;
