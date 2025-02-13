import { getArticleData } from '../../backend';
import { useCallQuery } from '../common';

const useGetArticlesData = (articleKey: string) => {
  return useCallQuery({
    method: () => getArticleData(articleKey),
    queryOptions: {
      queryKey: ['article', articleKey],
    },
  });
};

export default useGetArticlesData;
