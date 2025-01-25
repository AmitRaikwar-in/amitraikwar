import { Box } from '@chakra-ui/react';
import { NavigationBar } from '@screens/common';
import { Outlet } from 'react-router-dom';

const Host = () => {
  return (
    <Box width={'100vw'} height={'100%'}>
      <NavigationBar />
      <Outlet />
    </Box>
  );
};

export default Host;
