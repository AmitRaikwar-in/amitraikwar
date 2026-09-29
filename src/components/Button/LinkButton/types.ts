import { BoxProps } from '@chakra-ui/react';

export type LinkButtonProps = {
  text: string;
  withUnderline?: boolean;
  withArrow?: boolean;
  href?: string;
  fontSize?: BoxProps['fontSize'];
  px?: BoxProps['px'];
  minW?: BoxProps['minW'];
  onClick?: (target: string) => void;
};
