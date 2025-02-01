import { Box, Text } from '@chakra-ui/react';
import { HoverBorderGradient } from '@components';
import { BASE_URL_ROUTE } from '@router';
import { Link } from 'react-router-dom';

const FooterEndText = () => (
  <Text fontSize={'md'}>
    © {new Date().getFullYear()}{' '}
    <Link to={BASE_URL_ROUTE} color="violet">
      Amit Raikwar
    </Link>{' '}
    | All rights reserved
  </Text>
);

const Footer = () => {
  return (
    <Box
      flexDirection={'column'}
      width={'100%'}
      overflowX={'hidden'}
      bg={'black'}
      height={'10vh'}
      color={'white'}
      display={'flex'}
      justifyContent={'center'}
    >
      <HoverBorderGradient>
        <FooterEndText />
      </HoverBorderGradient>
    </Box>
  );
};

export default Footer;
