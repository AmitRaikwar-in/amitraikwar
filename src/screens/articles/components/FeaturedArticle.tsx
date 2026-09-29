import {
  Box,
  Button,
  HStack,
  Img,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { BASE_NAV_ROUTE } from '@router';

type FeaturedArticleProps = {
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
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
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

const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const SparkleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    {...props}
  >
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z" />
  </svg>
);

const FeaturedArticle = ({
  article_key,
  title,
  last_updated,
  image,
  description,
  group_name,
  views = 0,
  likes = 0,
  md_data,
}: FeaturedArticleProps) => {
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
    : 4;

  const handleOpen = () => {
    if (article_key.startsWith('http')) {
      window.open(article_key, '_blank');
    } else {
      navigate(`${BASE_NAV_ROUTE}articles/${article_key}`);
    }
  };

  return (
    <Box
      role="group"
      w="100%"
      position="relative"
      bg="linear-gradient(135deg, rgba(25, 20, 36, 0.7) 0%, rgba(12, 12, 18, 0.85) 100%)"
      backdropFilter="blur(20px)"
      border="1px solid rgba(168, 85, 247, 0.25)"
      borderRadius="24px"
      overflow="hidden"
      cursor="pointer"
      transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
      boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)"
      _hover={{
        borderColor: 'rgba(168, 85, 247, 0.5)',
        boxShadow:
          '0 24px 48px -12px rgba(168, 85, 247, 0.2), 0 0 35px rgba(168, 85, 247, 0.15)',
        transform: 'translateY(-4px)',
      }}
      onClick={handleOpen}
      mb={{ base: 6, md: 10 }}
    >
      {/* Ambient background glow orb */}
      <Box
        position="absolute"
        top="-30%"
        right="-10%"
        w="350px"
        h="350px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(168, 85, 247, 0.18) 0%, transparent 70%)"
        pointerEvents="none"
      />

      <Stack
        direction={{ base: 'column', lg: 'row' }}
        spacing={{ base: 5, md: 8 }}
        p={{ base: 4, sm: 6, md: 8 }}
        alignItems="center"
      >
        {/* Cover Image Container */}
        <Box
          position="relative"
          w={{ base: '100%', lg: '48%' }}
          h={{ base: '200px', sm: '260px', md: '300px' }}
          borderRadius="18px"
          overflow="hidden"
          boxShadow="0 10px 30px rgba(0, 0, 0, 0.6)"
          flexShrink={0}
        >
          <Img
            src={image}
            alt={title}
            w="100%"
            h="100%"
            objectFit="cover"
            transition="transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
            _groupHover={{
              transform: 'scale(1.05)',
            }}
          />
          <Box
            position="absolute"
            inset={0}
            bg="linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(10,10,14,0.6) 100%)"
          />

          {/* Badges on image */}
          <HStack
            position="absolute"
            top={3}
            left={3}
            spacing={2}
          >
            <HStack
              bg="rgba(147, 51, 234, 0.85)"
              backdropFilter="blur(8px)"
              color="white"
              px={3}
              py={1}
              borderRadius="full"
              fontSize="11px"
              fontWeight="700"
              letterSpacing="0.05em"
              boxShadow="0 2px 10px rgba(147, 51, 234, 0.4)"
            >
              <SparkleIcon />
              <Text>FEATURED</Text>
            </HStack>
          </HStack>

          <HStack
            position="absolute"
            bottom={3}
            left={3}
            bg="rgba(10, 10, 14, 0.8)"
            backdropFilter="blur(8px)"
            border="1px solid rgba(255, 255, 255, 0.12)"
            borderRadius="full"
            px={2.5}
            py={1}
            spacing={1.5}
            color="gray.300"
            fontSize="11px"
          >
            <ClockIcon />
            <Text fontWeight="500">{readTime} min read</Text>
          </HStack>
        </Box>

        {/* Content Side */}
        <VStack
          w={{ base: '100%', lg: '52%' }}
          alignItems="flex-start"
          justifyContent="space-between"
          spacing={4}
        >
          <HStack spacing={3}>
            {group_name && (
              <HStack
                bg="rgba(147, 51, 234, 0.3)"
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
                  letterSpacing="0.04em"
                >
                  {group_name}
                </Text>
              </HStack>
            )}
            <Text fontSize="xs" color="gray.400" fontWeight="500">
              {formattedDate}
            </Text>
          </HStack>

          <Text
            fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
            fontWeight="800"
            color="white"
            lineHeight="1.25"
            letterSpacing="-0.02em"
            transition="color 0.2s"
            _groupHover={{ color: '#c084fc' }}
          >
            {title}
          </Text>

          <Text
            fontSize={{ base: 'sm', md: 'md' }}
            color="gray.300"
            lineHeight="1.7"
            noOfLines={{ base: 3, md: 3 }}
          >
            {description}
          </Text>

          {/* Metrics & Action Row */}
          <HStack
            w="100%"
            justifyContent="space-between"
            alignItems="center"
            pt={3}
            borderTop="1px solid rgba(255, 255, 255, 0.08)"
          >
            <HStack spacing={4} color="gray.400" fontSize="xs">
              <HStack spacing={1.5}>
                <EyeIcon />
                <Text fontWeight="500">{views} views</Text>
              </HStack>
              <HStack spacing={1.5}>
                <HeartIcon />
                <Text fontWeight="500">{likes} likes</Text>
              </HStack>
            </HStack>

            <Button
              size="sm"
              variant="outline"
              color="white"
              borderColor="rgba(168, 85, 247, 0.4)"
              bg="rgba(168, 85, 247, 0.1)"
              rightIcon={<ArrowRightIcon />}
              _hover={{
                bg: 'rgba(168, 85, 247, 0.25)',
                borderColor: 'brand.900',
                transform: 'scale(1.03)',
              }}
              _active={{
                transform: 'scale(0.97)',
              }}
              borderRadius="full"
              px={4}
              fontSize="xs"
              fontWeight="600"
              transition="all 0.2s"
            >
              Read Story
            </Button>
          </HStack>
        </VStack>
      </Stack>
    </Box>
  );
};

export default FeaturedArticle;
