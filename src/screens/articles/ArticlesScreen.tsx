import { Button, HStack, Text, VStack, Wrap } from '@chakra-ui/react';
import { ArticleCard, LoadingSpinner } from '@components';
import { useGetArticlesData } from '@services';
import { useLocation, useNavigate } from 'react-router-dom';
import { MarkdownViewer } from './components';
import { useMemo, useState } from 'react';
import { groupBy } from 'lodash';

const ArticlesScreen = () => {
  const { data } = useGetArticlesData();
  const location = useLocation();
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const secondPath = location.pathname.split('/')[3];

  const articles = useMemo(
    () =>
      (data as any)?.data.rows.map((article: any) => {
        return article;
      }) ?? [],
    [data],
  );

  const filteredArticles = groupBy(articles, 'group_name');

  if (!data) {
    return <LoadingSpinner />;
  }

  return (
    <VStack bg={'black'} w={'100vw'} minH={'100vh'}>
      <Text
        color={'white'}
        fontSize={30}
        position={'fixed'}
        w={'100%'}
        textAlign={'center'}
        top={2}
        zIndex={2}
        padding={2}
        textShadow={'2px 2px 4px #000000'}
        borderBottom={'1px solid gray'}
        bg={'rgba(0, 0, 0, 0.5)'}
        backdropFilter={'blur(10px)'}
      >
        Articles
      </Text>
      <HStack
        w={'100%'}
        bg={'black'}
        minH={'100vh'}
        justifyContent={'flex-start'}
        alignItems={'flex-start'}
      >
        <VStack
          mx={2}
          width={'20%'}
          minH={'100vh'}
          position={'sticky'}
          top={'12vh'}
          marginTop={'12vh'}
        >
          {Object.keys(filteredArticles).map(
            (group_name: any, index: number) => (
              <Button
                w={'100%'}
                key={index}
                py={3}
                color={'white'}
                px={5}
                bg={group_name === category ? 'gray.800' : ''}
                fontSize={20}
                m={0}
                variant={'ghost'}
                border={'1px solid gray'}
                _hover={{ bg: 'gray.600', cursor: 'pointer', color: 'violet' }}
                onClick={() => {
                  if (secondPath) {
                    navigate(-1);
                  }
                  setCategory(group_name);
                }}
              >
                {group_name}
              </Button>
            ),
          )}
        </VStack>
        <VStack
          w={'80%'}
          id="projects"
          rowGap={20}
          bg={'black'}
          paddingTop={20}
          justifyContent={'flex-start'}
        >
          {!secondPath && (
            <Wrap
              width={'100%'}
              spacing="40px"
              justify="start"
              justifyContent={'space-between'}
            >
              {(category ? filteredArticles[category] : articles)?.map(
                (article: any) => <ArticleCard key={article.id} {...article} />,
              )}
            </Wrap>
          )}
          {secondPath && <MarkdownViewer articleKey={secondPath} />}
        </VStack>
      </HStack>
    </VStack>
  );
};

export default ArticlesScreen;
