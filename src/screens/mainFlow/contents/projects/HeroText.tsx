import { Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const HeroText = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      style={{
        zIndex: 1,
        overflowX: 'hidden',
        fontSize: '5xl',
        textShadow: '0 0 1rem #000',
        width: '100%',
      }}
    >
      <Text
        className=" text-white font-bold inter-var text-center"
        fontSize={{ base: '2xl', md: '3xl', lg: '5xl' }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        {t('about.quoteHeading')}
      </Text>
      <Text
        className="text-base md:text-lg text-white font-normal inter-var text-center"
        style={{ position: 'relative', zIndex: 2 }}
      >
        {t('about.quoteSubheading')}
      </Text>
    </motion.div>
  );
};

export default HeroText;
