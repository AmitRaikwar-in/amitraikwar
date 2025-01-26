import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useSpringMousePosition } from '../../hooks';
import { useCursor } from './CursorProvider';

const FollowCursor = () => {
  const { insets } = useCursor();
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = useSpringMousePosition(ref);

  const { width, height, top, left, borderRadius } = insets ?? {
    width: 32,
    height: 32,
    top: 0,
    left: 0,
    borderRadius: '5px',
  };
  const props = {
    boxShadow: '0 0 50px 10px violet',
    width: width,
    height: height,
    transition: !insets ? 'all 0.0s ease' : 'all 0.5s ease',
    borderRadius: insets ? borderRadius ?? '5px' : '50%',
  };

  useEffect(() => {
    // Initial position
    ref.current!.style.transform = `translate(${x}px, ${y}px)`;
  }, [x, y, insets]);

  return (
    <motion.div
      className="cursor"
      ref={ref}
      style={{
        x: top === 0 ? x : left,
        y: top === 0 ? y : top,
        backgroundColor: '#FFFFFFC5',
        mixBlendMode: 'difference',
        zIndex: 1,
        position: 'fixed',
        pointerEvents: 'none',
        ...props,
      }}
    />
  );
};

export default FollowCursor;
