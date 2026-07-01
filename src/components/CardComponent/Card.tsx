import { useCallback, SVGProps } from 'react';
import { Box } from '@chakra-ui/react';

export const Icon = ({
  className,
  isHovered,
  ...rest
}: SVGProps<SVGSVGElement> & { isHovered: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      style={{
        transition: 'all 3s ease',
        animation: isHovered ? 'spin 3s linear infinite' : 'none',
        willChange: 'transform',
      }}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

export const CardBasic = ({
  text,
  icon,
}: {
  text?: string;
  icon?: React.ReactNode;
}) => {
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  return (
    <Box
      width={'full'}
      height={{ base: '20', md: '24', lg: '32' }}
      className={
        'p-0.5  bg-transparent aspect-square  flex items-center justify-center relative'
      }
    >
      <div
        onMouseMove={onMouseMove}
        className="group/card rounded-3xl w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full"
      >
        <CardPattern />
        <div className="relative z-0 flex items-center justify-center">
          <div className="absolute z=0 w-full h-full bg-black/[0.8] rounded-full blur-md" />
          <div className="relative h-20 w-20  rounded-full flex items-center justify-center text-white font-bold text-4xl">
            {icon ? (
              icon
            ) : (
              <span className="dark:text-white text-black z-20 text-center w-[200%]">
                {text}
              </span>
            )}
          </div>
        </div>
      </div>
    </Box>
  );
};

function CardPattern() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-blue-700 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
        style={{
          maskImage:
            'radial-gradient(150px at var(--mouse-x, -999px) var(--mouse-y, -999px), white, transparent)',
          WebkitMaskImage:
            'radial-gradient(150px at var(--mouse-x, -999px) var(--mouse-y, -999px), white, transparent)',
        }}
      />
    </div>
  );
}
