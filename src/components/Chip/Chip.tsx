import { HStack, Text } from '@chakra-ui/react';
import { ChipProps, Skills } from './types';
import {
  ChakraUI,
  Css,
  Express,
  Git,
  Html,
  I18next,
  Jest,
  Mysql,
  NodeJs,
  Python,
  React,
  Supabase,
  Tanstack,
  Typescript,
  Zustand,
} from '@assets/icons/Chips';
import { SVGProps } from 'react';

export const ChipMap: Record<
  Skills,
  {
    title: string;
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  }
> = {
  [Skills.python]: {
    title: 'Python',
    Icon: (props: SVGProps<SVGSVGElement>) => <Python {...props} />,
  },
  [Skills.typescript]: {
    title: 'Typescript',
    Icon: (props: SVGProps<SVGSVGElement>) => <Typescript {...props} />,
  },
  [Skills.chakra]: {
    title: 'Chakra UI',
    Icon: (props: SVGProps<SVGSVGElement>) => <ChakraUI {...props} />,
  },
  [Skills.react]: {
    title: 'React',
    Icon: (props: SVGProps<SVGSVGElement>) => <React {...props} />,
  },
  [Skills.node]: {
    title: 'NodeJs',
    Icon: (props: SVGProps<SVGSVGElement>) => <NodeJs {...props} />,
  },
  [Skills.express]: {
    title: 'Express',
    Icon: (props: SVGProps<SVGSVGElement>) => <Express {...props} />,
  },
  [Skills.mysql]: {
    title: 'MySql',
    Icon: (props: SVGProps<SVGSVGElement>) => <Mysql {...props} />,
  },
  [Skills.i18n]: {
    title: 'I18next',
    Icon: (props: SVGProps<SVGSVGElement>) => <I18next {...props} />,
  },
  [Skills.supabase]: {
    title: 'Supabase',
    Icon: (props: SVGProps<SVGSVGElement>) => <Supabase {...props} />,
  },
  [Skills.tanstack]: {
    title: 'Tanstack',
    Icon: (props: SVGProps<SVGSVGElement>) => <Tanstack {...props} />,
  },
  [Skills.zustand]: {
    title: 'Zustand',
    Icon: (props: SVGProps<SVGSVGElement>) => <Zustand {...props} />,
  },
  [Skills.git]: {
    title: 'Git',
    Icon: (props: SVGProps<SVGSVGElement>) => <Git {...props} />,
  },
  [Skills.jest]: {
    title: 'Jest',
    Icon: (props: SVGProps<SVGSVGElement>) => <Jest {...props} />,
  },
  [Skills.html]: {
    title: 'HTML',
    Icon: (props: SVGProps<SVGSVGElement>) => <Html {...props} />,
  },
  [Skills.css]: {
    title: 'CSS',
    Icon: (props: SVGProps<SVGSVGElement>) => <Css {...props} />,
  },
  [Skills.more]: {
    title: 'More...',
    Icon: (_props: SVGProps<SVGSVGElement>) => <></>,
  },
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
      zIndex={0}
    >
      <Text fontSize="sm">{ChipMap[type].title}</Text>
      {ChipMap[type].Icon({})}
    </HStack>
  );
};

export default Chip;
