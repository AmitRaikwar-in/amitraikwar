import { Box } from '@chakra-ui/react';
import { Footer, NavigationBar } from '@screens/common';
import { Outlet } from 'react-router-dom';

const Host = () => {
  return (
    <Box width={'100vw'} height={'100%'}>
      <NavigationBar />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default Host;
