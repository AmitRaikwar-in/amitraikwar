import { Box, Button, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { useMemo, useState, useEffect } from 'react';
import { HEADING_TYPE_REGEX } from './constants';
import { useLikeArticleData } from '@services';

const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ThumbsUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M7 10v12" />
    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h3l4-7a2.2 2.2 0 0 1 4 2.88z" />
  </svg>
);

const CommentIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const SideViewer = ({
  articleKey,
  mdString,
  likes,
  views,
}: {
  articleKey: string;
  mdString: string;
  likes: number;
  views: number;
}) => {
  const { mutate: likeArticle } = useLikeArticleData();
  // Extract headings from the markdown string and remove dots.
  const headings = useMemo(
    () =>
      Array.from(mdString.matchAll(HEADING_TYPE_REGEX), (m) => {
        const length = (m[0].match(/#/g)?.length ?? 1) - 1;
        return {
          itemName:
            Array(length)
              .fill('  ')
              .reduce((acc, it) => {
                acc += it;
                return acc;
              }, '') + m[1].replace(/#/g, '').trim(),
          marginStart: length * 1,
          link: `#${m[1].replace(/#/g, '').trim().toLowerCase().replace(/\./g, '').replace(/\?/g, '').replace(/ /g, '-').replace('+', 'p')}`,
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

      // Set first heading active initially if scroll is at top
      if (window.scrollY < 100) {
        setActiveId(headingElements[0].id);
      }

      const observerOptions = {
        root: null,
        rootMargin: '-80px 0px -70% 0px', // trigger when heading is in the upper portion
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
        } else if (window.scrollY < 100) {
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
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  return (
    <Box
      pos={{ base: 'static', md: 'sticky' }}
      top={{ base: 'auto', md: '12vh' }}
      h={{ base: 'auto', md: 'calc(100vh - 14vh)' }}
      width={{ base: '100%', md: '28%' }}
      overflowY="hidden"
      display={'flex'}
      px={{ base: 4, md: 2 }}
      py={{ base: 4, md: 0 }}
      rowGap={3}
      flexDir={'column'}
      borderBottom={{ base: '1px solid rgba(255, 255, 255, 0.1)', md: 'none' }}
      mb={{ base: 4, md: 0 }}
    >
      <HStack
        w={'100%'}
        justifyContent={'space-evenly'}
        alignItems={'center'}
        bg={'rgba(255, 255, 255, 0.03)'}
        border={'1px solid rgba(255, 255, 255, 0.08)'}
        borderRadius={'xl'}
        py={2}
        px={3}
        boxShadow={'0 4px 12px 0 rgba(0, 0, 0, 0.2)'}
        backdropFilter={'blur(4px)'}
      >
        {/* Views */}
        <HStack spacing={1.5} color="gray.400" alignItems="center">
          <EyeIcon width="16px" height="16px" />
          <Text fontSize="xs" fontWeight="600">
            {views}
          </Text>
        </HStack>

        <Divider
          orientation="vertical"
          h="16px"
          borderColor="rgba(255,255,255,0.15)"
        />

        {/* Like Button */}
        <Button
          size={'xs'}
          variant="ghost"
          leftIcon={<ThumbsUpIcon width="14px" height="14px" />}
          onClick={() => likeArticle({ articleKey })}
          color="white"
          _hover={{
            bg: 'rgba(255, 255, 255, 0.08)',
            transform: 'scale(1.05)',
          }}
          _active={{
            bg: 'rgba(72, 187, 120, 0.2)',
            color: 'green.300',
            transform: 'scale(0.95)',
          }}
          transition="all 0.2s"
          px={2.5}
          h="28px"
        >
          <Text fontSize="xs" fontWeight="600">
            {likes}
          </Text>
        </Button>

        <Divider
          orientation="vertical"
          h="16px"
          borderColor="rgba(255,255,255,0.15)"
        />

        {/* Comments Button */}
        <Button
          size={'xs'}
          variant="ghost"
          leftIcon={<CommentIcon width="14px" height="14px" />}
          onClick={() => scrollToComponent('comments')}
          color="white"
          _hover={{
            bg: 'rgba(255, 255, 255, 0.08)',
            transform: 'scale(1.05)',
          }}
          _active={{
            bg: 'rgba(255, 255, 255, 0.12)',
            transform: 'scale(0.95)',
          }}
          transition="all 0.2s"
          px={2.5}
          h="28px"
        >
          <Text fontSize="xs" fontWeight="600">
            Comments
          </Text>
        </Button>
      </HStack>
      <Box
        display={{ base: 'none', md: 'flex' }}
        flexDir="column"
        w="100%"
        flex={1}
        bg="rgba(255, 255, 255, 0.01)"
        border="1px solid rgba(255, 255, 255, 0.05)"
        borderRadius="2xl"
        p={4}
        boxShadow="inset 0 1px 1px 0 rgba(255, 255, 255, 0.05), 0 8px 32px 0 rgba(0, 0, 0, 0.4)"
        backdropFilter="blur(8px)"
        overflow="hidden"
      >
        <Text
          fontSize="xs"
          letterSpacing="2px"
          color="gray.500"
          fontWeight="bold"
          mb={3}
          textTransform="uppercase"
          fontFamily={'"Space Mono", monospace'}
        >
          On This Page
        </Text>

        {headings.length > 0 ? (
          <Box
            position="relative"
            mt={1}
            flex={1}
            overflow="hidden"
            display="flex"
            flexDir="column"
          >
            {/* Vertical track line */}
            <Box
              position="absolute"
              left="3px"
              top={2}
              bottom={2}
              w="1px"
              bg="whiteAlpha.100"
              zIndex={0}
            />

            <VStack
              align="stretch"
              spacing={1}
              zIndex={1}
              position="relative"
              pl={2}
              flex={1}
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
                '&::-webkit-scrollbar-thumb:hover': {
                  background: 'rgba(255, 255, 255, 0.3)',
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
                    py={0.3}
                    position="relative"
                    _hover={{
                      outline: 'none',
                    }}
                    _focus={{
                      outline: 'none',
                    }}
                  >
                    {/* Active Indicator Dot with Glow */}
                    {isActive && (
                      <Box
                        position="absolute"
                        left="-21px" // places it centered on the 3px track line
                        top="50%"
                        transform="translateY(-50%)"
                        width="7px"
                        height="7px"
                        bg="violet"
                        borderRadius="full"
                        boxShadow="0 0 8px #EE82EE, 0 0 16px #EE82EE"
                        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                      />
                    )}
                    <Text
                      color={isActive ? 'violet' : 'gray.400'}
                      fontSize={marginStart > 0 ? 'xs' : 'sm'}
                      fontWeight={isActive ? 'semibold' : 'normal'}
                      fontFamily={'"Space Mono", monospace'}
                      transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                      _hover={{
                        color: isActive ? 'violet' : 'white',
                        transform: 'translateX(4px)',
                      }}
                      pl={marginStart * 2} // indent hierarchical items beautifully
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
          <Text fontSize="xs" color="gray.600" fontStyle="italic">
            No headings found
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default SideViewer;
