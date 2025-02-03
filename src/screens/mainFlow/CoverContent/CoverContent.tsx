import { useState } from 'react';
import { CoverText, Lights, MeteorsEffect } from '@components';
import { CharacterType, RobotScene1, RobotScene2 } from '../scene';
import { SocialNavigation } from '../components';
import { useTranslation } from 'react-i18next';
import { Box } from '@chakra-ui/react';

const MusicMap: Record<CharacterType, string> = {
  [CharacterType.ADAM]: '/music/dream.mp3',
  [CharacterType.LIEUTENANT]: '/music/horror.mp3',
  [CharacterType.COPERNICUS]: '/music/bg1.mp3',
  [CharacterType.REAP]: '/music/electro.mp3',
};

const CoverContent = () => {
  const { t } = useTranslation();
  const [characterType, setCharacterType] = useState<CharacterType>(
    CharacterType.REAP,
  );

  return (
    <Box minH={'100vh'}>
      <MeteorsEffect number={30} />
      {characterType === CharacterType.REAP ? (
        <RobotScene2 />
      ) : (
        <RobotScene1 type={characterType} />
      )}
      <CoverText
        text={t('coverText.greeting')}
        highlightedText={t('coverText.name')}
        role={t('coverText.role')}
      />
      <Lights />
      <SocialNavigation
        audioSource={MusicMap[characterType]}
        handleCharacterClick={(type) => {
          setCharacterType(type);
        }}
      />
    </Box>
  );
};

export default CoverContent;
