import {
  Box,
  Heading,
  Input,
  HStack,
  Button,
  VStack,
  Text,
  Avatar,
  Textarea,
  Stack,
  Badge,
} from '@chakra-ui/react';
import { useAddComment, useGetComments } from '@services';
import { useMemo, useState } from 'react';

const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const MessageSquareIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="18"
    height="18"
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

const CommentBox = ({ articleKey }: { articleKey: string }) => {
  const { data } = useGetComments(articleKey);
  const { mutate, isPending } = useAddComment() as any;

  const comments = useMemo(() => (data as any)?.data?.rows ?? [], [data]);

  const [state, setState] = useState<{
    email: string;
    name: string;
    comment: string;
  }>({ email: '', name: '', comment: '' });

  const isDisabled =
    state.email.trim() === '' ||
    state.name.trim() === '' ||
    state.comment.trim() === '' ||
    isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDisabled) return;
    mutate({
      articleKey,
      comment: {
        comment: state.comment,
        email: state.email,
        name: state.name,
      },
    });
    setState({ email: '', name: '', comment: '' });
  };

  return (
    <Box
      w="100%"
      bg="rgba(18, 18, 24, 0.65)"
      backdropFilter="blur(20px)"
      border="1px solid rgba(255, 255, 255, 0.08)"
      borderRadius="24px"
      p={{ base: 5, md: 8 }}
      color="white"
      id="comments"
      mt={10}
      boxShadow="0 12px 32px 0 rgba(0, 0, 0, 0.4)"
    >
      {/* Header */}
      <HStack justifyContent="space-between" alignItems="center" mb={6}>
        <HStack spacing={3} alignItems="center">
          <Box color="#c084fc">
            <MessageSquareIcon />
          </Box>
          <Heading size="md" fontWeight="700" letterSpacing="-0.02em">
            Discussion
          </Heading>
        </HStack>
        <Badge
          colorScheme="purple"
          variant="subtle"
          borderRadius="full"
          px={3}
          py={1}
          fontSize="xs"
        >
          {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
        </Badge>
      </HStack>

      {/* Comment Form */}
      <Box
        as="form"
        onSubmit={handleSubmit}
        mb={8}
        p={5}
        bg="rgba(255, 255, 255, 0.02)"
        border="1px solid rgba(255, 255, 255, 0.06)"
        borderRadius="18px"
      >
        <VStack spacing={4} alignItems="stretch">
          <Stack direction={{ base: 'column', sm: 'row' }} spacing={3}>
            <Input
              placeholder="Your Name"
              value={state.name}
              onChange={(e) =>
                setState((prev) => ({ ...prev, name: e.target.value }))
              }
              bg="rgba(10, 10, 14, 0.7)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              borderRadius="12px"
              fontSize="sm"
              _focus={{
                borderColor: '#c084fc',
                boxShadow: '0 0 0 1px #c084fc',
              }}
              _placeholder={{ color: 'gray.500' }}
            />
            <Input
              type="email"
              placeholder="Your Email (private)"
              value={state.email}
              onChange={(e) =>
                setState((prev) => ({ ...prev, email: e.target.value }))
              }
              bg="rgba(10, 10, 14, 0.7)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              borderRadius="12px"
              fontSize="sm"
              _focus={{
                borderColor: '#c084fc',
                boxShadow: '0 0 0 1px #c084fc',
              }}
              _placeholder={{ color: 'gray.500' }}
            />
          </Stack>

          <Textarea
            placeholder="Share your thoughts or feedback..."
            value={state.comment}
            onChange={(e) =>
              setState((prev) => ({ ...prev, comment: e.target.value }))
            }
            rows={3}
            bg="rgba(10, 10, 14, 0.7)"
            border="1px solid rgba(255, 255, 255, 0.1)"
            borderRadius="12px"
            fontSize="sm"
            _focus={{
              borderColor: '#c084fc',
              boxShadow: '0 0 0 1px #c084fc',
            }}
            _placeholder={{ color: 'gray.500' }}
          />

          <HStack justifyContent="flex-end">
            <Button
              type="submit"
              size="sm"
              colorScheme="purple"
              bg="purple.600"
              color="white"
              rightIcon={<SendIcon />}
              isDisabled={isDisabled}
              isLoading={isPending}
              borderRadius="full"
              px={5}
              _hover={{
                bg: 'purple.500',
                transform: 'scale(1.02)',
              }}
              _active={{
                transform: 'scale(0.98)',
              }}
              transition="all 0.2s"
            >
              Post Comment
            </Button>
          </HStack>
        </VStack>
      </Box>

      {/* Comments List */}
      <VStack spacing={4} align="stretch">
        {comments.length > 0 ? (
          comments.map(
            (
              comment: {
                name: string;
                email: string;
                comment: string;
                date?: string;
                created_at?: string;
              },
              index: number,
            ) => {
              const dateStr = comment.date || comment.created_at;
              const formattedDate = dateStr
                ? (() => {
                    try {
                      const d = new Date(dateStr);
                      return isNaN(d.getTime())
                        ? ''
                        : d.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          });
                    } catch {
                      return '';
                    }
                  })()
                : '';

              return (
                <Box
                  key={index}
                  p={4}
                  bg="rgba(255, 255, 255, 0.02)"
                  border="1px solid rgba(255, 255, 255, 0.06)"
                  borderRadius="16px"
                  transition="all 0.2s ease"
                  _hover={{
                    borderColor: 'rgba(255, 255, 255, 0.12)',
                    bg: 'rgba(255, 255, 255, 0.03)',
                  }}
                >
                  <HStack spacing={3} mb={2} alignItems="center">
                    <Avatar
                      name={comment.name}
                      size="sm"
                      bg="purple.600"
                      color="white"
                      fontWeight="600"
                    />
                    <VStack spacing={0} alignItems="flex-start">
                      <Text fontSize="sm" fontWeight="600" color="white">
                        {comment.name}
                      </Text>
                      {formattedDate && (
                        <Text fontSize="10px" color="gray.400">
                          {formattedDate}
                        </Text>
                      )}
                    </VStack>
                  </HStack>

                  <Text
                    fontSize="sm"
                    color="gray.300"
                    lineHeight="1.6"
                    pl={{ base: 0, sm: 11 }}
                  >
                    {comment.comment}
                  </Text>
                </Box>
              );
            },
          )
        ) : (
          <Box
            py={10}
            textAlign="center"
            border="1px dashed rgba(255, 255, 255, 0.1)"
            borderRadius="16px"
          >
            <Text fontSize="sm" color="gray.400">
              No comments yet. Be the first to share your thoughts!
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default CommentBox;
