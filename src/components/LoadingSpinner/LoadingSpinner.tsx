import { Box, CircularProgress, Text } from '@chakra-ui/react';

const LoadingScreen = () => {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#000000',
        rowGap: '1rem',
      }}
    >
      <CircularProgress isIndeterminate color="violet" />
      <Text color="white" fontSize="lg" fontWeight="bold" textAlign="center">
        Loading...
      </Text>
    </Box>
  );
};

export default LoadingScreen;
