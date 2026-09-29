import {
  Box,
  Collapse,
  Flex,
  HStack,
  Image,
  Input,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { ArticleWithContent } from '../types';
import { ChevronDownIcon } from './icons';

type MetadataSectionProps = {
  state: ArticleWithContent;
  onChange: (field: keyof ArticleWithContent, value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  isFormValid: boolean;
  filledCount: number;
};

const MetadataSection: React.FC<MetadataSectionProps> = ({
  state,
  onChange,
  isOpen,
  onToggle,
  isFormValid,
  filledCount,
}) => {
  return (
    <Box
      bg="rgba(15, 17, 24, 0.75)"
      backdropFilter="blur(12px)"
      border="1px solid rgba(255, 255, 255, 0.08)"
      borderRadius="18px"
      overflow="hidden"
    >
      {/* Header with Collapse Toggle */}
      <Flex
        p={4}
        align="center"
        justify="space-between"
        cursor="pointer"
        userSelect="none"
        onClick={onToggle}
        _hover={{ bg: 'rgba(255, 255, 255, 0.02)' }}
        transition="background 0.2s"
      >
        <HStack spacing={3}>
          <Box
            w="8px"
            h="8px"
            borderRadius="full"
            bg={isFormValid ? '#4ade80' : '#facc15'}
            boxShadow={`0 0 10px ${isFormValid ? '#4ade80' : '#facc15'}`}
          />
          <Text fontSize="sm" fontWeight="700" color="white">
            Article Metadata &amp; Configuration
          </Text>
          <Text
            fontSize="xs"
            color="gray.500"
            display={{ base: 'none', md: 'block' }}
          >
            ({filledCount}/7 essential properties filled)
          </Text>
        </HStack>

        <HStack spacing={2}>
          <Text fontSize="xs" color="#c084fc" fontWeight="600">
            {isOpen ? 'Collapse' : 'Expand Form'}
          </Text>
          <Box
            transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
            transition="transform 0.2s"
            color="gray.400"
          >
            <ChevronDownIcon />
          </Box>
        </HStack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Box p={5} pt={2} borderTop="1px solid rgba(255, 255, 255, 0.05)">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={4}>
            <Box>
              <Text fontSize="xs" fontWeight="600" color="gray.400" mb={1.5}>
                Article Slug / Key <Text as="span" color="red.400">*</Text>
              </Text>
              <Input
                size="sm"
                placeholder="e.g. react-19-server-actions"
                value={state.article_key}
                onChange={(e) => onChange('article_key', e.target.value)}
                bg="rgba(10, 11, 16, 0.7)"
                border="1px solid rgba(255, 255, 255, 0.1)"
                borderRadius="10px"
                _focus={{
                  borderColor: '#c084fc',
                  boxShadow: '0 0 0 1px #c084fc',
                }}
              />
            </Box>

            <Box gridColumn={{ base: 'span 1', md: 'span 2' }}>
              <Text fontSize="xs" fontWeight="600" color="gray.400" mb={1.5}>
                Article Title <Text as="span" color="red.400">*</Text>
              </Text>
              <Input
                size="sm"
                placeholder="e.g. The Complete Guide to React 19 Server Actions"
                value={state.title}
                onChange={(e) => onChange('title', e.target.value)}
                bg="rgba(10, 11, 16, 0.7)"
                border="1px solid rgba(255, 255, 255, 0.1)"
                borderRadius="10px"
                _focus={{
                  borderColor: '#c084fc',
                  boxShadow: '0 0 0 1px #c084fc',
                }}
              />
            </Box>
          </SimpleGrid>

          <Box mb={4}>
            <Text fontSize="xs" fontWeight="600" color="gray.400" mb={1.5}>
              Description / Excerpt <Text as="span" color="red.400">*</Text>
            </Text>
            <Input
              size="sm"
              placeholder="Brief overview explaining what readers will learn from this article"
              value={state.description}
              onChange={(e) => onChange('description', e.target.value)}
              bg="rgba(10, 11, 16, 0.7)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              borderRadius="10px"
              _focus={{
                borderColor: '#c084fc',
                boxShadow: '0 0 0 1px #c084fc',
              }}
            />
          </Box>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={4}>
            <Box>
              <Text fontSize="xs" fontWeight="600" color="gray.400" mb={1.5}>
                Author Name <Text as="span" color="red.400">*</Text>
              </Text>
              <Input
                size="sm"
                placeholder="e.g. Amit Raikwar"
                value={state.author}
                onChange={(e) => onChange('author', e.target.value)}
                bg="rgba(10, 11, 16, 0.7)"
                border="1px solid rgba(255, 255, 255, 0.1)"
                borderRadius="10px"
                _focus={{
                  borderColor: '#c084fc',
                  boxShadow: '0 0 0 1px #c084fc',
                }}
              />
            </Box>

            <Box>
              <Text fontSize="xs" fontWeight="600" color="gray.400" mb={1.5}>
                Group / Category Name <Text as="span" color="red.400">*</Text>
              </Text>
              <Input
                size="sm"
                placeholder="e.g. React & Frontend"
                value={state.group_name}
                onChange={(e) => onChange('group_name', e.target.value)}
                bg="rgba(10, 11, 16, 0.7)"
                border="1px solid rgba(255, 255, 255, 0.1)"
                borderRadius="10px"
                _focus={{
                  borderColor: '#c084fc',
                  boxShadow: '0 0 0 1px #c084fc',
                }}
              />
            </Box>

            <Box>
              <Text fontSize="xs" fontWeight="600" color="gray.400" mb={1.5}>
                Group ID / Category Slug <Text as="span" color="red.400">*</Text>
              </Text>
              <Input
                size="sm"
                placeholder="e.g. react"
                value={state.group_id}
                onChange={(e) => onChange('group_id', e.target.value)}
                bg="rgba(10, 11, 16, 0.7)"
                border="1px solid rgba(255, 255, 255, 0.1)"
                borderRadius="10px"
                _focus={{
                  borderColor: '#c084fc',
                  boxShadow: '0 0 0 1px #c084fc',
                }}
              />
            </Box>
          </SimpleGrid>

          <Box>
            <Text fontSize="xs" fontWeight="600" color="gray.400" mb={1.5}>
              Cover Image URL
            </Text>
            <HStack spacing={3}>
              <Input
                size="sm"
                placeholder="https://images.unsplash.com/..."
                value={state.image}
                onChange={(e) => onChange('image', e.target.value)}
                bg="rgba(10, 11, 16, 0.7)"
                border="1px solid rgba(255, 255, 255, 0.1)"
                borderRadius="10px"
                _focus={{
                  borderColor: '#c084fc',
                  boxShadow: '0 0 0 1px #c084fc',
                }}
              />
              {state.image && (
                <Box
                  w="36px"
                  h="36px"
                  borderRadius="8px"
                  overflow="hidden"
                  flexShrink={0}
                  border="1px solid rgba(255, 255, 255, 0.2)"
                >
                  <Image
                    src={state.image}
                    alt="Cover thumbnail"
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    fallback={
                      <Box
                        w="100%"
                        h="100%"
                        bg="gray.800"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text fontSize="9px" color="gray.500">
                          err
                        </Text>
                      </Box>
                    }
                  />
                </Box>
              )}
            </HStack>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export default MetadataSection;
