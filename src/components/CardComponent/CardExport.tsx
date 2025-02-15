import { useRef, useState } from 'react';
import { useCursor } from '../Cursor';
import { CardBasic, Icon } from './Card';
import { CardExportProps } from './types';
import { Box, Button, HStack, Text, Wrap } from '@chakra-ui/react';
import { Chip, Language } from '../Chip';
import { Link } from 'react-router-dom';
import { PROJECT_NAME_ICON_MAP } from '@assets';

const Card = ({
  titleText,
  chips,
  centerText,
  icon,
  description,
  link,
}: CardExportProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const { setCursorInsets } = useCursor();

  return (
    <Box
      ref={ref}
      onMouseEnter={() => {
        setCursorInsets({
          height: 0,
          width: 0,
          top: 0,
          left: 0,
        });
        setHovered(true);
      }}
      onMouseLeave={() => {
        setCursorInsets(undefined);
        setHovered(false);
      }}
      className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm p-4 relative"
      style={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      }}
      animation={
        hovered
          ? `float 10s ease-in-out infinite alternate, wiggle 4s linear infinite alternate; /* Combined animations */`
          : ''
      }
    >
      <style>
        {`
        @keyframes float {
        0% { transform: translateY(0); } /* Start at original position */
        50% { transform: translateY(-10px); } /* Move up 10px */
        100% { transform: translateY(0); } /* Return to original position */
        }
        
        @keyframes wiggle {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(1deg); } /* Wiggle slightly to the right */
        50% { transform: rotate(0deg); }
        75% { transform: rotate(-1deg); } /* Wiggle slightly to the left */
        100% { transform: rotate(0deg); }
        }
        `}
      </style>

      <CardBasic text={centerText} icon={icon && PROJECT_NAME_ICON_MAP[icon]} />
      <Icon
        className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black"
        isHovered={hovered}
      />
      <Icon
        className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black"
        isHovered={hovered}
      />
      <Icon
        className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black"
        isHovered={hovered}
      />
      <Icon
        className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black"
        isHovered={hovered}
      />
      <HStack
        justifyContent={'space-between'}
        width={'full'}
        alignItems={'center'}
        alignContent={'center'}
        marginTop={2}
        mb={2}
      >
        <Text
          fontSize="md"
          color="white"
          fontWeight="bold"
          textAlign="left"
          lineHeight={5}
          as="a"
          href={link}
        >
          {titleText}
        </Text>
        <Button size="sm" py={0} px={1} as={Link} to={'projects/' + icon}>
          Know More
        </Button>
      </HStack>
      <Text
        maxW={'72'}
        fontSize="sm"
        color="white"
        textAlign="justify"
        lineHeight={5}
        mb={2}
      >
        {description}
      </Text>
      <Wrap mt={2} maxW={'72'}>
        {chips
          ?.slice(0, 5)
          ?.map((tag) => <Chip key={tag} type={tag} size="sm" />)}
        <Chip type={Language.more} size="sm" />
      </Wrap>
    </Box>
  );
};

export default Card;
