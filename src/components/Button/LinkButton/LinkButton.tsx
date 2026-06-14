import { Button, Text } from '@chakra-ui/react';
import { LinkButtonProps } from './types';
import { ArrowIcon } from '@assets';
import { useCursor } from '../../Cursor';
import { useRef } from 'react';

const LinkButton = ({
  text,
  href,
  animationOnHover,
  withUnderline,
  withArrow,
  fontSize,
  onClick,
}: LinkButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { setCursorInsets } = useCursor();

  const onMouseEnter = () => {
    const { width, height, top, left } =
      ref.current?.getBoundingClientRect() || {
        width: 56,
        height: 56,
        top: 0,
        left: 0,
      };
    setCursorInsets(undefined);
    setTimeout(() => {
      setCursorInsets({ height, width, top, left, borderRadius: '5px' });
    }, 0);
  };

  const onMouseLeave = () => {
    setCursorInsets(undefined);
  };

  return (
    <Button
      ref={ref}
      flexDir={'column'}
      bg={'transparent'}
      color={'white'}
      colorScheme="violet"
      fontSize={fontSize}
      fontWeight={'300'}
      borderRadius={0}
      overflow={'clip'}
      px={2}
      maxHeight={'7'}
      _hover={{ color: 'violet' }}
      borderBottom={withUnderline ? '1px solid white' : 'none'}
      rightIcon={withArrow ? <ArrowIcon /> : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => onClick?.(href)}
      justifyItems={'end'}
      rowGap={2}
      {...(!onClick ? { as: 'a', href } : {})}
    >
      <Text pointerEvents={'none'}>{text}</Text>
    </Button>
  );
};

export default LinkButton;
