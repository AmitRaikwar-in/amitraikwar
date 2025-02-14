import { getComments } from '../../backend';
import { useCallQuery } from '../common';

const useGetComments = (articleKey: string) => {
  return useCallQuery({
    method: () => getComments(articleKey),
    queryOptions: {
      queryKey: ['comments', articleKey],
    },
  });
};

export default useGetComments;
