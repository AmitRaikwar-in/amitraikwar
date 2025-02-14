import { useToast } from '@chakra-ui/react';
import { addComment } from '../../backend';
import { useCallSBMutation } from '../common';
import { useQueryClient } from '@tanstack/react-query';

const useAddComment = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useCallSBMutation({
    method: (data) => addComment(data),
    mutationOptions: {
      onSuccess: () => {
        toast({
          title: 'Comment added.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        queryClient.invalidateQueries({ queryKey: ['comments'] });
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

export default useAddComment;
