import { RefreshIcon } from '@assets';
import { HStack, IconButton, Box, Text } from '@chakra-ui/react';
import { usePingTest } from '@services';

const PingTest = () => {
  const { isPending, isError, refetch, isRefetching } = usePingTest();

  console.log(isError, isPending);

  return (
    <HStack border={'1px solid gray'} p={2}>
      <IconButton
        size={'sm'}
        aria-label={''}
        icon={<RefreshIcon />}
        isDisabled={isPending || isRefetching}
        isLoading={isPending || isRefetching}
        onClick={() => {
          refetch();
        }}
      />
      <Text color={'white'} fontSize={'lg'}>
        Server :{' '}
        {isPending || isError || isRefetching ? (
          <Box
            as="span"
            w={3}
            h={3}
            borderRadius="50%"
            bg={'red.500'}
            display="inline-block"
          />
        ) : (
          <Box
            as="span"
            w={3}
            h={3}
            borderRadius="50%"
            bg={'green.500'}
            display="inline-block"
          />
        )}
      </Text>
    </HStack>
  );
};

export default PingTest;
