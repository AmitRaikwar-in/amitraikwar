import { Box, HStack, Img, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

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

  return (
    <Box
      _hover={{
        transform: 'scale(1.02)',
        cursor: 'pointer',
      }}
      transition={'all 0.4s ease'}
      bg={'rgba(0, 0, 0, 0.2)'}
      padding={{ base: 2, md: 4 }}
      borderRadius={10}
      border={'1px solid gray'}
      width={{ base: '100%', sm: '300px' }}
      color={'white'}
      onClick={() => navigation(article_key)}
    >
      <Text
        fontSize={{ base: 'sm', sm: 'lg', md: '2xl' }}
        fontWeight="bold"
        color="brand.900"
        marginBottom={1}
      >
        {title}
      </Text>
      <Img
        src={image}
        alt={title}
        h={{ base: '80px', sm: '150px', md: '200px' }}
        w={'100%'}
        borderRadius={6}
      />
      <HStack justifyContent="space-between" mt={1} mb={1}>
        <Text
          fontSize={{ base: '9px', sm: 'xs' }}
          fontWeight="500"
          color="brand.500"
        >
          {new Date(last_updated).toDateString()}
        </Text>
        <HStack spacing={{ base: 1.5, sm: 2 }}>
          <Text fontSize={{ base: '9px', sm: 'xs' }}>👁️ {views}</Text>
          <Text fontSize={{ base: '9px', sm: 'xs' }}>📝 0</Text>
          <Text fontSize={{ base: '9px', sm: 'xs' }}>👍🏻 {likes}</Text>
        </HStack>
      </HStack>
      <Text
        fontSize={{ base: '9px', sm: 'xs' }}
        fontWeight="500"
        color="brand.500"
        border={'1px solid #ffffffa0'}
        borderRadius={10}
        py={{ base: 0.5, sm: 1 }}
        px={{ base: 1.5, sm: 2 }}
        w="fit-content"
      >
        {group_name}
      </Text>
      <Text fontSize={{ base: '10px', sm: 'xs', md: 'sm' }} marginTop={1.5}>
        {description}
      </Text>
    </Box>
  );
};

export default ArticleCard;
