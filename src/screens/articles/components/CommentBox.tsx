import {
  Box,
  Heading,
  Divider,
  Input,
  HStack,
  Button,
  VStack,
  Text,
  Avatar,
  Textarea,
  Stack,
} from '@chakra-ui/react';
import { useAddComment, useGetComments } from '@services';
import { useMemo, useState } from 'react';

const CommentBox = ({ articleKey }: { articleKey: string }) => {
  const { data } = useGetComments(articleKey);
  const { mutate } = useAddComment();

  const comments = useMemo(() => (data as any)?.data?.rows, [data]);

  const [state, setState] = useState<{
    email: string;
    name: string;
    comment: string;
  }>({ email: '', name: '', comment: '' });

  const isDisabled =
    state.email === '' || state.name === '' || state.comment === '';

  const handleSubmit = () => {
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
      w={'100%'}
      h={'100%'}
      bg={'gray.900'}
      borderRadius={'md'}
      p={4}
      color={'white'}
      id="comments"
    >
      <Heading size={'md'}>Comments</Heading>
      <Divider />
      {comments ? (
        comments?.map(
          (
            comment: {
              name: string;
              email: string;
              comment: string;
              date: string;
            },
            index: number,
          ) => (
            <VStack
              key={index}
              p={2}
              borderRadius={'lg'}
              mt={4}
              bg={'gray.800'}
              rowGap={2}
            >
              <Box
                w={'100%'}
                p={1}
                border={'1px solid gray'}
                borderRadius={'md'}
              >
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  w={'100%'}
                  justifyContent={'space-between'}
                  alignItems={{ base: 'flex-start', sm: 'center' }}
                  p={2}
                  border={'1px solid gray'}
                  borderRadius={'md'}
                  borderStyle={'dashed'}
                  mb={2}
                  spacing={2}
                >
                  <HStack flexWrap="wrap">
                    <Avatar name={comment.name} size={'sm'} bg="teal.500" />
                    <Heading size={'xs'} verticalAlign={'middle'}>
                      {comment.name}{' '}
                      <Text
                        as="span"
                        fontSize="xs"
                        color="gray.400"
                        fontWeight="normal"
                      >
                        📫 {comment.email}
                      </Text>
                    </Heading>
                  </HStack>
                  <Text
                    as={'span'}
                    fontSize={'xs'}
                    color={'gray.400'}
                    fontWeight={'normal'}
                  >
                    {new Date(comment.date).toDateString()}
                  </Text>
                </Stack>
                <Box
                  w={'100%'}
                  paddingStart={2}
                  fontSize={'md'}
                  color={'gray.300'}
                >
                  {comment.comment}
                </Box>
              </Box>
            </VStack>
          ),
        )
      ) : (
        <Text alignSelf={'start'} color={'gray.500'} p={4}>
          No Comments
        </Text>
      )}
      <VStack p={4} borderRadius={'md'} mt={4} rowGap={3}>
        <Divider />
        <Text alignSelf={'start'}>Add a Comment</Text>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          w={'100%'}
          alignItems="center"
        >
          <Avatar size="sm" bg="gray.500" name={state.name} />
          <Input
            type="text"
            placeholder="Enter Name"
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
          />
          <Input
            type="email"
            placeholder="Enter email"
            value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
          />
        </Stack>
        <Textarea
          placeholder="Add a comment"
          value={state.comment}
          onChange={(e) => setState({ ...state, comment: e.target.value })}
        />
        <Button
          alignSelf={'start'}
          isDisabled={isDisabled}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </VStack>
    </Box>
  );
};

export default CommentBox;
