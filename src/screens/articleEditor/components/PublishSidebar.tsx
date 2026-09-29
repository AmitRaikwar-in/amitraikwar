import {
  Badge,
  Box,
  Flex,
  HStack,
  Progress,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ArticleCard } from '@components';
import React from 'react';
import { ArticleWithContent } from '../types';
import DeleteArticleButton from './DeleteArticleButton';
import { CheckIcon } from './icons';

type ValidationItem = {
  key: string;
  label: string;
  filled: boolean;
};

type PublishSidebarProps = {
  state: ArticleWithContent;
  articleType: 'New' | 'Update';
  isFormValid: boolean;
  filledCount: number;
  validationItems: ValidationItem[];
  onReset: () => void;
};

const PublishSidebar: React.FC<PublishSidebarProps> = ({
  state,
  articleType,
  isFormValid,
  filledCount,
  validationItems,
  onReset,
}) => {
  return (
    <VStack
      w={{ base: '100%', xl: '380px' }}
      flexShrink={0}
      spacing={6}
      align="stretch"
      position={{ xl: 'sticky' }}
      top={{ xl: '24px' }}
    >
      {/* Feed Card Live Preview */}
      <Box
        bg="rgba(15, 17, 24, 0.75)"
        backdropFilter="blur(12px)"
        border="1px solid rgba(255, 255, 255, 0.08)"
        borderRadius="18px"
        p={4}
      >
        <Text
          fontSize="xs"
          fontWeight="700"
          color="gray.400"
          mb={3}
          textTransform="uppercase"
          letterSpacing="0.05em"
        >
          Feed Card Preview
        </Text>
        <Box
          pointerEvents="none"
          opacity={state.title ? 1 : 0.6}
          transition="opacity 0.2s"
        >
          <ArticleCard {...state} />
        </Box>
      </Box>

      {/* Publishing Readiness Checklist */}
      <Box
        bg="rgba(15, 17, 24, 0.75)"
        backdropFilter="blur(12px)"
        border="1px solid rgba(255, 255, 255, 0.08)"
        borderRadius="18px"
        p={5}
      >
        <Flex justify="space-between" align="center" mb={3}>
          <Text
            fontSize="xs"
            fontWeight="700"
            color="gray.400"
            textTransform="uppercase"
            letterSpacing="0.05em"
          >
            Readiness Checklist
          </Text>
          <Text
            fontSize="xs"
            fontWeight="700"
            color={isFormValid ? '#4ade80' : '#facc15'}
          >
            {filledCount}/7 Ready
          </Text>
        </Flex>

        <Progress
          value={(filledCount / 7) * 100}
          size="xs"
          borderRadius="full"
          mb={4}
          bg="rgba(255, 255, 255, 0.08)"
          sx={{
            '& > div': {
              bgGradient: isFormValid
                ? 'linear(to-r, #22c55e, #4ade80)'
                : 'linear(to-r, #a855f7, #c084fc)',
            },
          }}
        />

        <VStack align="stretch" spacing={2.5}>
          {validationItems.map((item) => (
            <Flex
              key={item.key}
              justify="space-between"
              align="center"
              fontSize="xs"
              p={2}
              borderRadius="10px"
              bg={
                item.filled
                  ? 'rgba(34, 197, 94, 0.06)'
                  : 'rgba(255, 255, 255, 0.02)'
              }
              border={`1px solid ${
                item.filled
                  ? 'rgba(34, 197, 94, 0.2)'
                  : 'rgba(255, 255, 255, 0.05)'
              }`}
            >
              <HStack spacing={2}>
                <Box
                  w="16px"
                  h="16px"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg={
                    item.filled
                      ? 'rgba(34, 197, 94, 0.2)'
                      : 'rgba(255, 255, 255, 0.05)'
                  }
                  color={item.filled ? '#4ade80' : 'gray.500'}
                >
                  {item.filled ? <CheckIcon /> : <Text fontSize="10px">○</Text>}
                </Box>
                <Text color={item.filled ? 'gray.200' : 'gray.400'}>
                  {item.label}
                </Text>
              </HStack>
              <Badge
                fontSize="9px"
                px={1.5}
                py={0.5}
                borderRadius="md"
                bg={
                  item.filled
                    ? 'rgba(34, 197, 94, 0.15)'
                    : 'rgba(255, 255, 255, 0.04)'
                }
                color={item.filled ? '#4ade80' : 'gray.500'}
              >
                {item.filled ? 'OK' : 'Required'}
              </Badge>
            </Flex>
          ))}
        </VStack>

        {/* Danger Zone: Delete Article */}
        {articleType === 'Update' && (
          <Box mt={6} pt={4} borderTop="1px solid rgba(255, 255, 255, 0.08)">
            <Text fontSize="xs" fontWeight="700" color="red.400" mb={2}>
              Danger Zone
            </Text>
            <DeleteArticleButton
              articleKey={state.article_key}
              onDelete={onReset}
            />
          </Box>
        )}
      </Box>
    </VStack>
  );
};

export default PublishSidebar;
