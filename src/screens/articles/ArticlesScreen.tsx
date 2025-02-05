import { VStack } from '@chakra-ui/react';
import { useGetArticlesData } from '@services';

const ArticlesScreen = () => {
  const { data } = useGetArticlesData();
  console.log(data);

  return (
    <VStack
      minH={'100vh'}
      id="projects"
      rowGap={20}
      bg={'black'}
      paddingTop={20}
    ></VStack>
  );
};

export default ArticlesScreen;
