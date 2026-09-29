import {
  Box,
  HStack,
  Img,
  Stack,
  Text,
  VStack,
  Button,
  Badge,
  useToast,
  Divider,
} from '@chakra-ui/react';
import { MdPreview } from '@components';
import { useGetArticleData, useLikeArticleData } from '@services';
import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_NAV_ROUTE } from '@router';
import SideViewer from './SideViewer';
import CommentBox from './CommentBox';
import ArticleReaderSkeleton from './ArticleReaderSkeleton';

const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1"
    {...props}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const ShareIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const MarkdownViewer = ({ articleKey }: { articleKey: string }) => {
  const { data } = useGetArticleData(articleKey);
  const { mutate: likeArticle } = useLikeArticleData();
  const navigate = useNavigate();
  const toast = useToast();

  const article = useMemo(
    () => (data as any)?.data?.rows?.[0] ?? {},
    [data],
  );

  const mdString = useMemo(() => article.md_data ?? '', [article]);
  const initialLikes = useMemo(() => article.likes ?? 0, [article]);
  const views = useMemo(() => article.views ?? 0, [article]);
  const title = article.title ?? '';
  const image = article.image ?? '';
  const description = article.description ?? '';
  const groupName = article.group_name ?? '';
  const lastUpdated = article.last_updated ?? '';
  const author = article.author || 'Amit Raikwar';

  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(Number(initialLikes) || 0);

  useEffect(() => {
    setLikesCount(Number(initialLikes) || 0);
  }, [initialLikes]);

  const handleLike = () => {
    if (hasLiked) return;
    setHasLiked(true);
    setLikesCount((prev: number) => prev + 1);
    likeArticle({ articleKey });
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied to clipboard',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  };

  // Reading progress tracking
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formattedDate = (() => {
    try {
      const d = new Date(lastUpdated);
      if (isNaN(d.getTime())) return '';
      return d.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  })();

  const readTime = mdString
    ? Math.max(1, Math.ceil(mdString.split(/\s+/).length / 200))
    : 4;

  if (!data) {
    return <ArticleReaderSkeleton />;
  }

  return (
    <Box w="100%" color="white" position="relative" pb={24}>
      {/* Top Reading Progress Bar */}
      <Box
        position="fixed"
        top={0}
        left={0}
        w="100%"
        h="3px"
        zIndex={9999}
        bg="rgba(255, 255, 255, 0.05)"
      >
        <Box
          h="100%"
          w={`${scrollProgress}%`}
          bg="linear-gradient(90deg, #38bdf8, #818cf8, #c084fc)"
          boxShadow="0 0 12px #c084fc"
          transition="width 0.1s ease-out"
        />
      </Box>

      {/* Navigation Breadcrumb Bar */}
      <HStack mb={8} w="100%" justifyContent="space-between" alignItems="center" wrap="wrap" gap={3}>
        <HStack spacing={3} alignItems="center">
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<ArrowLeftIcon />}
            onClick={() => navigate(`${BASE_NAV_ROUTE}articles`)}
            color="gray.300"
            bg="rgba(255, 255, 255, 0.04)"
            border="1px solid rgba(255, 255, 255, 0.08)"
            borderRadius="full"
            px={4}
            _hover={{
              color: 'white',
              bg: 'rgba(255, 255, 255, 0.1)',
              transform: 'translateX(-3px)',
            }}
            transition="all 0.2s"
          >
            Articles
          </Button>

          {groupName && (
            <>
              <Text color="gray.600" fontSize="sm">
                /
              </Text>
              <Badge
                colorScheme="purple"
                variant="subtle"
                borderRadius="full"
                px={3}
                py={0.5}
                fontSize="xs"
                fontWeight="600"
              >
                {groupName}
              </Badge>
            </>
          )}
        </HStack>

        <HStack spacing={2}>
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<ShareIcon />}
            onClick={handleCopyLink}
            color="gray.400"
            bg="rgba(255, 255, 255, 0.03)"
            border="1px solid rgba(255, 255, 255, 0.08)"
            borderRadius="full"
            px={3}
            _hover={{ color: 'white', bg: 'rgba(255, 255, 255, 0.08)' }}
            fontSize="xs"
          >
            Share
          </Button>
        </HStack>
      </HStack>

      {/* Full-Width Article Header */}
      <VStack
        alignItems="flex-start"
        spacing={5}
        w="100%"
        mb={8}
      >
        <HStack spacing={3} wrap="wrap">
          <HStack
            color="gray.400"
            fontSize="xs"
            spacing={1.5}
            bg="rgba(255, 255, 255, 0.04)"
            border="1px solid rgba(255, 255, 255, 0.08)"
            borderRadius="full"
            px={3}
            py={1}
          >
            <ClockIcon />
            <Text>{readTime} min read</Text>
          </HStack>

          <HStack
            color="gray.400"
            fontSize="xs"
            spacing={1.5}
            bg="rgba(255, 255, 255, 0.04)"
            border="1px solid rgba(255, 255, 255, 0.08)"
            borderRadius="full"
            px={3}
            py={1}
          >
            <EyeIcon />
            <Text>{views} views</Text>
          </HStack>
        </HStack>

        <Text
          as="h1"
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl', lg: '5xl', xl: '5xl' }}
          fontWeight="800"
          lineHeight="1.15"
          letterSpacing="-0.03em"
          color="white"
          w="100%"
        >
          {title}
        </Text>

        {description && (
          <Text
            fontSize={{ base: 'md', md: 'lg', xl: 'xl' }}
            color="gray.300"
            lineHeight="1.7"
            w="100%"
            maxW="1100px"
          >
            {description}
          </Text>
        )}

        {/* Author / Date Info Bar */}
        <HStack
          w="100%"
          py={4}
          borderTop="1px solid rgba(255, 255, 255, 0.08)"
          borderBottom="1px solid rgba(255, 255, 255, 0.08)"
          justifyContent="space-between"
          alignItems="center"
          fontSize="xs"
          color="gray.400"
          wrap="wrap"
          gap={3}
        >
          <HStack spacing={3}>
            <Box
              w="36px"
              h="36px"
              borderRadius="full"
              bg="linear-gradient(135deg, #a855f7, #38bdf8)"
              p="2px"
            >
              <Box
                w="100%"
                h="100%"
                borderRadius="full"
                bg="black"
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontWeight="700"
                fontSize="xs"
              >
                AR
              </Box>
            </Box>
            <VStack spacing={0} alignItems="flex-start">
              <Text fontWeight="700" color="white" fontSize="sm">
                {author}
              </Text>
              <Text fontSize="11px" color="gray.400">
                Software Engineer
              </Text>
            </VStack>
          </HStack>

          <HStack spacing={4}>
            {formattedDate && (
              <Text fontWeight="500">{formattedDate}</Text>
            )}

            <Button
              size="xs"
              variant="outline"
              leftIcon={
                <Box color={hasLiked ? 'pink.400' : 'gray.400'}>
                  <HeartIcon />
                </Box>
              }
              onClick={handleLike}
              color={hasLiked ? 'pink.300' : 'white'}
              borderColor={hasLiked ? 'pink.400' : 'rgba(255, 255, 255, 0.15)'}
              bg={hasLiked ? 'rgba(244, 114, 182, 0.15)' : 'transparent'}
              borderRadius="full"
              px={3}
              h="28px"
            >
              {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
            </Button>
          </HStack>
        </HStack>
      </VStack>

      {/* Cinematic Full-Width Cover Image */}
      {image && (
        <Box
          w="100%"
          h={{ base: '220px', sm: '340px', md: '460px', lg: '520px' }}
          borderRadius="24px"
          overflow="hidden"
          mb={12}
          border="1px solid rgba(255, 255, 255, 0.1)"
          boxShadow="0 24px 60px rgba(0, 0, 0, 0.7)"
          position="relative"
        >
          <Img
            src={image}
            alt={title}
            w="100%"
            h="100%"
            objectFit="cover"
          />
          <Box
            position="absolute"
            inset={0}
            bg="linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(10,10,14,0.7) 100%)"
          />
        </Box>
      )}

      {/* Two-Column Expansive Reading Layout */}
      <Stack
        direction={{ base: 'column-reverse', lg: 'row' }}
        w="100%"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={{ base: 8, lg: 10, xl: 12 }}
      >
        {/* Main Article Body Column - expands to full available width */}
        <Box
          flex={1}
          w="100%"
          minW={0}
          id="md-preview-flex-box"
        >
          {/* Article Markdown Content */}
          <MdPreview mdString={mdString} />

          {/* End-of-Article Author & Engagement Card */}
          <Box
            w="100%"
            mt={12}
            mb={6}
            p={{ base: 6, md: 8 }}
            bg="linear-gradient(135deg, rgba(25, 20, 36, 0.6) 0%, rgba(14, 14, 20, 0.8) 100%)"
            backdropFilter="blur(20px)"
            border="1px solid rgba(168, 85, 247, 0.25)"
            borderRadius="24px"
            boxShadow="0 12px 32px 0 rgba(0, 0, 0, 0.4)"
          >
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              spacing={5}
              alignItems={{ base: 'flex-start', sm: 'center' }}
              justifyContent="space-between"
            >
              <HStack spacing={4} alignItems="center">
                <Box
                  w="54px"
                  h="54px"
                  borderRadius="full"
                  bg="linear-gradient(135deg, #a855f7, #38bdf8)"
                  p="2px"
                  flexShrink={0}
                >
                  <Box
                    w="100%"
                    h="100%"
                    borderRadius="full"
                    bg="black"
                    color="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="800"
                    fontSize="md"
                  >
                    AR
                  </Box>
                </Box>
                <VStack spacing={1} alignItems="flex-start">
                  <Text fontSize="md" fontWeight="700" color="white">
                    Written by {author}
                  </Text>
                  <Text fontSize="xs" color="gray.400" maxW="480px">
                    Software Engineer crafting high-performance interfaces, 3D web graphics, and scalable architectures.
                  </Text>
                </VStack>
              </HStack>

              <HStack spacing={3} flexShrink={0}>
                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={
                    <Box color={hasLiked ? 'pink.400' : 'gray.300'}>
                      <HeartIcon />
                    </Box>
                  }
                  onClick={handleLike}
                  color={hasLiked ? 'pink.300' : 'white'}
                  borderColor={hasLiked ? 'pink.400' : 'rgba(255, 255, 255, 0.2)'}
                  bg={hasLiked ? 'rgba(244, 114, 182, 0.15)' : 'rgba(255, 255, 255, 0.05)'}
                  _hover={{
                    bg: 'rgba(244, 114, 182, 0.2)',
                    borderColor: 'pink.400',
                  }}
                  borderRadius="full"
                  px={4}
                >
                  {hasLiked ? 'Liked' : 'Like'} ({likesCount})
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={<ShareIcon />}
                  onClick={handleCopyLink}
                  color="white"
                  borderColor="rgba(255, 255, 255, 0.2)"
                  bg="rgba(255, 255, 255, 0.05)"
                  _hover={{
                    bg: 'rgba(255, 255, 255, 0.1)',
                  }}
                  borderRadius="full"
                  px={4}
                >
                  Share
                </Button>
              </HStack>
            </Stack>
          </Box>

          <Divider my={6} borderColor="rgba(255, 255, 255, 0.08)" />

          {/* Comments Section */}
          <CommentBox articleKey={articleKey} />
        </Box>

        {/* Right Sticky TOC Sidebar */}
        <SideViewer
          mdString={mdString}
          likes={likesCount}
          views={views}
          articleKey={articleKey}
          scrollProgress={scrollProgress}
        />
      </Stack>
    </Box>
  );
};

export default MarkdownViewer;
