import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  HStack,
  Text,
} from '@chakra-ui/react';

const ChevronDownIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ marginLeft: '4px' }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export type SortByType = 'none' | 'publishedAt' | 'a-z' | 'z-a';

const SORT_LABELS: Record<SortByType, string> = {
  none: 'None',
  publishedAt: 'Published Date',
  'a-z': 'A-Z',
  'z-a': 'Z-A',
};

const SortBy = ({
  sortBy = 'publishedAt',
  setSortBy,
}: {
  sortBy: SortByType;
  setSortBy: (sortBy: SortByType) => void;
}) => {
  return (
    <HStack spacing={2} alignItems="center">
      <Text fontSize={'xs'} fontWeight={'500'} color={'gray.500'}>
        Sort By:
      </Text>
      <Menu autoSelect={false}>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          size="xs"
          variant="outline"
          color="white"
          borderColor="rgba(255, 255, 255, 0.2)"
          bg="rgba(255, 255, 255, 0.05)"
          _hover={{
            bg: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(255, 255, 255, 0.4)',
          }}
          _active={{
            bg: 'rgba(255, 255, 255, 0.15)',
          }}
          fontSize="xs"
          fontWeight="500"
          borderRadius="md"
          px={3}
          h="28px"
        >
          {SORT_LABELS[sortBy]}
        </MenuButton>
        <MenuList
          bg="rgba(10, 10, 10, 0.9)"
          borderColor="rgba(255, 255, 255, 0.15)"
          backdropFilter="blur(10px)"
          boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.8)"
          borderRadius="md"
          p={1}
          minW="140px"
          zIndex={20}
        >
          {(Object.keys(SORT_LABELS) as SortByType[]).map((key) => (
            <MenuItem
              key={key}
              onClick={() => setSortBy(key)}
              bg={sortBy === key ? 'rgba(255, 255, 255, 0.1)' : 'transparent'}
              color={sortBy === key ? 'brand.900' : 'white'}
              _hover={{
                bg: 'rgba(255, 255, 255, 0.08)',
                color: 'brand.900',
              }}
              _focus={{
                bg: 'rgba(255, 255, 255, 0.08)',
              }}
              fontSize="xs"
              fontWeight={sortBy === key ? 'bold' : 'normal'}
              borderRadius="sm"
              py={1.5}
              px={3}
            >
              {SORT_LABELS[key]}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default SortBy;
