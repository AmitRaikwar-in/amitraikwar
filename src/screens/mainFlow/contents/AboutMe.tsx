import { Box, Heading, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { ChipMap, FallingText, Marquee } from '@components';

const AboutMe = () => {
  const { t } = useTranslation();

  return (
    <VStack id="about" width={'100%'}>
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
          fontSize="clamp(1rem, 2.5vw, 1.5rem)"
        />
      </Box>
      <Box
        width={'100%'}
        overflowX={'clip'}
        marginY={{ base: '6vh', md: '10vh' }}
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <Marquee pauseOnHover gap={{ base: 5, sm: 8, md: 10 }} duration={35}>
          {Object.entries(ChipMap).map(([key, v]) => (
            <Box
              as="span"
              key={key}
              w={{ base: '36px', sm: '48px', md: '64px' }}
              h={{ base: '36px', sm: '48px', md: '64px' }}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
            >
              {v.Icon({
                width: '100%',
                height: '100%',
              })}
            </Box>
          ))}
        </Marquee>
        <Marquee
          pauseOnHover
          gap={{ base: 5, sm: 8, md: 10 }}
          duration={35}
          reverse
        >
          {Object.entries(ChipMap).map(([key, v]) => (
            <Box
              as="span"
              key={key}
              w={{ base: '36px', sm: '48px', md: '64px' }}
              h={{ base: '36px', sm: '48px', md: '64px' }}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
            >
              {v.Icon({
                width: '100%',
                height: '100%',
              })}
            </Box>
          ))}
        </Marquee>
      </Box>
    </VStack>
  );
};

export default AboutMe;
