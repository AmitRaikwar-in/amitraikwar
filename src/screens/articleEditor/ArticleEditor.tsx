import { Box, Button, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { MDXEditor } from '@mdxeditor/editor';
import { ALL_PLUGINS } from './AllPlugins';
import '@mdxeditor/editor/style.css';
import { ArticleCard, MdPreview, useCursor } from '@components';
import { useCallback, useLayoutEffect, useState } from 'react';
import { ARTICLE_DEFAULT } from './constants';
import { ArticleWithContent } from './types';
import { getRequestObject, isValidArticle } from './utils';
import { useAddArticle } from '@services';

const ArticleEditor = () => {
  const { setCursorType } = useCursor();
  const [state, setState] = useState<ArticleWithContent>(ARTICLE_DEFAULT);
  const { mutate } = useAddArticle();

  useLayoutEffect(() => {
    setCursorType('none');
  }, [setCursorType]);

  const onSubmit = useCallback(() => {
    mutate(getRequestObject(state));
    console.log('Submitting article', state);
  }, [mutate, state]);

  return (
    <VStack px={10} pt={20} width={'100vw'} rowGap={4} bg={'black'}>
      <HStack width={'100%'} justifyContent={'space-between'} align={'start'}>
        <VStack w={'80%'} rowGap={4}>
          <HStack w={'100%'} justifyContent={'space-between'}>
            <Text
              fontSize={'3xl'}
              fontWeight={'bold'}
              color={'white'}
              textAlign={'center'}
            >
              Article editor
            </Text>
            <Button
              onClick={() => setState(ARTICLE_DEFAULT)}
              colorScheme={'red'}
            >
              Clear Article
            </Button>
          </HStack>
          <HStack w={'100%'} rowGap={4}>
            <Input
              placeholder="Article Key"
              value={state.article_key}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  article_key: e.target.value,
                }))
              }
            />
            <Input
              placeholder="Article Title"
              value={state.title}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
            <Input
              placeholder="Article description"
              value={state.description}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </HStack>
          <HStack w={'100%'} rowGap={4}>
            <Input
              placeholder="Author"
              value={state.author}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  author: e.target.value,
                }))
              }
            />
            <Input
              placeholder="Group Id"
              value={state.group_id}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  group_id: e.target.value,
                }))
              }
            />
            <Input
              placeholder="Group Name"
              value={state.group_name}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  group_name: e.target.value,
                }))
              }
            />
          </HStack>
          <Input
            placeholder="Image"
            value={state.image}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                image: e.target.value,
              }))
            }
          />
          <Button
            w={'100%'}
            onClick={onSubmit}
            isDisabled={!isValidArticle(state)}
          >
            Submit Article
          </Button>
        </VStack>
        <ArticleCard
          views={0}
          likes={0}
          last_updated={new Date().toISOString()}
          {...state}
        />
      </HStack>
      <HStack
        width={'100%'}
        border={'1px solid white'}
        borderRadius={'md'}
        p={2}
        className=" min-h-[100vh]"
        align={'start'}
      >
        <MDXEditor
          className="bg-white"
          markdown={state.md_data}
          plugins={ALL_PLUGINS}
          spellCheck={true}
          contentEditableClassName="min-h-[100vh] px-6 py-6 prose"
          onChange={(md) => {
            setState((prev) => ({
              ...prev,
              md_data: md,
            }));
          }}
        />
        <Box w={'100%'} h={'100%'} bg={'gray.900'} borderRadius={'md'}>
          <Text
            textAlign={'center'}
            color={'white'}
            fontSize={'2xl'}
            fontWeight={'bold'}
          >
            Preview
          </Text>
          <MdPreview mdString={state.md_data} />
        </Box>
      </HStack>
    </VStack>
  );
};

export default ArticleEditor;
