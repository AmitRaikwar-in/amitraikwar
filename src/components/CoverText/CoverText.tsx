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
    <Box position={'absolute'} left={32} top={'200px'}>
      <Heading className="text-2xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto  mt-6 relative z-1 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        <Text className="text-xl md:text-3xl lg:text-4xl pb-6">{text}</Text>
        <Cover>{highlightedText}</Cover>
      </Heading>
      <ShinyText className="text-xl md:text-3xl lg:text-6xl pt-2" text={role} />
    </Box>
  );
};

export default CoverText;
