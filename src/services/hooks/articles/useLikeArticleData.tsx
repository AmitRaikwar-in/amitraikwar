import { useToast } from '@chakra-ui/react';
import { likePageArticleData } from '../../backend';
import { useCallSBMutation } from '../common';

const useLikeArticleData = () => {
  const toast = useToast();
  return useCallSBMutation({
    method: () => likePageArticleData(),
    mutationOptions: {
      onSuccess: () => {
        toast({
          title: 'Article Liked.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: 'Error.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      },
    },
  });
};

export default useLikeArticleData;
