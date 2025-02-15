import React, { useRef, useEffect } from 'react';

interface Props {
  borderColor?: string;
  borderWidth?: string | number;
  trailLength?: number; // Adjust the length of the trail
  duration?: number;
  children?: React.ReactNode;
}

const TrailBorderBox: React.FC<Props> = ({
  borderWidth = 2,
  trailLength = 20, // Default trail length
  duration = 2,
  children,
}) => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boxRef.current) {
      const box = boxRef.current;
      const width = box.offsetWidth;
      const height = box.offsetHeight;

      const animateTrail = () => {
        let currentPosition = 0;
        let isHorizontal = true; // Start with horizontal movement

        const animateSegment = () => {
          const segmentLength = isHorizontal ? width : height;
          const endPosition = currentPosition + segmentLength;

          const trail = document.createElement('div');
          trail.style.position = 'absolute';
          trail.style.zIndex = '1'; // Ensure trail is above content but below border

          if (isHorizontal) {
            trail.style.top = '0px';
            trail.style.left = `${currentPosition}px`;
            trail.style.width = `${trailLength}px`;
            trail.style.height = `${borderWidth}px`;
          } else {
            trail.style.left = `${borderWidth}px`;
            trail.style.top = `${currentPosition}px`;
            trail.style.width = `${borderWidth}px`;
            trail.style.height = `${trailLength}px`;
          }

          box.appendChild(trail);

          const animation = trail.animate(
            isHorizontal
              ? [{ left: `${currentPosition}px` }, { left: `${endPosition}px` }]
              : [{ top: `${currentPosition}px` }, { top: `${endPosition}px` }],
            {
              duration:
                duration * 1000 * (segmentLength / (width * 2 + height * 2)), // Adjust duration based on segment length and total perimeter
              easing: 'linear',
              fill: 'forwards',
            },
          );

          animation.onfinish = () => {
            trail.remove(); // Remove trail segment after animation
            currentPosition = endPosition;
            if (currentPosition >= (isHorizontal ? width : height)) {
              currentPosition = 0;
              isHorizontal = !isHorizontal; // Switch direction
            }
            animateSegment(); // Continue animation
          };
        };

        animateSegment(); // Start the first segment
      };

      animateTrail(); // Start the animation loop
    }
  }, [borderWidth, duration, trailLength]); // Re-run effect if props change

  return (
    <div
      ref={boxRef}
      style={{
        border: `${borderWidth}px solid 'black'`,
        borderRadius: '8px',
        position: 'relative', // Needed for absolute positioning of trails
        overflow: 'hidden', // Hide trails that go outside the box during animation
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  );
};

export default TrailBorderBox;
