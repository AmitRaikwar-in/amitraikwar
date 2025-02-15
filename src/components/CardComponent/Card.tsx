import { useMotionValue } from 'framer-motion';
import { useState, useEffect, SVGProps } from 'react';
import { useMotionTemplate, motion } from 'framer-motion';
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
      }}
      {...rest}
    >
      <style>
        {`@keyframes spin {
        to {
        transform: rotate(360deg);
        }
        }`}
      </style>
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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [randomString, setRandomString] = useState('');

  useEffect(() => {
    const str = generateRandomString(1500);
    setRandomString(str);
  }, []);

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    const str = generateRandomString(1500);
    setRandomString(str);
  }

  return (
    <Box
      width={'full'}
      height={{ base: '36', md: '44', lg: '64' }}
      className={
        'p-0.5  bg-transparent aspect-square  flex items-center justify-center relative'
      }
    >
      <div
        onMouseMove={onMouseMove}
        className="group/card rounded-3xl w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full"
      >
        <CardPattern
          mouseX={mouseX}
          mouseY={mouseY}
          randomString={randomString}
        />
        <div className="relative z-0 flex items-center justify-center">
          <div className="absolute z=0 w-full h-full bg-black/[0.8] rounded-full blur-md" />
          <div className="relative h-28 w-28  rounded-full flex items-center justify-center text-white font-bold text-4xl">
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

function CardPattern({ mouseX, mouseY, randomString }: any) {
  const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none ">
      <div className="absolute inset-0 rounded-2xl  [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-blue-700 opacity-0  group-hover/card:opacity-100 backdrop-blur-xl transition duration-500"
        style={style}
      />
      <motion.div
        className="absolute inset-0 px-0 rounded-2xl opacity-0 mix-blend-overlay  group-hover/card:opacity-100"
        style={style}
      >
        <p className="absolute inset-[0] text-xs h-full break-words text-white font-mono font-bold transition duration-500">
          {randomString}
        </p>
      </motion.div>
    </div>
  );
}

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export const generateRandomString = (length: number) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
