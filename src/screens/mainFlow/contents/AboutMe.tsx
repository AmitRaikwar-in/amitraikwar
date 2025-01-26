import { Heading, VStack } from '@chakra-ui/react';
import { useCursor } from '@components';
import { useIsIntersecting } from '@hooks';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TextGenerateEffect } from '@components';

const AboutMe = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIsIntersecting(containerRef);
  const { setCursorType } = useCursor();

  useEffect(() => {
    if (isIntersecting) {
      setCursorType('splash');
    }
  }, [isIntersecting, setCursorType]);

  return (
    <VStack
      ref={containerRef}
      minH={'100vh'}
      id="about"
      width={'99vw'}
      paddingX={32}
    >
      <Heading
        width={'100%'}
        textAlign={'start'}
        position={'sticky'}
        top={'10vh'}
      >
        {t('about.title')}
      </Heading>
      <TextGenerateEffect words={t('about.aboutMe')} />
    </VStack>
  );
};

export default AboutMe;
