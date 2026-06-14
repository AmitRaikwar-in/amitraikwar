import { CoverText, Orb } from '@components';
import { useTranslation } from 'react-i18next';
import { Box } from '@chakra-ui/react';

const CoverContent = () => {
  const { t } = useTranslation();

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
      <CoverText
        text={t('coverText.greeting')}
        highlightedText={t('coverText.name')}
        role={t('coverText.role')}
      />
    </Box>
  );
};

export default CoverContent;
