import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import React from 'react';
import {
  BackArrowIcon,
  RefreshIcon,
  SendIcon,
} from './icons';

type EditorHeaderProps = {
  articleType: 'New' | 'Update';
  setArticleType: (type: 'New' | 'Update') => void;
  isFormValid: boolean;
  filledCount: number;
  isSubmitting: boolean;
  onClear: () => void;
  onSubmit: () => void;
  onBack: () => void;
};

const EditorHeader: React.FC<EditorHeaderProps> = ({
  articleType,
  setArticleType,
  isFormValid,
  filledCount,
  isSubmitting,
  onClear,
  onSubmit,
  onBack,
}) => {
  return (
    <Flex
      direction={{ base: 'column', lg: 'row' }}
      align={{ base: 'stretch', lg: 'center' }}
      justify="space-between"
      gap={4}
      p={4}
      mb={6}
      bg="rgba(15, 17, 26, 0.85)"
      backdropFilter="blur(16px)"
      border="1px solid rgba(255, 255, 255, 0.08)"
      borderRadius="20px"
      boxShadow="0 8px 32px rgba(0, 0, 0, 0.4)"
    >
      {/* Left: Nav Back & Title */}
      <HStack spacing={4} flexWrap="wrap">
        <Button
          size="sm"
          variant="ghost"
          leftIcon={<BackArrowIcon />}
          onClick={onBack}
          color="gray.400"
          _hover={{ color: 'white', bg: 'rgba(255, 255, 255, 0.06)' }}
          borderRadius="12px"
        >
          Articles
        </Button>

        <Box
          h="20px"
          w="1px"
          bg="rgba(255, 255, 255, 0.12)"
          display={{ base: 'none', sm: 'block' }}
        />

        <HStack spacing={2.5}>
          <Text
            fontSize={{ base: 'lg', md: 'xl' }}
            fontWeight="800"
            letterSpacing="-0.02em"
            bgGradient="linear(to-r, #ffffff, #c084fc)"
            bgClip="text"
          >
            Article Studio
          </Text>
          <Badge
            px={2.5}
            py={0.5}
            fontSize="xs"
            fontWeight="700"
            borderRadius="full"
            bg={isFormValid ? 'rgba(34, 197, 94, 0.15)' : 'rgba(234, 179, 8, 0.15)'}
            color={isFormValid ? '#4ade80' : '#facc15'}
            border={`1px solid ${
              isFormValid ? 'rgba(34, 197, 94, 0.3)' : 'rgba(234, 179, 8, 0.3)'
            }`}
          >
            {isFormValid ? '● Ready' : `● ${filledCount}/7 Fields`}
          </Badge>
        </HStack>
      </HStack>

      {/* Center: Mode Segmented Switcher */}
      <HStack
        bg="rgba(255, 255, 255, 0.04)"
        p={1}
        borderRadius="14px"
        border="1px solid rgba(255, 255, 255, 0.08)"
        spacing={1}
        alignSelf={{ base: 'center', lg: 'auto' }}
      >
        <Button
          size="sm"
          variant="unstyled"
          display="flex"
          alignItems="center"
          px={4}
          py={1.5}
          height="auto"
          borderRadius="10px"
          fontSize="xs"
          fontWeight="600"
          bg={articleType === 'New' ? 'rgba(168, 85, 247, 0.25)' : 'transparent'}
          color={articleType === 'New' ? '#c084fc' : 'gray.400'}
          border={
            articleType === 'New'
              ? '1px solid rgba(168, 85, 247, 0.4)'
              : '1px solid transparent'
          }
          _hover={{ color: 'white' }}
          onClick={() => setArticleType('New')}
        >
          + Create New
        </Button>
        <Button
          size="sm"
          variant="unstyled"
          display="flex"
          alignItems="center"
          px={4}
          py={1.5}
          height="auto"
          borderRadius="10px"
          fontSize="xs"
          fontWeight="600"
          bg={articleType === 'Update' ? 'rgba(168, 85, 247, 0.25)' : 'transparent'}
          color={articleType === 'Update' ? '#c084fc' : 'gray.400'}
          border={
            articleType === 'Update'
              ? '1px solid rgba(168, 85, 247, 0.4)'
              : '1px solid transparent'
          }
          _hover={{ color: 'white' }}
          onClick={() => setArticleType('Update')}
        >
          ✎ Update Existing
        </Button>
      </HStack>

      {/* Right: Actions */}
      <HStack spacing={3}>
        <Tooltip label="Reset all fields to default" placement="bottom">
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<RefreshIcon />}
            onClick={onClear}
            color="gray.400"
            _hover={{ color: 'red.400', bg: 'rgba(239, 68, 68, 0.1)' }}
            borderRadius="12px"
          >
            Clear
          </Button>
        </Tooltip>

        <Button
          size="sm"
          leftIcon={<SendIcon />}
          onClick={onSubmit}
          isLoading={isSubmitting}
          isDisabled={!isFormValid || isSubmitting}
          bgGradient="linear(to-r, #9333ea, #7c3aed)"
          color="white"
          borderRadius="12px"
          px={5}
          fontWeight="700"
          boxShadow={isFormValid ? '0 0 20px rgba(168, 85, 247, 0.35)' : 'none'}
          _hover={{
            bgGradient: 'linear(to-r, #a855f7, #8b5cf6)',
            boxShadow: '0 0 25px rgba(168, 85, 247, 0.5)',
          }}
          _disabled={{
            opacity: 0.45,
            cursor: 'not-allowed',
            boxShadow: 'none',
          }}
        >
          {articleType === 'New' ? 'Publish Article' : 'Save Changes'}
        </Button>
      </HStack>
    </Flex>
  );
};

export default EditorHeader;
