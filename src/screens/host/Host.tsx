import { Box } from '@chakra-ui/react';
import { Footer, NavigationBar, SocialNavigation } from '@screens/common';
import { Outlet, useLocation } from 'react-router-dom';

const Host = () => {
  const { pathname } = useLocation();
  const isAddArticle = pathname.includes('add_article29');

  return (
    <Box width={'100vw'} height={'100%'}>
      {!isAddArticle && <NavigationBar />}
      {!isAddArticle && <SocialNavigation />}
      <Outlet />
      <Footer />
    </Box>
  );
};

export default Host;
