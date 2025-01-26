import { Heading, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { TextGenerateEffect } from '@components';

const AboutMe = () => {
  const { t } = useTranslation();

  return (
    <VStack minH={'100vh'} id="about" width={'99vw'} paddingX={32}>
      <Heading
        width={'100%'}
        textAlign={'start'}
        position={'sticky'}
        top={'10vh'}
      >
        {t('about.title')}
      </Heading>
      <TextGenerateEffect words={t('about.aboutMe')} className="mt-20" />
    </VStack>
  );
};

export default AboutMe;
