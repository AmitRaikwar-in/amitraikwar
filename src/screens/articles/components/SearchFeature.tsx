import { ArrowIcon, SearchIcon } from '@assets';
import {
  Box,
  CloseButton,
  HStack,
  IconButton,
  Input,
  Text,
  VStack,
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

const SearchFeature = ({ data }: { data: any }) => {
  const searchText = appStore(selectSearchText);
  const setSearchText = appStore(setSearchTextSelector);
  const resetSearchText = appStore(resetSearchTextSelector);

  const filteredArticle = data.filter((article: any) =>
    !isNil(searchText) && !isEmpty(searchText)
      ? ((article.title + article.description) as string).includes(searchText)
      : false,
  );

  return (
    <AnimatedModal
      triggerComponent={
        <Box
          position="relative"
          border={'1px solid gray'}
          padding="2.5"
          color={'white'}
          borderRadius="100px"
          overflow="hidden"
          transition={'all 0.3s'}
          _hover={{
            transform: 'scale(1.1)',
            cursor: 'pointer',
          }}
          p={2}
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
          <SearchIcon />
        </Box>
      }
      title="Search"
      footer={
        <Box color={'gray'}>Search for articles by title or description</Box>
      }
    >
      <HStack
        color={'white'}
        w={'90%'}
        justifyContent="center"
        alignItems="center"
      >
        <Input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <CloseButton onClick={resetSearchText} bg={'red'} />
      </HStack>
      <VStack overflow={'auto'} maxHeight={'40vh'} w={'100%'} mt={10}>
        {filteredArticle.map((article: any) => (
          <HStack
            w={'70%'}
            key={article.title}
            padding={1}
            border={'1px solid gray'}
            m={1}
            px={10}
            color={'white'}
            justifyContent={'space-between'}
          >
            <Text
              fontSize="lg"
              fontWeight="bold"
              color="brand.900"
              marginBottom={2}
            >
              {article.title}
            </Text>
            <IconButton
              ml={4}
              variant={'outline'}
              colorScheme="white"
              size={'sm'}
              aria-label="Search database"
              icon={<ArrowIcon />}
              _hover={{
                transform: 'scale(1.1)',
              }}
              as={'a'}
              href={BASE_NAV_ROUTE + 'articles/' + article.article_key}
              target={'_blank'}
              rel={'noopener noreferrer'}
            />
          </HStack>
        ))}
      </VStack>
    </AnimatedModal>
  );
};

export default memo(SearchFeature, isEqual);
