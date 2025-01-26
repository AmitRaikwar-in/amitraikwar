import { HStack, Text } from '@chakra-ui/react';
import { ChipProps, Language } from './types';
import {
  ChakraUI,
  Express,
  I18next,
  Mysql,
  NodeJs,
  Python,
  React,
  Supabase,
  Tanstack,
  Typescript,
  Zustand,
} from '@assets/icons/Chips';

const ChipMap: Record<Language, { title: string; Icon: React.ReactNode }> = {
  [Language.python]: { title: 'Python', Icon: <Python /> },
  [Language.typescript]: { title: 'Typescript', Icon: <Typescript /> },
  [Language.chakra]: { title: 'Chakra UI', Icon: <ChakraUI /> },
  [Language.react]: { title: 'React', Icon: <React /> },
  [Language.node]: { title: 'NodeJs', Icon: <NodeJs /> },
  [Language.express]: { title: 'Express', Icon: <Express /> },
  [Language.mysql]: { title: 'MySql', Icon: <Mysql /> },
  [Language.i18n]: { title: 'I18next', Icon: <I18next /> },
  [Language.supabase]: { title: 'Supabase', Icon: <Supabase /> },
  [Language.tanstack]: { title: 'Tanstack', Icon: <Tanstack /> },
  [Language.zustand]: { title: 'Zustand', Icon: <Zustand /> },
  [Language.more]: { title: 'More...', Icon: <Python /> },
};

const Chip = ({ type, size = 'md' }: ChipProps) => {
  return (
    <HStack
      boxShadow={'0 0 4px 2px #FFFFFFA0'}
      spacing={size === 'md' ? 1 : 0.1}
      p={size === 'md' ? 1 : 0.3}
      px={size === 'md' ? 1 : 0.6}
      borderRadius="lg"
      border={`1px solid`}
      color="white"
    >
      <Text fontSize="sm">{ChipMap[type].title}</Text>
      {ChipMap[type].Icon}
    </HStack>
  );
};

export default Chip;
