import { TitleBoxContainer } from '@components';
import { Contents } from './contents';
import { CoverContent } from './CoverContent';

const MainScreen = () => {
  return (
    <TitleBoxContainer
      title={'Amit Raikwar | Portfolio'}
      bg={'black'}
      width={'100%'}
      display={'flex'}
      flexDir={'column'}
      alignItems={'center'}
    >
      <CoverContent />
      <Contents />
    </TitleBoxContainer>
  );
};

export default MainScreen;
