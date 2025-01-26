import { useMotionValue, useSpring, frame } from 'framer-motion';
import { RefObject, useEffect } from 'react';
import { SPRING_SETTING } from './constants';

const useSpringMousePosition = (ref: RefObject<HTMLDivElement | null>) => {
  const xPos = window.innerWidth / 2;
  const yPos = window.innerHeight / 2;
  const xPoint = useMotionValue(xPos);
  const yPoint = useMotionValue(yPos);
  const x = useSpring(xPoint, SPRING_SETTING);
  const y = useSpring(yPoint, SPRING_SETTING);

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      const element = ref.current!;

      frame.read(() => {
        xPoint.jump(clientX - element.offsetLeft - 32 / 2);
        yPoint.jump(clientY - element.offsetTop - 32 / 2);
      });
    };

    window.addEventListener('pointermove', handlePointerMove);

    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [ref, xPoint, yPoint]);

  return { x, y };
};

export default useSpringMousePosition;
