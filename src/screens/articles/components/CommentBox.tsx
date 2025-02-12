import {
  Box,
  Heading,
  Divider,
  Input,
  HStack,
  Button,
  VStack,
} from '@chakra-ui/react';

const CommentBox = ({
  comments,
}: {
  comments: { comment: string; user: string; email: string }[];
}) => {
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
      {comments?.map((comment, index) => (
        <Box key={index} p={2}>
          <Heading size={'sm'}>{comment.user}</Heading>
          <Box>{comment.comment}</Box>
        </Box>
      ))}
      <VStack p={4} borderRadius={'md'} mt={4} rowGap={5}>
        <HStack columnGap={4} w={'100%'}>
          <Input type="text" placeholder="Enter email" />
          <Input type="text" placeholder="Enter Name" />
        </HStack>
        <Input placeholder="Add a comment" />
        <Button alignSelf={'start'}>Submit</Button>
      </VStack>
    </Box>
  );
};

export default CommentBox;
