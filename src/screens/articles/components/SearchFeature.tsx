import { SearchIcon } from '@assets';
import {
  Box,
  CloseButton,
  HStack,
  Input,
  Text,
  VStack,
  Tooltip,
  Badge,
} from '@chakra-ui/react';
import { AnimatedModal, GlassBox } from '@components';
import { BASE_NAV_ROUTE } from '@router';
import {
  resetSearchTextSelector,
  selectSearchText,
  setSearchTextSelector,
} from '@selectors';
import { appStore } from '@store';
import { isEmpty, isEqual, isNil } from 'lodash';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const SearchFeature = ({ data }: { data: any[] }) => {
  const navigate = useNavigate();
  const searchText = appStore(selectSearchText);
  const setSearchText = appStore(setSearchTextSelector);
  const resetSearchText = appStore(resetSearchTextSelector);

  const filteredArticles = (data || []).filter((article: any) =>
    !isNil(searchText) && !isEmpty(searchText.trim())
      ? `${article.title || ''} ${article.description || ''} ${article.group_name || ''}`
          .toLowerCase()
          .includes(searchText.toLowerCase().trim())
      : false,
  );

  return (
    <AnimatedModal
      triggerComponent={
        <Tooltip label="Search articles" placement="top" hasArrow>
          <Box
            position="relative"
            border="1px solid rgba(255, 255, 255, 0.12)"
            color="white"
            borderRadius="full"
            overflow="hidden"
            transition="all 0.3s"
            _hover={{
              borderColor: 'rgba(168, 85, 247, 0.4)',
              transform: 'scale(1.05)',
              cursor: 'pointer',
            }}
            p={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="34px"
            h="34px"
          >
            <GlassBox
              width="100%"
              height="100%"
              borderRadius={100}
              borderWidth={0.02}
              blur={20}
              displace={1}
              backgroundOpacity={0.06}
              saturation={1.5}
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: -1,
                pointerEvents: 'none',
              }}
            />
            <Box w="16px" h="16px" display="flex" alignItems="center" justifyContent="center">
              <SearchIcon />
            </Box>
          </Box>
        </Tooltip>
      }
      title="Search Articles"
      footer={
        <Text fontSize="xs" color="gray.400" textAlign="center" w="100%">
          Search across titles, descriptions, and categories
        </Text>
      }
    >
      <HStack
        color="white"
        w="100%"
        maxW="540px"
        mx="auto"
        spacing={2}
        bg="rgba(10, 10, 14, 0.6)"
        p={1.5}
        borderRadius="16px"
        border="1px solid rgba(255, 255, 255, 0.12)"
        _focusWithin={{
          borderColor: '#c084fc',
          boxShadow: '0 0 0 1px #c084fc',
        }}
      >
        <Box pl={2} color="gray.400" display="flex" alignItems="center">
          <SearchIcon />
        </Box>
        <Input
          variant="unstyled"
          placeholder="Type keywords to search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          color="white"
          fontSize="sm"
          _placeholder={{ color: 'gray.500' }}
        />
        {searchText && (
          <CloseButton
            size="sm"
            onClick={resetSearchText}
            color="gray.400"
            _hover={{ color: 'white' }}
          />
        )}
      </HStack>

      <VStack
        overflow="auto"
        maxHeight="50vh"
        w="100%"
        maxW="540px"
        mx="auto"
        mt={4}
        spacing={2.5}
        align="stretch"
      >
        {Boolean(searchText && searchText.trim() !== '') && filteredArticles.length === 0 && (
          <Box py={8} textAlign="center">
            <Text color="gray.400" fontSize="sm">
              No articles matching &quot;{searchText}&quot;
            </Text>
          </Box>
        )}

        {filteredArticles.map((article: any) => (
          <Box
            key={article.article_key || article.id || article.title}
            p={3.5}
            bg="rgba(255, 255, 255, 0.03)"
            border="1px solid rgba(255, 255, 255, 0.08)"
            borderRadius="14px"
            cursor="pointer"
            transition="all 0.2s ease"
            _hover={{
              bg: 'rgba(168, 85, 247, 0.08)',
              borderColor: 'rgba(168, 85, 247, 0.3)',
              transform: 'translateX(4px)',
            }}
            onClick={() => {
              navigate(`${BASE_NAV_ROUTE}articles/${article.article_key}`);
            }}
          >
            <HStack justifyContent="space-between" alignItems="center">
              <VStack align="flex-start" spacing={1} flex={1} pr={2}>
                <HStack spacing={2}>
                  {article.group_name && (
                    <Badge
                      colorScheme="purple"
                      variant="subtle"
                      fontSize="10px"
                      borderRadius="full"
                      px={2}
                    >
                      {article.group_name}
                    </Badge>
                  )}
                  <Text
                    fontSize="sm"
                    fontWeight="700"
                    color="white"
                    noOfLines={1}
                  >
                    {article.title}
                  </Text>
                </HStack>
                {article.description && (
                  <Text fontSize="xs" color="gray.400" noOfLines={1}>
                    {article.description}
                  </Text>
                )}
              </VStack>
              <Box color="#c084fc" flexShrink={0}>
                <ArrowRightIcon />
              </Box>
            </HStack>
          </Box>
        ))}
      </VStack>
    </AnimatedModal>
  );
};

export default memo(SearchFeature, isEqual);
