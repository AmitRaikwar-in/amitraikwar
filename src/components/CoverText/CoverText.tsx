import { Box, Heading, Text } from '@chakra-ui/react';
import { Cover } from './Cover';
import { ShinyText } from '../ShinyText';

const CoverText = ({
  text,
  highlightedText,
  role,
}: {
  text: string;
  highlightedText: string;
  role: string;
}) => {
  return (
    <Box
      position={'relative'}
      textAlign={'center'}
      zIndex={1}
      width={'100%'}
    >
      <Heading className="text-2xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto mt-2 relative z-1 py-2 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 via-white to-white">
        <Text className="text-xl md:text-3xl lg:text-4xl pb-2">{text}</Text>
        <Cover>{highlightedText}</Cover>
      </Heading>
      <ShinyText className="text-xl md:text-3xl lg:text-6xl pt-4" text={role} />
    </Box>
  );
};

export default CoverText;
