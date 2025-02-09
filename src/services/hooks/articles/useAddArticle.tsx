import { useToast } from '@chakra-ui/react';
import { addArticle } from '../../backend';
import { useCallSBMutation } from '../common';

const useAddArticle = () => {
  const toast = useToast();
  return useCallSBMutation({
    method: (data) => addArticle(data),
    mutationOptions: {
      onSuccess: () => {
        toast({
          title: 'Article added.',
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

export default useAddArticle;
