import { Box, Text } from '@chakra-ui/react';
import { HoverBorderGradient } from '@components';
import { BASE_URL_ROUTE } from '@router';
import { Link } from 'react-router-dom';

const FooterEndText = () => (
  <Text fontSize={{ base: 'xs', sm: 'sm', md: 'md' }}>
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
      height={{ base: 'auto', md: '10vh' }}
      py={{ base: 4, md: 0 }}
      color={'white'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <HoverBorderGradient>
        <FooterEndText />
      </HoverBorderGradient>
    </Box>
  );
};

export default Footer;
