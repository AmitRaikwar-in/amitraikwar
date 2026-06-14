import { HTMLAttributes } from 'react';

interface NoiseProps extends HTMLAttributes<HTMLDivElement> {
  type?: 'bg' | 'fg';
  opacity?: number;
  baseFrequency?: number;
}

const Noise = ({
  type = 'bg',
  opacity = 0.08,
  baseFrequency = 1.8,
  ...props
}: NoiseProps) => {
  const noiseSvg = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${baseFrequency}' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E`;

  return (
    <div
      className={`${type === 'bg' ? 'absolute inset-0 w-full h-full [mask-image:radial-gradient(#fff,transparent,75%)]' : 'w-[100%] h-[100%]'} transform z-0 pointer-events-none`}
      style={{
        backgroundImage: `url("${noiseSvg}")`,
        opacity: opacity,
        mixBlendMode: 'screen',
      }}
      {...props}
    />
  );
};

export default Noise;
