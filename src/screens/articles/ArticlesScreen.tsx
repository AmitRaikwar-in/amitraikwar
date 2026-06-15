import {
  Box,
  HStack,
  Text,
  VStack,
  Wrap,
  Stack,
  SimpleGrid,
} from '@chakra-ui/react';
import {
  ArticleCard,
  WebsiteLoader,
  GlassBox,
  useCursor,
  Noise,
} from '@components';
import { useGetArticlesData } from '@services';
import { useLocation, useNavigate } from 'react-router-dom';
import { MarkdownViewer, StreakStalker } from './components';
import { useMemo, useState, useEffect } from 'react';
import { groupBy, sortBy } from 'lodash';
import { BASE_NAV_ROUTE } from '@router';
import SortBy, { SortByType } from './components/SortBy';
import SearchFeature from './components/SearchFeature';

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
    <Text
      w={{ base: 'auto', md: '100%' }}
      textAlign="center"
      color={'white'}
      py={{ base: 1, md: 1 }}
      px={{ base: 3, md: 5 }}
      bg={isSelected ? 'gray.800' : ''}
      fontSize={{ base: 'sm', md: 'md' }}
      borderRadius={{ base: 'full', md: 'none' }}
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
    </Text>
  );
};

const ArticlesScreen = () => {
  const { data } = useGetArticlesData();
  const location = useLocation();
  const navigate = useNavigate();
  const { setCursorType } = useCursor();
  const [category, setCategory] = useState('All');
  const secondPath = location.pathname.split('/')[2];
  const [sortByName, setSortBy] = useState<SortByType>('none');

  useEffect(() => {
    setCursorType('follow');
  }, [setCursorType]);

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
    return <WebsiteLoader />;
  }

  const date = articles.map((article: any) => article.last_updated as string);

  return (
    <VStack
      bg={'black'}
      w={'100%'}
      minH={'100vh'}
      paddingX={{ base: 1, md: 6 }}
      position="relative"
    >
      <Noise type="bg" opacity={0.26} baseFrequency={7.5} />
      <Box
        position={'fixed'}
        top={{ base: 3, md: 5 }}
        zIndex={10}
        left="50%"
        transform="translateX(-50%)"
        border={'1px solid rgba(255, 255, 255, 0.1)'}
        boxShadow={'0 8px 32px 0 rgba(0, 0, 0, 0.6)'}
        borderRadius="20px"
        overflow="hidden"
        px={6}
        py={2}
        cursor="pointer"
        onClick={() => {
          navigate(BASE_NAV_ROUTE + 'articles');
        }}
        _hover={{
          transform: 'translateX(-50%) scale(1.05)',
        }}
        transition="all 0.3s"
      >
        <GlassBox
          width="100%"
          height="100%"
          borderRadius={20}
          borderWidth={0.15}
          blur={2}
          displace={1}
          distortionScale={40}
          yChannel="B"
          backgroundOpacity={0.005}
          saturation={1}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: -1,
            pointerEvents: 'none',
          }}
        />
        <Text
          color={'white'}
          fontSize={{ base: 'lg', md: 'xl' }}
          fontWeight="bold"
          textAlign="center"
          letterSpacing="wide"
        >
          Articles
        </Text>
      </Box>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        w={'100%'}
        bg={'black'}
        minH={'100vh'}
        justifyContent={'flex-start'}
        alignItems={'flex-start'}
      >
        <VStack
          mx={{ base: 0, md: 2 }}
          width={{ base: '100%', md: '25%', lg: '20%' }}
          minH={{ base: 'auto', md: '100vh' }}
          position={{ base: 'relative', md: 'sticky' }}
          top={{ base: '0', md: '12vh' }}
          marginTop={{ base: '14vh', md: '12vh' }}
          paddingX={{ base: 4, md: 0 }}
          alignItems={{ base: 'center', md: 'flex-start' }}
          spacing={4}
          display={secondPath ? { base: 'none', md: 'flex' } : 'flex'}
        >
          <HStack
            w="100%"
            justifyContent={{ base: 'center', md: 'flex-start' }}
            spacing={3}
          >
            <SortBy sortBy={sortByName} setSortBy={setSortBy} />
            <SearchFeature data={articles} />
            <StreakStalker dates={date} />
          </HStack>
          <Wrap
            spacing={2}
            justify={{ base: 'center', md: 'start' }}
            width="100%"
            paddingX={{ base: 2, md: 0 }}
          >
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
          </Wrap>
        </VStack>
        <VStack
          w={{ base: '100%', md: '75%', lg: '80%' }}
          id="projects"
          rowGap={{ base: 8, md: 20 }}
          paddingTop={{ base: secondPath ? '80px' : 8, md: 20 }}
          paddingX={{ base: 2, md: 8 }}
          justifyContent={'flex-start'}
        >
          {!secondPath && (
            <SimpleGrid
              columns={{ base: 2, sm: 2, lg: 3 }}
              spacing={{ base: 3, md: 8 }}
              width={'100%'}
              justifyItems="center"
            >
              {sortByApplied?.map((article: any) => (
                <ArticleCard key={article.id} {...article} />
              ))}
            </SimpleGrid>
          )}
          {secondPath && <MarkdownViewer articleKey={secondPath} />}
        </VStack>
      </Stack>
    </VStack>
  );
};

export default ArticlesScreen;
