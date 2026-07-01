import React, { useState, useMemo, type ReactNode } from 'react';

interface BorderGlowProps {
  children?: ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  fillOpacity?: number;
  style?: React.CSSProperties;
}

const BorderGlow: React.FC<BorderGlowProps> = ({
  children,
  className = '',
  backgroundColor = '#120F17',
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1.0,
  animated = false,
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
  style = {},
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const gradientColors =
    colors.length > 0 ? colors : ['#c084fc', '#f472b6', '#38bdf8'];
  const conicColors = [...gradientColors, gradientColors[0]].join(', ');

  const glowBg = useMemo(() => {
    if (gradientColors.length === 1) return gradientColors[0];
    return `linear-gradient(135deg, ${gradientColors.join(', ')})`;
  }, [gradientColors]);

  const innerRadius = Math.max(borderRadius - 1, 0);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative grid isolate ${className}`}
      style={{ borderRadius: `${borderRadius}px` }}
    >
      {/* Outer Glow */}
      <div
        className="absolute pointer-events-none transition-opacity duration-500 -z-10"
        style={{
          inset: `-${glowRadius / 2}px`,
          background: glowBg,
          filter: `blur(${glowRadius}px)`,
          opacity: isHovered ? 0.35 * glowIntensity : 0,
          borderRadius: `${borderRadius + glowRadius / 2}px`,
          mixBlendMode: 'plus-lighter',
        }}
      />

      {/* 1px Gradient Border — spinning conic-gradient fills the outer layer */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius: `${borderRadius}px` }}
      >
        <div
          className="absolute"
          style={{
            inset: '-150%',
            background: `conic-gradient(from 0deg, ${conicColors})`,
            animation:
              animated || isHovered ? 'spin-border 6s linear infinite' : 'none',
            opacity: isHovered ? 1 : 0.4,
            transition: 'opacity 0.3s ease',
            willChange: 'transform, opacity',
          }}
        />
      </div>

      {/* Card Body — sits 1px inside the gradient, covers the centre.
          style prop goes here so backdropFilter/background apply on the inner layer. */}
      <div
        className="absolute"
        style={{
          inset: '1px',
          background: backgroundColor,
          borderRadius: `${innerRadius}px`,
          ...style,
        }}
      />

      {/* Card Contents */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};

export default BorderGlow;
