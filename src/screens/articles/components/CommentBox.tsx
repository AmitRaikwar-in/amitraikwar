import {
  Box,
  Heading,
  Divider,
  Input,
  HStack,
  Button,
  VStack,
  Text,
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
            comment: { name: string; email: string; comment: string },
            index: number,
          ) => (
            <Box
              key={index}
              p={2}
              px={4}
              borderRadius={'md'}
              mt={4}
              bg={'gray.800'}
            >
              <Heading size={'md'}>
                🤖{comment.name} 📫{comment.email}
              </Heading>
              <Box paddingStart={2}>⎆ {comment.comment}</Box>
            </Box>
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
        <HStack columnGap={4} w={'100%'}>
          <Input
            type="text"
            placeholder="Enter email"
            value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
          />
          <Input
            type="text"
            placeholder="Enter Name"
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
          />
        </HStack>
        <Input
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
