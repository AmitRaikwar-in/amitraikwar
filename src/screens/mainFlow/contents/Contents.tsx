import { Box } from '@chakra-ui/react';
import AboutMe from './AboutMe';
import Work from './Work';
import { Projects } from './projects';
import Contact from './Contact';

const Contents = () => {
  return (
    <Box
      marginTop={10}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      width={'100%'}
      bg={'black'}
      color={'white'}
    >
      <Projects />
      <Work />
      <AboutMe />
      <Contact />
    </Box>
  );
};



export default Contents;
