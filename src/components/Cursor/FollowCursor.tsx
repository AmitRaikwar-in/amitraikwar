import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useCursor } from './CursorProvider';
import GlassBox from '../GlassBox/GlassBox';

const SPRING_FAST = { damping: 40, stiffness: 1000, mass: 0.1 };
const SPRING_SLOW = { damping: 35, stiffness: 600, mass: 0.3 };

const FollowCursor = () => {
  const { insets } = useCursor();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkVisibility = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 992; // 992px is Chakra's lg breakpoint
      setIsVisible(!isTouch && !isSmallScreen);
    };

    checkVisibility();
    window.addEventListener('resize', checkVisibility, { passive: true });
    return () => window.removeEventListener('resize', checkVisibility);
  }, []);

  // Target positions (centered on the mouse pointer)
  const dotTargetX = useMotionValue(window.innerWidth / 2);
  const dotTargetY = useMotionValue(window.innerHeight / 2);
  const ringTargetX = useMotionValue(window.innerWidth / 2);
  const ringTargetY = useMotionValue(window.innerHeight / 2);

  // Springs
  const dotX = useSpring(dotTargetX, SPRING_FAST);
  const dotY = useSpring(dotTargetY, SPRING_FAST);
  const ringX = useSpring(ringTargetX, SPRING_SLOW);
  const ringY = useSpring(ringTargetY, SPRING_SLOW);

  const hasInsets = !!insets;
  const isHovering = hasInsets && insets.width > 0 && insets.height > 0;
  const shouldHide = hasInsets && (insets.width === 0 || insets.height === 0);

  useEffect(() => {
    let mouseTimeout: ReturnType<typeof setTimeout> | null = null;

    const enableIframePointerEvents = () => {
      document.body.classList.remove('disable-iframe-pointer-events');
    };

    const disableIframePointerEvents = () => {
      document.body.classList.add('disable-iframe-pointer-events');
      if (mouseTimeout) clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(enableIframePointerEvents, 150);
    };

    const handleMouseMove = (e: MouseEvent) => {
      dotTargetX.set(e.clientX);
      dotTargetY.set(e.clientY);
      ringTargetX.set(e.clientX);
      ringTargetY.set(e.clientY);

      disableIframePointerEvents();
    };

    const handleMouseDown = () => {
      enableIframePointerEvents();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      if (mouseTimeout) clearTimeout(mouseTimeout);
      enableIframePointerEvents();
    };
  }, [dotTargetX, dotTargetY, ringTargetX, ringTargetY]);

  const ringSize = shouldHide ? 0 : isHovering ? 48 : 36;
  const ringWidth = ringSize;
  const ringHeight = ringSize;
  const ringBorderRadius = '50%';

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Inner solid pointing dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          mixBlendMode: 'difference',
          zIndex: 2147483647,
          pointerEvents: 'none',
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isHovering || shouldHide ? 0 : 1,
          scale: isHovering || shouldHide ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer morphing glass lens container */}
      <motion.div
        animate={{
          width: ringWidth,
          height: ringHeight,
          borderRadius: ringBorderRadius,
          opacity: shouldHide ? 0 : 1,
          scale: shouldHide ? 0.5 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 160,
          mass: 0.7,
        }}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 2147483646,
          pointerEvents: 'none',
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <GlassBox
          width="100%"
          height="100%"
          borderRadius={isHovering ? 24 : 18}
          borderWidth={isHovering ? 0.12 : 0.15}
          blur={isHovering ? 5 : 3}
          displace={isHovering ? 1.2 : 0.8}
          backgroundOpacity={isHovering ? 0.02 : 0.01}
          saturation={isHovering ? 1.8 : 1.4}
          distortionScale={isHovering ? 24 : 16}
          brightness={100}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
          }}
        />
      </motion.div>
    </>
  );
};

export default FollowCursor;
