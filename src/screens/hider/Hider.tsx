import { Box, Text } from '@chakra-ui/react';
import { TitleBoxContainer } from '@components';

const Hider = () => {
  return (
    <TitleBoxContainer title={'Wrong turn 🚧'} bg={'black'}>
      <Box
        width={'100vw'}
        height={'100vh'}
        bg={'black'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Text color={'white'} textAlign={'center'} fontSize={'2xl'}>
          You cannot 🚫access this website until you know me personally 😝.
          <br />
          This is temporary🚧, It will be resolved soon⏳.
        </Text>
      </Box>
    </TitleBoxContainer>
  );
};

export default Hider;
