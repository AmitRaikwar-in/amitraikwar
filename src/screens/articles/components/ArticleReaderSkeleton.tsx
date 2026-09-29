import {
  Box,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  VStack,
} from '@chakra-ui/react';

const ArticleReaderSkeleton = () => {
  return (
    <Box w="100%" color="white" position="relative" pb={24}>
      {/* Top Simulated Progress Bar (Pulsing) */}
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
          w="35%"
          bg="linear-gradient(90deg, #38bdf8, #818cf8, #c084fc)"
          boxShadow="0 0 12px #c084fc"
          animation="pulse 1.5s infinite"
        />
      </Box>

      {/* Back Button Skeleton */}
      <HStack mb={8} w="100%" justifyContent="space-between" alignItems="center">
        <HStack spacing={3}>
          <Skeleton
            height="32px"
            width="130px"
            borderRadius="full"
            startColor="rgba(255, 255, 255, 0.05)"
            endColor="rgba(168, 85, 247, 0.15)"
          />
          <Skeleton
            height="22px"
            width="80px"
            borderRadius="full"
            startColor="rgba(255, 255, 255, 0.03)"
            endColor="rgba(168, 85, 247, 0.1)"
          />
        </HStack>
        <Skeleton
          height="32px"
          width="75px"
          borderRadius="full"
          startColor="rgba(255, 255, 255, 0.04)"
          endColor="rgba(168, 85, 247, 0.1)"
        />
      </HStack>

      {/* Article Header Skeleton */}
      <VStack alignItems="flex-start" spacing={5} w="100%" mb={8}>
        {/* Badges row */}
        <HStack spacing={3}>
          <Skeleton
            height="24px"
            width="90px"
            borderRadius="full"
            startColor="rgba(255, 255, 255, 0.05)"
            endColor="rgba(168, 85, 247, 0.15)"
          />
          <Skeleton
            height="24px"
            width="80px"
            borderRadius="full"
            startColor="rgba(255, 255, 255, 0.05)"
            endColor="rgba(168, 85, 247, 0.15)"
          />
        </HStack>

        {/* Title skeleton lines */}
        <Skeleton
          height={{ base: '32px', md: '48px' }}
          width="85%"
          borderRadius="12px"
          startColor="rgba(255, 255, 255, 0.06)"
          endColor="rgba(168, 85, 247, 0.2)"
        />
        <Skeleton
          height={{ base: '28px', md: '40px' }}
          width="60%"
          borderRadius="12px"
          startColor="rgba(255, 255, 255, 0.04)"
          endColor="rgba(168, 85, 247, 0.15)"
        />

        {/* Description line */}
        <Skeleton
          height="20px"
          width="75%"
          borderRadius="8px"
          startColor="rgba(255, 255, 255, 0.03)"
          endColor="rgba(168, 85, 247, 0.1)"
        />

        {/* Author / Date Info Bar */}
        <HStack
          w="100%"
          py={4}
          borderTop="1px solid rgba(255, 255, 255, 0.08)"
          borderBottom="1px solid rgba(255, 255, 255, 0.08)"
          justifyContent="space-between"
          alignItems="center"
        >
          <HStack spacing={3}>
            <SkeletonCircle
              size="36px"
              startColor="rgba(168, 85, 247, 0.2)"
              endColor="rgba(56, 189, 248, 0.2)"
            />
            <VStack spacing={1} alignItems="flex-start">
              <Skeleton
                height="14px"
                width="100px"
                borderRadius="6px"
                startColor="rgba(255, 255, 255, 0.06)"
                endColor="rgba(168, 85, 247, 0.15)"
              />
              <Skeleton
                height="10px"
                width="80px"
                borderRadius="4px"
                startColor="rgba(255, 255, 255, 0.03)"
                endColor="rgba(168, 85, 247, 0.08)"
              />
            </VStack>
          </HStack>

          <HStack spacing={3}>
            <Skeleton
              height="14px"
              width="90px"
              borderRadius="6px"
              startColor="rgba(255, 255, 255, 0.04)"
              endColor="rgba(168, 85, 247, 0.1)"
            />
            <Skeleton
              height="28px"
              width="70px"
              borderRadius="full"
              startColor="rgba(255, 255, 255, 0.04)"
              endColor="rgba(168, 85, 247, 0.15)"
            />
          </HStack>
        </HStack>
      </VStack>

      {/* Cinematic Full-Width Cover Image Skeleton */}
      <Skeleton
        w="100%"
        h={{ base: '220px', sm: '340px', md: '440px', lg: '480px' }}
        borderRadius="24px"
        mb={12}
        startColor="rgba(18, 18, 24, 0.8)"
        endColor="rgba(35, 25, 50, 0.85)"
        border="1px solid rgba(255, 255, 255, 0.08)"
      />

      {/* Two Column Layout Skeleton */}
      <Stack
        direction={{ base: 'column-reverse', lg: 'row' }}
        w="100%"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={{ base: 8, lg: 10, xl: 12 }}
      >
        {/* Left Reading Column Skeleton */}
        <VStack flex={1} w="100%" spacing={6} align="stretch">
          {/* Paragraph 1 */}
          <SkeletonText
            noOfLines={5}
            spacing={4}
            skeletonHeight="16px"
            startColor="rgba(255, 255, 255, 0.04)"
            endColor="rgba(168, 85, 247, 0.1)"
            borderRadius="8px"
          />

          {/* Heading 2 Skeleton */}
          <Skeleton
            height="28px"
            width="45%"
            borderRadius="8px"
            mt={4}
            startColor="rgba(255, 255, 255, 0.06)"
            endColor="rgba(168, 85, 247, 0.18)"
          />

          {/* Paragraph 2 */}
          <SkeletonText
            noOfLines={4}
            spacing={4}
            skeletonHeight="16px"
            startColor="rgba(255, 255, 255, 0.04)"
            endColor="rgba(168, 85, 247, 0.1)"
            borderRadius="8px"
          />

          {/* Code block shimmer */}
          <Skeleton
            height="180px"
            width="100%"
            borderRadius="16px"
            startColor="rgba(15, 17, 23, 0.9)"
            endColor="rgba(30, 25, 45, 0.9)"
            border="1px solid rgba(255, 255, 255, 0.08)"
          />

          {/* Paragraph 3 */}
          <SkeletonText
            noOfLines={3}
            spacing={4}
            skeletonHeight="16px"
            startColor="rgba(255, 255, 255, 0.04)"
            endColor="rgba(168, 85, 247, 0.1)"
            borderRadius="8px"
          />
        </VStack>

        {/* Right Sticky TOC Skeleton */}
        <VStack
          width={{ base: '100%', lg: '300px', xl: '340px' }}
          spacing={3}
          align="stretch"
          flexShrink={0}
        >
          {/* Action pill skeleton */}
          <Skeleton
            height="44px"
            width="100%"
            borderRadius="20px"
            startColor="rgba(18, 18, 24, 0.75)"
            endColor="rgba(35, 25, 50, 0.8)"
            border="1px solid rgba(255, 255, 255, 0.08)"
          />

          {/* TOC Card skeleton */}
          <Box
            p={5}
            bg="rgba(18, 18, 24, 0.6)"
            border="1px solid rgba(255, 255, 255, 0.08)"
            borderRadius="20px"
          >
            <Skeleton
              height="14px"
              width="40%"
              borderRadius="4px"
              mb={5}
              startColor="rgba(255, 255, 255, 0.06)"
              endColor="rgba(168, 85, 247, 0.15)"
            />
            <VStack spacing={3} align="stretch">
              <Skeleton
                height="12px"
                width="70%"
                borderRadius="4px"
                startColor="rgba(255, 255, 255, 0.04)"
                endColor="rgba(168, 85, 247, 0.1)"
              />
              <Skeleton
                height="12px"
                width="85%"
                borderRadius="4px"
                startColor="rgba(255, 255, 255, 0.04)"
                endColor="rgba(168, 85, 247, 0.1)"
              />
              <Skeleton
                height="12px"
                width="60%"
                borderRadius="4px"
                startColor="rgba(255, 255, 255, 0.04)"
                endColor="rgba(168, 85, 247, 0.1)"
              />
              <Skeleton
                height="12px"
                width="80%"
                borderRadius="4px"
                startColor="rgba(255, 255, 255, 0.04)"
                endColor="rgba(168, 85, 247, 0.1)"
              />
            </VStack>
          </Box>
        </VStack>
      </Stack>
    </Box>
  );
};

export default ArticleReaderSkeleton;
