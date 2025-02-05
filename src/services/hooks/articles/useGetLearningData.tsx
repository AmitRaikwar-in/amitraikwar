import { getArticlesData } from '../../backend';
import { useCallQuery } from '../common';

const useGetArticlesData = () => {
  return useCallQuery({
    method: () => {
      return getArticlesData();
    },
    queryOptions: {
      queryKey: ['articles'],
    },
  });
};

export default useGetArticlesData;
