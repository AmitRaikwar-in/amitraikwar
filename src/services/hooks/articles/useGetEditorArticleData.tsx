import { isEmpty } from 'lodash';
import { getEditorArticleData } from '../../backend';
import { useCallQuery } from '../common';

const useGetArticlesData = (articleKey: string) => {
  return useCallQuery({
    method: () =>
      !isEmpty(articleKey)
        ? getEditorArticleData(articleKey)
        : Promise.resolve(undefined),
    queryOptions: {
      queryKey: ['editor_article', articleKey],
      staleTime: 0,
      gcTime: 0,
    },
  });
};

export default useGetArticlesData;
