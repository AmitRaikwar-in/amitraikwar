import { useToast } from '@chakra-ui/react';
import { likePageArticleData } from '../../backend';
import { useCallSBMutation } from '../common';
import { useQueryClient } from '@tanstack/react-query';

const useLikeArticleData = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useCallSBMutation({
    method: (articleKey) => likePageArticleData(articleKey),
    mutationOptions: {
      onSuccess: (_data, variable: any) => {
        toast({
          title: 'Article Liked.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        queryClient.invalidateQueries({
          queryKey: ['article', variable.articleKey],
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
