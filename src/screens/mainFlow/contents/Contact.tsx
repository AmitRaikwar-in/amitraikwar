import { Box, Heading, HStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { DotPattern } from '@components';

const Contact = () => {
  const { t } = useTranslation();
  return (
    <Box minH={'100vh'} width={'99vw'} id="contact">
      <Heading
        textAlign={'start'}
        position={'sticky'}
        top={'10vh'}
        paddingX={32}
      >
        {t('contact.title')}
      </Heading>
      <HStack top={'10vh'} position={'sticky'} zIndex={10}>
        <DotPattern
          className={
            '[mask-image:radial-gradient(350px_circle_at_center,white,transparent)] h-[90vh]'
          }
        />
      </HStack>
    </Box>
  );
};

export default Contact;
