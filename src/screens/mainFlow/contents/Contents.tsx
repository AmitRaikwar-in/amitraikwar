import { Box } from '@chakra-ui/react';
import AboutMe from './AboutMe';
import Work from './Work';
import { Projects } from './projects';
import Contact from './Contact';
import Certificates from './Certificates';

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
      <Certificates />
      <Contact />
    </Box>
  );
};

export default Contents;
