import {
  Box,
  HStack,
  Text,
  VStack,
  SimpleGrid,
  Button,
  Badge,
  Flex,
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
import {
  MarkdownViewer,
  FeaturedArticle,
  SearchFeature,
  SortBy,
  SortByType,
} from './components';
import { useMemo, useState, useEffect } from 'react';
import { groupBy, sortBy } from 'lodash';
import { BASE_NAV_ROUTE } from '@router';

const SparkleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    {...props}
  >
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z" />
  </svg>
);

const ArticlesScreen = () => {
  const { data } = useGetArticlesData();
  const location = useLocation();
  const navigate = useNavigate();
  const { setCursorType } = useCursor();
  const [category, setCategory] = useState('All');
  const [sortByName, setSortBy] = useState<SortByType>('none');

  // Parse current article slug if present
  const pathParts = location.pathname.split('/').filter(Boolean);
  const articlesIdx = pathParts.indexOf('articles');
  const secondPath =
    articlesIdx !== -1 && pathParts.length > articlesIdx + 1
      ? pathParts[articlesIdx + 1]
      : undefined;

  useEffect(() => {
    setCursorType('follow');
  }, [setCursorType]);

  const articles = useMemo(
    () =>
      (data as any)?.data?.rows?.map((article: any) => {
        return article;
      }) ?? [],
    [data],
  );

  const filteredArticles = useMemo(() => groupBy(articles, 'group_name'), [articles]);

  const articleToShow = useMemo(() => {
    return category && category !== 'All'
      ? filteredArticles[category] ?? []
      : articles;
  }, [category, filteredArticles, articles]);

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

  // Featured article is the latest article when on 'All' with no custom sort
  const featuredArticle = useMemo(() => {
    if (category === 'All' && sortByName === 'none' && sortByApplied.length > 0) {
      return sortByApplied[0];
    }
    return null;
  }, [category, sortByName, sortByApplied]);

  // Grid articles: if featured is shown, display the rest in the grid; otherwise show all
  const gridArticles = useMemo(() => {
    if (featuredArticle && sortByApplied.length > 1) {
      return sortByApplied.slice(1);
    }
    if (featuredArticle && sortByApplied.length === 1) {
      return [];
    }
    return sortByApplied;
  }, [featuredArticle, sortByApplied]);

  if (!data) {
    return <WebsiteLoader />;
  }

  return (
    <VStack
      bg="black"
      w="100%"
      minH="100vh"
      paddingX={{ base: 3, md: 8, lg: 12 }}
      position="relative"
    >
      <Noise type="bg" />

      {/* Ambient background illumination */}
      <Box
        position="absolute"
        top="5%"
        left="50%"
        transform="translateX(-50%)"
        w={{ base: '300px', md: '600px' }}
        h={{ base: '200px', md: '300px' }}
        borderRadius="full"
        bg="radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, rgba(56, 189, 248, 0.05) 50%, transparent 80%)"
        filter="blur(60px)"
        pointerEvents="none"
        zIndex={0}
      />

      {/* Floating Center Brand Pill */}
      <Box
        position="fixed"
        top={{ base: 3, md: 5 }}
        zIndex={100}
        left="50%"
        transform="translateX(-50%)"
        border="1px solid rgba(255, 255, 255, 0.12)"
        boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.6)"
        borderRadius="20px"
        overflow="hidden"
        px={5}
        py={1.5}
        cursor="pointer"
        onClick={() => {
          navigate(BASE_NAV_ROUTE + 'articles');
        }}
        _hover={{
          transform: 'translateX(-50%) scale(1.05)',
          borderColor: 'rgba(168, 85, 247, 0.4)',
        }}
        transition="all 0.3s"
      >
        <GlassBox
          width="100%"
          height="100%"
          borderRadius={20}
          borderWidth={0.15}
          blur={4}
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
        <HStack spacing={2} alignItems="center">
          <Box color="#c084fc">
            <SparkleIcon />
          </Box>
          <Text
            color="white"
            fontSize={{ base: 'sm', md: 'md' }}
            fontWeight="700"
            letterSpacing="0.05em"
          >
            Articles
          </Text>
        </HStack>
      </Box>

      {/* Main Content Area */}
      <Box
        w="100%"
        maxW={secondPath ? { base: '100%', xl: '1560px', '2xl': '1700px' } : '1280px'}
        zIndex={1}
        pt={{ base: '84px', md: '100px' }}
      >
        {/* ARTICLE READER VIEW */}
        {secondPath ? (
          <MarkdownViewer articleKey={secondPath} />
        ) : (
          /* ARTICLES LISTING VIEW */
          <VStack spacing={{ base: 6, md: 10 }} align="stretch" w="100%" pb={24}>
            {/* Hero Section */}
            <VStack
              alignItems="flex-start"
              spacing={3}
              pt={{ base: 2, md: 4 }}
              pb={{ base: 2, md: 4 }}
            >
              <HStack spacing={2}>
                <Badge
                  colorScheme="purple"
                  variant="subtle"
                  borderRadius="full"
                  px={3}
                  py={1}
                  fontSize="xs"
                  fontWeight="700"
                  letterSpacing="0.08em"
                  textTransform="uppercase"
                >
                  Engineering & Insights
                </Badge>
              </HStack>

              <Text
                as="h1"
                fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
                fontWeight="800"
                color="white"
                letterSpacing="-0.03em"
                lineHeight="1.1"
              >
                Articles & Research
              </Text>

              <Text
                fontSize={{ base: 'sm', md: 'md' }}
                color="gray.400"
                maxW="680px"
                lineHeight="1.6"
              >
                In-depth articles covering modern frontend architecture, 3D graphics,
                performance optimization, systems design, and lessons learned building software.
              </Text>

              {/* Stats Bar */}
              <HStack
                spacing={3}
                pt={2}
                wrap="wrap"
                alignItems="center"
              >
                <HStack
                  bg="rgba(255, 255, 255, 0.04)"
                  border="1px solid rgba(255, 255, 255, 0.08)"
                  borderRadius="full"
                  px={3}
                  py={1}
                  fontSize="xs"
                  color="gray.300"
                >
                  <Text fontWeight="700" color="#c084fc">
                    {articles.length}
                  </Text>
                  <Text>Published</Text>
                </HStack>

                <HStack
                  bg="rgba(255, 255, 255, 0.04)"
                  border="1px solid rgba(255, 255, 255, 0.08)"
                  borderRadius="full"
                  px={3}
                  py={1}
                  fontSize="xs"
                  color="gray.300"
                >
                  <Text fontWeight="700" color="#c084fc">
                    {Object.keys(filteredArticles).length}
                  </Text>
                  <Text>Categories</Text>
                </HStack>
              </HStack>
            </VStack>

            {/* Glassmorphic Filter & Action Toolbar */}
            <Flex
              direction={{ base: 'column', md: 'row' }}
              justify="space-between"
              align={{ base: 'stretch', md: 'center' }}
              bg="rgba(18, 18, 24, 0.65)"
              backdropFilter="blur(16px)"
              border="1px solid rgba(255, 255, 255, 0.08)"
              borderRadius="20px"
              p={{ base: 3, md: 3 }}
              gap={3}
              boxShadow="0 4px 20px rgba(0, 0, 0, 0.3)"
            >
              {/* Category Pills */}
              <HStack
                spacing={2}
                overflowX="auto"
                py={1}
                px={1}
                css={{
                  '&::-webkit-scrollbar': { display: 'none' },
                  scrollbarWidth: 'none',
                }}
              >
                <Button
                  size="sm"
                  variant="ghost"
                  borderRadius="full"
                  fontSize="xs"
                  fontWeight="600"
                  px={4}
                  h="32px"
                  bg={
                    category === 'All'
                      ? 'rgba(168, 85, 247, 0.2)'
                      : 'transparent'
                  }
                  color={category === 'All' ? 'white' : 'gray.400'}
                  border="1px solid"
                  borderColor={
                    category === 'All'
                      ? 'rgba(168, 85, 247, 0.5)'
                      : 'rgba(255, 255, 255, 0.08)'
                  }
                  _hover={{
                    bg: 'rgba(168, 85, 247, 0.15)',
                    color: 'white',
                  }}
                  onClick={() => setCategory('All')}
                  transition="all 0.2s"
                >
                  All ({articles.length})
                </Button>

                {Object.keys(filteredArticles).map((group_name) => {
                  const isSelected = category === group_name;
                  const count = filteredArticles[group_name]?.length ?? 0;
                  return (
                    <Button
                      key={group_name}
                      size="sm"
                      variant="ghost"
                      borderRadius="full"
                      fontSize="xs"
                      fontWeight="600"
                      px={3.5}
                      h="32px"
                      bg={
                        isSelected
                          ? 'rgba(168, 85, 247, 0.2)'
                          : 'transparent'
                      }
                      color={isSelected ? 'white' : 'gray.400'}
                      border="1px solid"
                      borderColor={
                        isSelected
                          ? 'rgba(168, 85, 247, 0.5)'
                          : 'rgba(255, 255, 255, 0.08)'
                      }
                      _hover={{
                        bg: 'rgba(168, 85, 247, 0.15)',
                        color: 'white',
                      }}
                      onClick={() => setCategory(group_name)}
                      transition="all 0.2s"
                      flexShrink={0}
                    >
                      {group_name} ({count})
                    </Button>
                  );
                })}
              </HStack>

              {/* Action Controls: Search & Sort */}
              <HStack
                spacing={2.5}
                justifyContent={{ base: 'flex-end', md: 'flex-end' }}
                alignItems="center"
              >
                <SortBy sortBy={sortByName} setSortBy={setSortBy} />
                <SearchFeature data={articles} />
              </HStack>
            </Flex>

            {/* Featured Article Banner */}
            {featuredArticle && (
              <FeaturedArticle {...featuredArticle} />
            )}

            {/* Articles Grid */}
            {gridArticles.length > 0 ? (
              <SimpleGrid
                columns={{ base: 1, sm: 2, lg: 3 }}
                spacing={{ base: 6, md: 8 }}
                w="100%"
              >
                {gridArticles.map((article: any) => (
                  <ArticleCard
                    key={article.id || article.article_key}
                    {...article}
                  />
                ))}
              </SimpleGrid>
            ) : !featuredArticle ? (
              /* Empty state */
              <Box
                py={16}
                textAlign="center"
                bg="rgba(18, 18, 24, 0.4)"
                border="1px dashed rgba(255, 255, 255, 0.1)"
                borderRadius="24px"
              >
                <Text fontSize="lg" fontWeight="600" color="white" mb={2}>
                  No articles in &quot;{category}&quot;
                </Text>
                <Text fontSize="sm" color="gray.400" mb={4}>
                  There are currently no articles published under this category.
                </Text>
                <Button
                  size="sm"
                  colorScheme="purple"
                  variant="outline"
                  onClick={() => setCategory('All')}
                >
                  View All Articles
                </Button>
              </Box>
            ) : null}
          </VStack>
        )}
      </Box>
    </VStack>
  );
};

export default ArticlesScreen;
