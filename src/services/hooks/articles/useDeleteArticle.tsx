import { useToast } from '@chakra-ui/react';
import { deleteArticle } from '../../backend';
import { useCallSBMutation } from '../common';
import { useQueryClient } from '@tanstack/react-query';

const useDeleteArticle = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useCallSBMutation({
    method: (data) => deleteArticle(data),
    mutationOptions: {
      onSuccess: (_data, variables: any) => {
        toast({
          title: 'Article removed.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        queryClient.invalidateQueries({
          queryKey: ['comments', variables.articleKey],
        });
      },
      onError: (error) => {
        toast({
          title: 'Error.' + error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      },
    },
  });
};

export default useDeleteArticle;
