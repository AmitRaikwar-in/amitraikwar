import { getArticlesData } from '../../backend';
import { useCallSBMutation } from '../common';

const useLikeArticleData = () => {
  return useCallSBMutation({
    method: () => getArticlesData(),
  });
};

export default useLikeArticleData;
