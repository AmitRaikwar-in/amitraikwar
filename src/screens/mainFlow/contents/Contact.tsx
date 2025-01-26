import { Box, Heading, HStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  return (
    <Box minH={'100vh'} width={'99vw'} id="contact" paddingX={32}>
      <Heading textAlign={'start'} position={'sticky'} top={'10vh'}>
        {t('contact.title')}
      </Heading>
      <HStack></HStack>
    </Box>
  );
};

export default Contact;
