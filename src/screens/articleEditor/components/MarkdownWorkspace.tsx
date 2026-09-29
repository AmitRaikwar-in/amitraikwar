import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  Textarea,
  Tooltip,
} from '@chakra-ui/react';
import { MdPreview } from '@components';
import React, { useCallback, useRef, useState } from 'react';

type MarkdownWorkspaceProps = {
  content: string;
  onChangeContent: (value: string) => void;
  stats: {
    words: number;
    chars: number;
    lines: number;
    readTime: number;
  };
};

const MarkdownWorkspace: React.FC<MarkdownWorkspaceProps> = ({
  content,
  onChangeContent,
  stats,
}) => {
  const [viewMode, setViewMode] = useState<'split' | 'editor' | 'preview'>('split');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Markdown formatting helper
  const insertFormatting = useCallback(
    (prefix: string, suffix = '', defaultText = '') => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const currentText = content || '';
      const selected = currentText.substring(start, end) || defaultText;
      const replacement = `${prefix}${selected}${suffix}`;
      const updated =
        currentText.substring(0, start) +
        replacement +
        currentText.substring(end);

      onChangeContent(updated);

      setTimeout(() => {
        textarea.focus();
        const cursorStart = start + prefix.length;
        const cursorEnd = cursorStart + selected.length;
        textarea.setSelectionRange(cursorStart, cursorEnd);
      }, 0);
    },
    [content, onChangeContent],
  );

  return (
    <Box
      bg="rgba(15, 17, 24, 0.75)"
      backdropFilter="blur(12px)"
      border="1px solid rgba(255, 255, 255, 0.08)"
      borderRadius="18px"
      overflow="hidden"
    >
      {/* Editor Workspace Toolbar */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align={{ base: 'stretch', md: 'center' }}
        gap={2}
        p={3}
        borderBottom="1px solid rgba(255, 255, 255, 0.08)"
        bg="rgba(10, 12, 18, 0.9)"
      >
        {/* Formatting Ribbon */}
        <HStack spacing={1} overflowX="auto" py={1}>
          <Tooltip label="Heading 1" placement="top">
            <Button
              size="xs"
              variant="ghost"
              color="gray.400"
              _hover={{ color: 'white', bg: 'rgba(255, 255, 255, 0.08)' }}
              onClick={() => insertFormatting('\n# ', '\n', 'Heading 1')}
            >
              H1
            </Button>
          </Tooltip>
          <Tooltip label="Heading 2" placement="top">
            <Button
              size="xs"
              variant="ghost"
              color="gray.400"
              _hover={{ color: 'white', bg: 'rgba(255, 255, 255, 0.08)' }}
              onClick={() => insertFormatting('\n## ', '\n', 'Heading 2')}
            >
              H2
            </Button>
          </Tooltip>
          <Tooltip label="Heading 3" placement="top">
            <Button
              size="xs"
              variant="ghost"
              color="gray.400"
              _hover={{ color: 'white', bg: 'rgba(255, 255, 255, 0.08)' }}
              onClick={() => insertFormatting('\n### ', '\n', 'Heading 3')}
            >
              H3
            </Button>
          </Tooltip>

          <Box h="14px" w="1px" bg="rgba(255, 255, 255, 0.12)" mx={1} />

          <Tooltip label="Bold (Ctrl+B)" placement="top">
            <Button
              size="xs"
              variant="ghost"
              fontWeight="bold"
              color="gray.400"
              _hover={{ color: 'white', bg: 'rgba(255, 255, 255, 0.08)' }}
              onClick={() => insertFormatting('**', '**', 'bold text')}
            >
              B
            </Button>
          </Tooltip>
          <Tooltip label="Italic (Ctrl+I)" placement="top">
            <Button
              size="xs"
              variant="ghost"
              fontStyle="italic"
              color="gray.400"
              _hover={{ color: 'white', bg: 'rgba(255, 255, 255, 0.08)' }}
              onClick={() => insertFormatting('*', '*', 'italic text')}
            >
              I
            </Button>
          </Tooltip>
          <Tooltip label="Inline Code" placement="top">
            <Button
              size="xs"
              variant="ghost"
              fontFamily="monospace"
              color="gray.400"
              _hover={{ color: 'white', bg: 'rgba(255, 255, 255, 0.08)' }}
              onClick={() => insertFormatting('`', '`', 'code')}
            >
              &lt;/&gt;
            </Button>
          </Tooltip>
          <Tooltip label="Code Block" placement="top">
            <Button
              size="xs"
              variant="ghost"
              color="gray.400"
              _hover={{ color: 'white', bg: 'rgba(255, 255, 255, 0.08)' }}
              onClick={() =>
                insertFormatting('\n```javascript\n', '\n```\n', '// code here')
              }
            >
              ```
            </Button>
          </Tooltip>

          <Box h="14px" w="1px" bg="rgba(255, 255, 255, 0.12)" mx={1} />

          <Tooltip label="Blockquote" placement="top">
            <Button
              size="xs"
              variant="ghost"
              color="gray.400"
              _hover={{ color: 'white', bg: 'rgba(255, 255, 255, 0.08)' }}
              onClick={() => insertFormatting('\n> ', '\n', 'Quote')}
            >
              &quot;
            </Button>
          </Tooltip>
          <Tooltip label="Bullet List" placement="top">
            <Button
              size="xs"
              variant="ghost"
              color="gray.400"
              _hover={{ color: 'white', bg: 'rgba(255, 255, 255, 0.08)' }}
              onClick={() => insertFormatting('\n- ', '', 'List item')}
            >
              • List
            </Button>
          </Tooltip>
          <Tooltip label="Link" placement="top">
            <Button
              size="xs"
              variant="ghost"
              color="gray.400"
              _hover={{ color: 'white', bg: 'rgba(255, 255, 255, 0.08)' }}
              onClick={() =>
                insertFormatting('[', '](https://example.com)', 'link text')
              }
            >
              Link
            </Button>
          </Tooltip>
          <Tooltip label="Table" placement="top">
            <Button
              size="xs"
              variant="ghost"
              color="gray.400"
              _hover={{ color: 'white', bg: 'rgba(255, 255, 255, 0.08)' }}
              onClick={() =>
                insertFormatting(
                  '\n| Feature | Description |\n| :--- | :--- |\n| Fast | High performance |\n',
                )
              }
            >
              Table
            </Button>
          </Tooltip>
          <Tooltip label="Divider" placement="top">
            <Button
              size="xs"
              variant="ghost"
              color="gray.400"
              _hover={{ color: 'white', bg: 'rgba(255, 255, 255, 0.08)' }}
              onClick={() => insertFormatting('\n---\n')}
            >
              ―
            </Button>
          </Tooltip>
        </HStack>

        {/* Right: Layout Switcher & Stats */}
        <HStack spacing={3} justify={{ base: 'space-between', md: 'flex-end' }}>
          <HStack spacing={2} fontSize="xs" color="gray.400">
            <Text>{stats.words} words</Text>
            <Text>•</Text>
            <Text>{stats.readTime} min read</Text>
          </HStack>

          <HStack
            bg="rgba(255, 255, 255, 0.05)"
            p={0.5}
            borderRadius="8px"
            border="1px solid rgba(255, 255, 255, 0.08)"
            spacing={0.5}
          >
            <Button
              size="xs"
              variant="unstyled"
              px={2}
              py={1}
              height="auto"
              fontSize="xs"
              borderRadius="6px"
              bg={viewMode === 'split' ? 'rgba(168, 85, 247, 0.3)' : 'transparent'}
              color={viewMode === 'split' ? '#c084fc' : 'gray.400'}
              _hover={{ color: 'white' }}
              onClick={() => setViewMode('split')}
            >
              Split
            </Button>
            <Button
              size="xs"
              variant="unstyled"
              px={2}
              py={1}
              height="auto"
              fontSize="xs"
              borderRadius="6px"
              bg={viewMode === 'editor' ? 'rgba(168, 85, 247, 0.3)' : 'transparent'}
              color={viewMode === 'editor' ? '#c084fc' : 'gray.400'}
              _hover={{ color: 'white' }}
              onClick={() => setViewMode('editor')}
            >
              Editor
            </Button>
            <Button
              size="xs"
              variant="unstyled"
              px={2}
              py={1}
              height="auto"
              fontSize="xs"
              borderRadius="6px"
              bg={viewMode === 'preview' ? 'rgba(168, 85, 247, 0.3)' : 'transparent'}
              color={viewMode === 'preview' ? '#c084fc' : 'gray.400'}
              _hover={{ color: 'white' }}
              onClick={() => setViewMode('preview')}
            >
              Preview
            </Button>
          </HStack>
        </HStack>
      </Flex>

      {/* Writing & Preview Split Workspace */}
      <Flex
        w="100%"
        minH={{ base: '600px', lg: '750px' }}
        direction={{ base: 'column', md: 'row' }}
        align="stretch"
      >
        {/* Editor Column */}
        {(viewMode === 'split' || viewMode === 'editor') && (
          <Box
            w={viewMode === 'split' ? { base: '100%', md: '50%' } : '100%'}
            p={4}
            bg="#0a0c13"
            borderRight={
              viewMode === 'split'
                ? { base: 'none', md: '1px solid rgba(255, 255, 255, 0.08)' }
                : 'none'
            }
            borderBottom={{
              base: '1px solid rgba(255, 255, 255, 0.08)',
              md: 'none',
            }}
          >
            <Textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => onChangeContent(e.target.value)}
              placeholder="# Write your article in markdown here..."
              fontFamily="'Space Mono', monospace"
              fontSize="14px"
              lineHeight="1.7"
              color="gray.200"
              bg="transparent"
              border="none"
              resize="none"
              h="100%"
              minH={{ base: '500px', lg: '700px' }}
              p={2}
              _focus={{ boxShadow: 'none', outline: 'none' }}
              sx={{
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  bg: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: '3px',
                },
              }}
            />
          </Box>
        )}

        {/* Live Preview Column */}
        {(viewMode === 'split' || viewMode === 'preview') && (
          <Box
            w={viewMode === 'split' ? { base: '100%', md: '50%' } : '100%'}
            p={6}
            bg="#080910"
            overflowY="auto"
            maxH={{ base: '700px', lg: '800px' }}
            sx={{
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                bg: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '3px',
              },
            }}
          >
            {content ? (
              <MdPreview mdString={content} />
            ) : (
              <Flex
                align="center"
                justify="center"
                h="300px"
                direction="column"
                color="gray.500"
                gap={2}
              >
                <Text fontSize="sm">Markdown preview will appear here</Text>
              </Flex>
            )}
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default MarkdownWorkspace;
