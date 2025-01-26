import { useRef } from 'react';
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
  const { setCursorInsets } = useCursor();
  return (
    <Box
      ref={ref}
      onMouseEnter={() =>
        setCursorInsets({
          height: 0,
          width: 0,
          top: 0,
          left: 0,
        })
      }
      onMouseLeave={() => setCursorInsets(undefined)}
      className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm p-4 relative"
      style={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      <CardBasic text={centerText} icon={icon && PROJECT_NAME_ICON_MAP[icon]} />
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
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
        <Button size="sm" py={0} px={1} as={Link} to={'/projects/' + icon}>
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
