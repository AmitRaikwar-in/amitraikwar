import { Box, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const Work = () => {
  const { t } = useTranslation();
  return (
    <Box
      zIndex={0}
      height={'100vh'}
      width={'99vw'}
      id="work"
      paddingX={32}
      paddingY={24}
    >
      <Heading>{t('work.title')}</Heading>
    </Box>
  );
};

export default Work;
