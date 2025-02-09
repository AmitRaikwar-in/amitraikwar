import { ArticleWithContent } from './types';

export const isValidArticle = (article: ArticleWithContent) => {
  return Boolean(
    article.article_key &&
      article.title &&
      article.description &&
      article.md_data &&
      article.author &&
      article.group_id &&
      article.group_name,
  );
};

export const getRequestObject = (article: ArticleWithContent) => {
  return {
    request: {
      article_key: article.article_key,
      image: article.image,
      title: article.title,
      description: article.description,
      md_data: article.md_data,
      author: {
        name: article.author,
      },
      group_id: article.group_id,
      group_name: article.group_name,
    },
  };
};
