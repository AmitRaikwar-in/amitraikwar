import { Box, Heading } from '@chakra-ui/react';
import { Timeline } from '@components';
import { useTranslation } from 'react-i18next';

const Work = () => {
  const { t } = useTranslation();
  return (
    <Box zIndex={0} height={'200vh'} width={'99vw'} id="work" paddingX={32}>
      <Heading position={'sticky'} top={'10vh'}>
        {t('work.title')}
      </Heading>
      <Timeline
        data={[
          {
            title: '2025',
            content: <></>,
          },
          {
            title: '2024',
            content: <></>,
          },
          {
            title: '2023',
            content: <></>,
          },
          {
            title: '2022',
            content: <></>,
          },
          {
            title: '2021',
            content: <></>,
          },
        ]}
      />
    </Box>
  );
};

export default Work;
