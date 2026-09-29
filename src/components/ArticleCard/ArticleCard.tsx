import { Box, HStack, Img, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { BASE_NAV_ROUTE } from '@router';

type ArticleCardProps = {
  article_key: string;
  title: string;
  image: string;
  description: string;
  group_name: string;
  views: number;
  likes: number;
  last_updated: string;
  md_data?: string;
};

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
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="12"
    height="12"
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

const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const ArticleCard = ({
  article_key,
  title,
  last_updated,
  image,
  description,
  group_name,
  views = 0,
  likes = 0,
  md_data,
}: ArticleCardProps) => {
  const navigate = useNavigate();

  const formattedDate = (() => {
    try {
      const d = new Date(last_updated);
      if (isNaN(d.getTime())) return last_updated;
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return last_updated;
    }
  })();

  const readTime = md_data
    ? Math.max(1, Math.ceil(md_data.split(/\s+/).length / 200))
    : 3;

  return (
    <Box
      role="group"
      w="100%"
      display="flex"
      flexDirection="column"
      bg="rgba(18, 18, 24, 0.65)"
      backdropFilter="blur(16px)"
      border="1px solid rgba(255, 255, 255, 0.08)"
      borderRadius="20px"
      overflow="hidden"
      cursor="pointer"
      transition="all 0.35s cubic-bezier(0.4, 0, 0.2, 1)"
      boxShadow="0 4px 20px 0 rgba(0, 0, 0, 0.4)"
      _hover={{
        transform: 'translateY(-6px)',
        borderColor: 'rgba(168, 85, 247, 0.4)',
        boxShadow:
          '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 25px rgba(168, 85, 247, 0.15)',
      }}
      onClick={() => {
        if (article_key.startsWith('http')) {
          window.open(article_key, '_blank');
        } else {
          navigate(`${BASE_NAV_ROUTE}articles/${article_key}`);
        }
      }}
    >
      {/* Thumbnail Banner */}
      <Box
        position="relative"
        w="100%"
        h={{ base: '160px', sm: '190px', md: '210px' }}
        overflow="hidden"
        bg="rgba(0, 0, 0, 0.3)"
      >
        <Img
          src={image}
          alt={title}
          w="100%"
          h="100%"
          objectFit="cover"
          transition="transform 0.5s ease"
          _groupHover={{
            transform: 'scale(1.06)',
          }}
          loading="lazy"
        />
        {/* Subtle Dark Gradient Overlay */}
        <Box
          position="absolute"
          inset={0}
          bg="linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(10,10,14,0.7) 100%)"
        />

        {/* Top Badges */}
        <HStack
          position="absolute"
          top={3}
          left={3}
          right={3}
          justifyContent="space-between"
          alignItems="center"
          zIndex={2}
        >
          {group_name && (
            <HStack
              bg="rgba(147, 51, 234, 0.3)"
              backdropFilter="blur(12px)"
              border="1px solid rgba(192, 132, 252, 0.5)"
              borderRadius="full"
              px={3}
              py={1}
              spacing={1.5}
            >
              <Box
                w="6px"
                h="6px"
                borderRadius="full"
                bg="#c084fc"
                boxShadow="0 0 6px #c084fc"
              />
              <Text
                fontSize="xs"
                fontWeight="700"
                color="#ffffff"
                letterSpacing="0.03em"
              >
                {group_name}
              </Text>
            </HStack>
          )}

          <HStack
            bg="rgba(15, 17, 23, 0.85)"
            backdropFilter="blur(12px)"
            border="1px solid rgba(255, 255, 255, 0.2)"
            borderRadius="full"
            px={3}
            py={1}
            spacing={1.5}
            color="#ffffff"
          >
            <ClockIcon />
            <Text fontSize="11px" fontWeight="600" color="#f8fafc">
              {readTime}m read
            </Text>
          </HStack>
        </HStack>
      </Box>

      {/* Card Content */}
      <VStack
        p={{ base: 4, md: 5 }}
        alignItems="flex-start"
        spacing={3}
        flex={1}
        justifyContent="space-between"
      >
        <VStack alignItems="flex-start" spacing={2} w="100%">
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            fontWeight="700"
            color="white"
            lineHeight="1.3"
            noOfLines={2}
            transition="color 0.2s"
            _groupHover={{ color: '#c084fc' }}
          >
            {title}
          </Text>

          <Text
            fontSize="xs"
            color="gray.400"
            lineHeight="1.6"
            noOfLines={2}
          >
            {description}
          </Text>
        </VStack>

        {/* Footer Meta */}
        <VStack w="100%" spacing={3} pt={2} borderTop="1px solid rgba(255, 255, 255, 0.06)">
          <HStack w="100%" justifyContent="space-between" alignItems="center">
            <Text fontSize="11px" color="gray.400" fontWeight="500">
              {formattedDate}
            </Text>

            <HStack spacing={3} color="gray.400" fontSize="11px">
              <HStack spacing={1}>
                <EyeIcon />
                <Text>{views}</Text>
              </HStack>
              <HStack spacing={1}>
                <HeartIcon />
                <Text>{likes}</Text>
              </HStack>
            </HStack>
          </HStack>

          <HStack
            w="100%"
            justifyContent="flex-end"
            color="#c084fc"
            fontSize="xs"
            fontWeight="600"
            spacing={1}
            transition="all 0.2s"
          >
            <Text color="#c084fc">Read article</Text>
            <Box
              transform="translateX(0)"
              transition="transform 0.2s"
              _groupHover={{ transform: 'translateX(3px)' }}
            >
              <ArrowRightIcon />
            </Box>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default ArticleCard;
