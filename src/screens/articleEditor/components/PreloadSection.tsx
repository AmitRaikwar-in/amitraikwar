import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { SearchIcon } from './icons';

type PreloadSectionProps = {
  articleKey: string;
  setArticleKey: (key: string) => void;
  onPreload: (key: string) => void;
  isLoading: boolean;
};

const PreloadSection: React.FC<PreloadSectionProps> = ({
  articleKey,
  setArticleKey,
  onPreload,
  isLoading,
}) => {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      align={{ base: 'stretch', md: 'center' }}
      justify="space-between"
      gap={3}
      p={4}
      mb={6}
      bg="rgba(168, 85, 247, 0.05)"
      border="1px solid rgba(168, 85, 247, 0.2)"
      borderRadius="16px"
    >
      <HStack spacing={3} flex={1}>
        <Box
          color="#c084fc"
          p={2}
          bg="rgba(168, 85, 247, 0.12)"
          borderRadius="10px"
        >
          <SearchIcon />
        </Box>
        <VStack align="start" spacing={0} flex={1}>
          <Text fontSize="sm" fontWeight="700" color="white">
            Load Existing Article by Slug
          </Text>
          <Text fontSize="xs" color="gray.400">
            Enter the unique article key to fetch its metadata and markdown content.
          </Text>
        </VStack>
      </HStack>

      <HStack spacing={2} minW={{ base: '100%', md: '380px' }}>
        <Input
          placeholder="e.g. mastering-typescript"
          value={articleKey}
          onChange={(e) => setArticleKey(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && articleKey.trim()) {
              onPreload(articleKey.trim());
            }
          }}
          bg="rgba(10, 12, 18, 0.9)"
          border="1px solid rgba(255, 255, 255, 0.15)"
          borderRadius="12px"
          size="sm"
          _focus={{
            borderColor: '#a855f7',
            boxShadow: '0 0 0 1px #a855f7',
          }}
        />
        <Button
          size="sm"
          isDisabled={isLoading || !articleKey.trim()}
          isLoading={isLoading}
          onClick={() => onPreload(articleKey.trim())}
          bg="#9333ea"
          color="white"
          borderRadius="12px"
          px={4}
          _hover={{ bg: '#a855f7' }}
        >
          Preload
        </Button>
      </HStack>
    </Flex>
  );
};

export default PreloadSection;
