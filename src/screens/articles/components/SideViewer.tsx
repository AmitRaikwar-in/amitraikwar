import {
  Box,
  Button,
  Divider,
  HStack,
  Text,
  VStack,
  Tooltip,
  useToast,
  Badge,
} from '@chakra-ui/react';
import { useMemo, useState, useEffect } from 'react';
import { HEADING_TYPE_REGEX } from './constants';
import { useLikeArticleData } from '@services';

const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
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

const CommentIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
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

const ArrowUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const SideViewer = ({
  articleKey,
  mdString,
  likes: initialLikes,
  views,
  scrollProgress,
}: {
  articleKey: string;
  mdString: string;
  likes: number;
  views: number;
  scrollProgress?: number;
}) => {
  const { mutate: likeArticle } = useLikeArticleData();
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(Number(initialLikes) || 0);
  const toast = useToast();

  useEffect(() => {
    setLikesCount(Number(initialLikes) || 0);
  }, [initialLikes]);

  const handleLike = () => {
    if (hasLiked) return;
    setHasLiked(true);
    setLikesCount((prev: number) => prev + 1);
    likeArticle({ articleKey });
  };

  const handleShare = () => {
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

  // Extract headings from the markdown string
  const headings = useMemo(
    () =>
      Array.from(mdString.matchAll(HEADING_TYPE_REGEX), (m) => {
        const length = (m[0].match(/#/g)?.length ?? 1) - 1;
        return {
          itemName: m[1].replace(/#/g, '').trim(),
          marginStart: length,
          link: `#${m[1]
            .replace(/#/g, '')
            .trim()
            .toLowerCase()
            .replace(/\./g, '')
            .replace(/\?/g, '')
            .replace(/ /g, '-')
            .replace('+', 'p')}`,
        };
      }),
    [mdString],
  );

  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0) return;

    const timer = setTimeout(() => {
      const headingElements = headings
        .map((h) => document.getElementById(h.link.replace('#', '')))
        .filter((el): el is HTMLElement => el !== null);

      if (headingElements.length === 0) return;

      if (window.scrollY < 120) {
        setActiveId(headingElements[0].id);
      }

      const observerOptions = {
        root: null,
        rootMargin: '-90px 0px -70% 0px',
        threshold: [0, 1.0],
      };

      const observer = new IntersectionObserver((entries) => {
        const visibleHeadings = entries.filter((e) => e.isIntersecting);
        if (visibleHeadings.length > 0) {
          const topVisible = visibleHeadings.reduce((prev, curr) => {
            return prev.boundingClientRect.top < curr.boundingClientRect.top
              ? prev
              : curr;
          });
          setActiveId(topVisible.target.id);
        } else if (window.scrollY < 120) {
          setActiveId(headingElements[0].id);
        }
      }, observerOptions);

      headingElements.forEach((el) => observer.observe(el));

      return () => {
        headingElements.forEach((el) => observer.unobserve(el));
        observer.disconnect();
      };
    }, 500);

    return () => clearTimeout(timer);
  }, [headings]);

  const scrollToComponent = (target: string) => {
    const element = document.getElementById(target.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box
      pos={{ base: 'static', lg: 'sticky' }}
      top={{ base: 'auto', lg: '90px' }}
      alignSelf="flex-start"
      maxH={{ base: 'auto', lg: 'calc(100vh - 110px)' }}
      width={{ base: '100%', lg: '300px', xl: '340px' }}
      display="flex"
      flexDirection="column"
      rowGap={3}
      zIndex={20}
      flexShrink={0}
      mb={{ base: 6, lg: 0 }}
    >
      {/* Top Floating Action Pill */}
      <HStack
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        bg="rgba(18, 18, 24, 0.75)"
        backdropFilter="blur(16px)"
        border="1px solid rgba(255, 255, 255, 0.08)"
        borderRadius="20px"
        py={2}
        px={3}
        boxShadow="0 8px 24px 0 rgba(0, 0, 0, 0.4)"
      >
        {/* Views Counter */}
        <Tooltip label="Article views" placement="top" hasArrow>
          <HStack spacing={1.5} color="gray.400" alignItems="center" px={1}>
            <EyeIcon />
            <Text fontSize="xs" fontWeight="600">
              {views || 0}
            </Text>
          </HStack>
        </Tooltip>

        <Divider orientation="vertical" h="16px" borderColor="rgba(255,255,255,0.12)" />

        {/* Like Button */}
        <Tooltip label={hasLiked ? 'Liked!' : 'Like this article'} placement="top" hasArrow>
          <Button
            size="xs"
            variant="ghost"
            leftIcon={
              <Box color={hasLiked ? 'pink.400' : 'gray.400'}>
                <HeartIcon />
              </Box>
            }
            onClick={handleLike}
            color={hasLiked ? 'pink.300' : 'white'}
            bg={hasLiked ? 'rgba(244, 114, 182, 0.15)' : 'transparent'}
            _hover={{
              bg: 'rgba(244, 114, 182, 0.15)',
              color: 'pink.300',
              transform: 'scale(1.05)',
            }}
            borderRadius="full"
            px={2.5}
            h="28px"
            transition="all 0.2s"
          >
            <Text fontSize="xs" fontWeight="600">
              {likesCount}
            </Text>
          </Button>
        </Tooltip>

        <Divider orientation="vertical" h="16px" borderColor="rgba(255,255,255,0.12)" />

        {/* Share Button */}
        <Tooltip label="Share link" placement="top" hasArrow>
          <Button
            size="xs"
            variant="ghost"
            onClick={handleShare}
            color="gray.300"
            _hover={{
              bg: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              transform: 'scale(1.05)',
            }}
            borderRadius="full"
            px={2}
            h="28px"
            transition="all 0.2s"
          >
            <ShareIcon />
          </Button>
        </Tooltip>

        <Divider orientation="vertical" h="16px" borderColor="rgba(255,255,255,0.12)" />

        {/* Comments Button */}
        <Tooltip label="Jump to comments" placement="top" hasArrow>
          <Button
            size="xs"
            variant="ghost"
            onClick={() => scrollToComponent('comments')}
            color="gray.300"
            _hover={{
              bg: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              transform: 'scale(1.05)',
            }}
            borderRadius="full"
            px={2}
            h="28px"
            transition="all 0.2s"
          >
            <CommentIcon />
          </Button>
        </Tooltip>
      </HStack>

      {/* Table of Contents Container */}
      <Box
        display={{ base: 'none', lg: 'flex' }}
        flexDirection="column"
        w="100%"
        bg="rgba(18, 18, 24, 0.6)"
        backdropFilter="blur(16px)"
        border="1px solid rgba(255, 255, 255, 0.08)"
        borderRadius="20px"
        p={4}
        boxShadow="0 12px 32px 0 rgba(0, 0, 0, 0.35)"
        overflow="hidden"
      >
        <HStack justifyContent="space-between" alignItems="center" mb={3}>
          <HStack spacing={2}>
            <Text
              fontSize="10px"
              letterSpacing="1.5px"
              color="gray.400"
              fontWeight="700"
              textTransform="uppercase"
              fontFamily={'"Space Mono", monospace'}
            >
              Contents
            </Text>
            {scrollProgress !== undefined && (
              <Badge
                variant="subtle"
                colorScheme="purple"
                fontSize="10px"
                borderRadius="full"
                px={2}
                py={0.2}
              >
                {Math.round(scrollProgress)}% read
              </Badge>
            )}
          </HStack>

          <Button
            size="xs"
            variant="ghost"
            leftIcon={<ArrowUpIcon />}
            onClick={scrollToTop}
            fontSize="10px"
            color="gray.400"
            _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
            h="22px"
            px={2}
            borderRadius="md"
          >
            Top
          </Button>
        </HStack>

        {headings.length > 0 ? (
          <Box position="relative" mt={1} maxH="52vh" overflow="hidden" display="flex" flexDir="column">
            {/* Vertical track line */}
            <Box
              position="absolute"
              left="4px"
              top={2}
              bottom={2}
              w="1px"
              bg="rgba(255, 255, 255, 0.1)"
              zIndex={0}
            />

            <VStack
              align="stretch"
              spacing={1}
              zIndex={1}
              position="relative"
              pl={3}
              overflowY="auto"
              css={{
                '&::-webkit-scrollbar': {
                  width: '3px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: '10px',
                },
              }}
            >
              {headings.map(({ marginStart, itemName, link }, index) => {
                const id = link.replace('#', '');
                const isActive = activeId === id;
                const cleanName = itemName.trim();

                return (
                  <Box
                    key={index + itemName}
                    onClick={() => {
                      setActiveId(id);
                      scrollToComponent(link);
                    }}
                    role="button"
                    tabIndex={0}
                    style={{ cursor: 'pointer', outline: 'none' }}
                    py={1}
                    position="relative"
                  >
                    {/* Active Indicator Bar with Glow */}
                    {isActive && (
                      <Box
                        position="absolute"
                        left="-15px"
                        top="50%"
                        transform="translateY(-50%)"
                        width="3px"
                        height="18px"
                        bg="#c084fc"
                        borderRadius="full"
                        boxShadow="0 0 10px #c084fc"
                        transition="all 0.25s ease"
                      />
                    )}
                    <Text
                      color={isActive ? '#c084fc' : 'gray.400'}
                      fontSize={marginStart > 0 ? 'xs' : 'sm'}
                      fontWeight={isActive ? '600' : 'normal'}
                      transition="all 0.2s ease"
                      _hover={{
                        color: 'white',
                        transform: 'translateX(3px)',
                      }}
                      pl={marginStart * 2.5}
                      noOfLines={1}
                      title={cleanName}
                    >
                      {cleanName}
                    </Text>
                  </Box>
                );
              })}
            </VStack>
          </Box>
        ) : (
          <Text fontSize="xs" color="gray.500" fontStyle="italic">
            No sections in this article
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default SideViewer;
