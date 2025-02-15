import { useToast } from '@chakra-ui/react';
import { updateArticle } from '../../backend';
import { useCallSBMutation } from '../common';

const useUpdateArticle = () => {
  const toast = useToast();
  return useCallSBMutation({
    method: (data) => updateArticle(data),
    mutationOptions: {
      onSuccess: () => {
        toast({
          title: 'Article updated.',
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

export default useUpdateArticle;
