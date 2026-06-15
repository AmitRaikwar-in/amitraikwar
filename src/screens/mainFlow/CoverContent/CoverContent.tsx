import { CoverText, Orb } from '@components';
import { useTranslation } from 'react-i18next';
import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const CoverContent = () => {
  const { t } = useTranslation();

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - 100;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box
      minH={'100vh'}
      width={'100%'}
      position={'relative'}
      overflow={'hidden'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
    >
      <Box
        position={'absolute'}
        top={20}
        bottom={0}
        left={0}
        right={0}
        width={'100vw'}
        height={'80vh'}
        pointerEvents={'none'}
        zIndex={0}
      >
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
      </Box>
      <Box
        zIndex={1}
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        rowGap={8}
        px={4}
      >
        <CoverText
          text={t('coverText.greeting')}
          highlightedText={t('coverText.name')}
          role={t('coverText.role')}
        />
      </Box>

      {/* Animated scroll down indicator */}
      <Box
        position={'absolute'}
        bottom={8}
        display={'flex'}
        flexDir={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        cursor={'pointer'}
        opacity={0.7}
        zIndex={1}
        _hover={{ opacity: 1 }}
        transition={'opacity 0.2s'}
        onClick={() => handleScroll('projects')}
      >
        <Text
          fontSize={'xs'}
          fontWeight={'300'}
          letterSpacing={'widest'}
          mb={2}
          color="white"
        >
          SCROLL DOWN
        </Text>
        <Box width="24px" height="24px" color="white">
          <motion.div
            animate={{
              y: [0, 6, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default CoverContent;
