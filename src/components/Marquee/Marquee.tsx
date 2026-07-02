import { Box } from '@chakra-ui/react';
import { MarqueeProps } from './types';
import { useState } from 'react';

const Marquee = ({
  reverse = false,
  pauseOnHover = true,
  vertical = false,
  repeat = 4,
  duration = 10,
  children,
  gap = 4,
}: MarqueeProps) => {
  const [isHovering, setHovering] = useState(false);
  const hoverProps = pauseOnHover
    ? {
        onMouseEnter: () => setHovering(true),
        onMouseLeave: () => setHovering(false),
      }
    : {};
  return (
    <Box
      style={{
        display: 'flex',
        overflow: 'hidden',
        padding: '0.5rem', // Assuming p-2 translates to 0.5rem padding
        flexDirection: vertical ? 'column' : 'row',
      }}
      gap={gap}
      paddingX={gap}
      {...hoverProps}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <Box
            key={i}
            gap={gap}
            display={'flex'}
            flexShrink={0}
            justifyContent={'space-around'}
            animation={
              (vertical
                ? `marquee-vertical ${duration}s linear infinite`
                : `marquee ${duration}s linear infinite`) +
              (isHovering ? ' paused ' : ' running ') +
              (reverse ? 'reverse' : 'normal')
            }
          >
            {children}
          </Box>
        ))}
    </Box>
  );
};

export default Marquee;
