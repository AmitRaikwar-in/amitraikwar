import { VStack, Wrap } from '@chakra-ui/react';
import { ArticleCard, LoadingSpinner } from '@components';
import { useGetArticlesData } from '@services';

const ArticlesScreen = () => {
  const { data } = useGetArticlesData();
  console.log(data);

  if (!data) {
    return <LoadingSpinner />;
  }

  return (
    <VStack
      minH={'100vh'}
      id="projects"
      rowGap={20}
      bg={'black'}
      px={'10'}
      paddingTop={20}
    >
      <Wrap spacing="30px" justify="center">
        {(data as any).data.rows.map((article: any) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </Wrap>
    </VStack>
  );
};

export default ArticlesScreen;
