import { Button, HStack, Text, VStack, Wrap } from '@chakra-ui/react';
import { ArticleCard, LoadingSpinner } from '@components';
import { useGetArticlesData } from '@services';
import { useLocation, useNavigate } from 'react-router-dom';
import { MarkdownViewer, StreakStalker } from './components';
import { useMemo, useState } from 'react';
import { groupBy, sortBy } from 'lodash';
import { BASE_NAV_ROUTE } from '@router';
import SortBy, { SortByType } from './components/SortBy';

const CategoryButton = ({
  category,
  setCategory,
  secondPath,
  isSelected,
}: {
  category: string;
  setCategory: (category: string) => void;
  secondPath: string;
  isSelected: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <Button
      w={'100%'}
      color={'white'}
      py={3}
      px={5}
      bg={isSelected ? 'gray.800' : ''}
      fontSize={20}
      variant={'ghost'}
      border={'1px solid gray'}
      _hover={{ bg: 'gray.600', cursor: 'pointer', color: 'violet' }}
      onClick={() => {
        if (secondPath) {
          navigate(BASE_NAV_ROUTE + 'articles');
        }
        setCategory(category);
      }}
    >
      {category}
    </Button>
  );
};

const ArticlesScreen = () => {
  const { data } = useGetArticlesData();
  const location = useLocation();
  const [category, setCategory] = useState('All');
  const secondPath = location.pathname.split('/')[3];
  const [sortByName, setSortBy] = useState<SortByType>('none');

  const articles = useMemo(
    () =>
      (data as any)?.data.rows.map((article: any) => {
        return article;
      }) ?? [],
    [data],
  );

  const filteredArticles = groupBy(articles, 'group_name');

  const articleToShow =
    category && category !== 'All' ? filteredArticles[category] : articles;

  const sortByApplied = useMemo(() => {
    if (sortByName === 'none') {
      return articleToShow;
    } else if (sortByName === 'publishedAt') {
      return sortBy(articleToShow, 'last_updated').reverse();
    } else if (sortByName === 'a-z') {
      return sortBy(articleToShow, 'title');
    } else if (sortByName === 'z-a') {
      return sortBy(articleToShow, 'title').reverse();
    } else {
      return articleToShow;
    }
  }, [articleToShow, sortByName]);

  if (!data) {
    return <LoadingSpinner />;
  }

  const date = articles.map((article: any) => article.last_updated as string);

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
          <HStack>
            <StreakStalker dates={date} />
            <SortBy sortBy={sortByName} setSortBy={setSortBy} />
          </HStack>
          <CategoryButton
            category={'All'}
            setCategory={setCategory}
            secondPath={secondPath}
            isSelected={'All' === category}
          />
          {Object.keys(filteredArticles).map(
            (group_name: any, index: number) => (
              <CategoryButton
                key={index}
                category={group_name}
                setCategory={setCategory}
                secondPath={secondPath}
                isSelected={group_name === category}
              />
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
              {sortByApplied?.map((article: any) => (
                <ArticleCard key={article.id} {...article} />
              ))}
            </Wrap>
          )}
          {secondPath && <MarkdownViewer articleKey={secondPath} />}
        </VStack>
      </HStack>
    </VStack>
  );
};

export default ArticlesScreen;
