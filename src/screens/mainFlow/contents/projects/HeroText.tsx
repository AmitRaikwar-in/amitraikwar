import { Box, Text } from '@chakra-ui/react';
import { motion, MotionValue } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const HeroText = ({ opacity }: { opacity: MotionValue<number> }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      style={{
        opacity,
        zIndex: 1,
        position: 'sticky',
        top: '8vh',
        overflowX: 'hidden',
        fontSize: '5xl',
      }}
    >
      <Text
        className=" text-white font-bold inter-var text-center"
        fontSize={{ base: '2xl', md: '3xl', lg: '5xl' }}
      >
        {t('about.quoteHeading')}
      </Text>
      <Text
        className="text-base md:text-lg text-white font-normal inter-var text-center"
        marginTop={{ base: 2 }}
      >
        {t('about.quoteSubheading')}
      </Text>
    </motion.div>
  );
};

export default HeroText;
