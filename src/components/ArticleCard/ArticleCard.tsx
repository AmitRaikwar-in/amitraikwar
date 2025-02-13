import { Box, HStack, Img, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCursor } from '../Cursor';

type ArticleCardProps = {
  article_key: string;
  title: string;
  image: string;
  description: string;
  group_name: string;
  views: number;
  likes: number;
  last_updated: string;
};

const ArticleCard = ({
  article_key,
  title,
  last_updated,
  image,
  description,
  group_name,
  views,
  likes,
}: ArticleCardProps) => {
  const navigation = useNavigate();
  const { setCursorType } = useCursor();
  useEffect(() => {
    setCursorType('none');
  }, [setCursorType]);

  return (
    <Box
      zIndex={1}
      _hover={{
        transform: 'scale(1.02)',
        cursor: 'pointer',
      }}
      transition={'all 0.4s ease'}
      bg={'rgba(0, 0, 0, 0.4)'}
      backdropFilter={'blur(10px)'}
      padding={4}
      borderRadius={10}
      border={'1px solid gray'}
      width={'300px'}
      color={'white'}
      onClick={() => navigation(article_key)}
    >
      <Text fontSize="2xl" fontWeight="bold" color="brand.900" marginBottom={2}>
        {title}
      </Text>
      <Img src={image} alt={title} h={'200px'} w={'100%'} />
      <HStack justifyContent="space-between">
        <Text
          fontSize="xs"
          fontWeight="500"
          color="brand.500"
          marginTop={2}
          marginBottom={2}
        >
          {new Date(last_updated).toDateString()}
        </Text>
        <HStack>
          <Text>👁️ {views}</Text>
          <Text>📝 0</Text>
          <Text>👍🏻 {likes}</Text>
        </HStack>
      </HStack>
      <Text
        fontSize="xs"
        fontWeight="500"
        color="brand.500"
        border={'1px solid #ffffffa0'}
        borderRadius={10}
        padding={2}
      >
        {group_name}
      </Text>
      <Text fontSize="sm" marginTop={2}>
        {description}
      </Text>
    </Box>
  );
};

export default ArticleCard;
