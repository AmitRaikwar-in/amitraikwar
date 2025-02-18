import { HStack, Text } from '@chakra-ui/react';

export type SortByType = 'none' | 'publishedAt' | 'a-z' | 'z-a';

const SortBy = ({
  sortBy = 'publishedAt',
  setSortBy,
}: {
  sortBy: SortByType;
  setSortBy: (sortBy: SortByType) => void;
}) => {
  return (
    <HStack spacing={0}>
      <Text fontSize={'sm'} fontWeight={'400'} color={'gray.500'} mr={1}>
        Sort By
      </Text>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as SortByType)}
      >
        <option value="none">None</option>
        <option value="publishedAt">Published Date</option>
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
      </select>
    </HStack>
  );
};

export default SortBy;
