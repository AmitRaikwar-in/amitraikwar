import { getArticlesData } from '../../backend';
import { useCallQuery } from '../common';

const useGetArticlesData = () => {
  return useCallQuery({
    method: () => getArticlesData(),
    queryOptions: {
      queryKey: ['article'],
    },
  });
};

export default useGetArticlesData;
