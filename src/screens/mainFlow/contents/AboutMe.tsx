import { Box, Heading, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { ChipMap, FallingText, Marquee } from '@components';

const AboutMe = () => {
  const { t } = useTranslation();

  return (
    <VStack minH={'100vh'} id="about" width={'100%'}>
      <Heading
        width={'100%'}
        textAlign={'start'}
        position={'sticky'}
        top={'10vh'}
        zIndex={10}
        paddingX={{ base: 4, md: 8, lg: 20, xl: 32 }}
      >
        {t('about.title')}
      </Heading>
      <Box
        zIndex={0}
        height={{ base: 'auto', md: '45vh' }}
        width={'100%'}
        paddingX={{ base: 4, md: 8, lg: 20, xl: 32 }}
        marginTop={'10vh'}
      >
        <FallingText
          text={t('about.aboutMe')}
          trigger="click"
          highlightWords={['React', 'Native', 'growth']}
          gravity={1}
          fontSize="1.5rem"
        />
      </Box>
      <Box width={'100%'} overflowX={'clip'} marginY={'10vh'}>
        <Marquee pauseOnHover gap={10} duration={20}>
          {Object.values(ChipMap).map((v) =>
            v.Icon({
              width: 64,
              height: 64,
            }),
          )}
        </Marquee>
        <Marquee pauseOnHover gap={10} duration={20} reverse>
          {Object.values(ChipMap).map((v) =>
            v.Icon({
              width: 64,
              height: 64,
            }),
          )}
        </Marquee>
      </Box>
    </VStack>
  );
};

export default AboutMe;
