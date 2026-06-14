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
  Rust,
  Electron,
  Tauri,
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
  [Skills.rust]: {
    title: 'Rust',
    Icon: (props: SVGProps<SVGSVGElement>) => <Rust {...props} />,
  },
  [Skills.electron]: {
    title: 'Electron',
    Icon: (props: SVGProps<SVGSVGElement>) => <Electron {...props} />,
  },
  [Skills.tauri]: {
    title: 'Tauri',
    Icon: (props: SVGProps<SVGSVGElement>) => <Tauri {...props} />,
  },
  [Skills.more]: {
    title: 'More...',
    Icon: (_props: SVGProps<SVGSVGElement>) => <></>,
  },
};

const Chip = ({ type, size = 'md' }: ChipProps) => {
  const isMd = size === 'md';
  const isSm = size === 'sm';
  const { title, Icon } = ChipMap[type];

  return (
    <HStack
      spacing={isMd ? 2 : isSm ? 1.5 : 1}
      px={isMd ? 3 : isSm ? 2 : 1.5}
      py={isMd ? 1 : isSm ? 0.5 : 0.25}
      borderRadius="full"
      border="1px solid rgba(255, 255, 255, 0.08)"
      backgroundColor="rgba(255, 255, 255, 0.03)"
      backdropFilter="blur(8px)"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.15), inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)"
      color="gray.300"
      zIndex={0}
      cursor="default"
      transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        color: 'white',
        transform: 'translateY(-1px)',
        boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.25), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
      }}
    >
      {type !== Skills.more && (
        <Icon width={isMd ? 16 : isSm ? 12 : 9} height={isMd ? 16 : isSm ? 12 : 9} />
      )}
      <Text
        fontSize={isMd ? 'sm' : isSm ? 'xs' : '9px'}
        fontWeight="semibold"
        letterSpacing="0.02em"
      >
        {title}
      </Text>
    </HStack>
  );
};

export default Chip;
