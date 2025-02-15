import { Box, Button, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { MDXEditor } from '@mdxeditor/editor';
import { ALL_PLUGINS } from './AllPlugins';
import '@mdxeditor/editor/style.css';
import { ArticleCard, useCursor } from '@components';
import { useCallback, useLayoutEffect, useState } from 'react';
import { ARTICLE_DEFAULT } from './constants';
import { ArticleWithContent } from './types';
import { getRequestObject, isValidArticle } from './utils';
import { useAddArticle, useGetEditorArticleData } from '@services';
import ArticlePreviewDrawer from './ArticlePreviewDrawar';

const ArticleEditor = () => {
  const { setCursorType } = useCursor();
  const [articleKey, setArticleKey] = useState<string>('');
  const [queryArticleKey, setQueryArticleKey] = useState<string>('');
  const [state, setState] = useState<ArticleWithContent>(ARTICLE_DEFAULT);
  const { data, isPending } = useGetEditorArticleData(queryArticleKey);
  const { mutate } = useAddArticle();

  useLayoutEffect(() => {
    setCursorType('none');
  }, [setCursorType]);

  const onSubmit = useCallback(() => {
    mutate(getRequestObject(state));
    console.log('Submitting article', state);
  }, [mutate, state]);

  useLayoutEffect(() => {
    if (data) {
      console.log('Data', (data as any)?.data.rows[0]);
      console.log('state', state);
      setState((data as any)?.data.rows[0]);
    }
  }, [data, state]);

  return (
    <VStack
      px={10}
      pt={20}
      width={'100vw'}
      rowGap={4}
      bg={'black'}
      color={'gray.100'}
    >
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
              onClick={() => {
                setState(ARTICLE_DEFAULT);
                setQueryArticleKey('');
              }}
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
        <VStack borderLeft={'1px solid gray'} p={1}>
          <HStack>
            <Input
              placeholder="Article Key"
              value={articleKey}
              onChange={(e) => setArticleKey(e.target.value)}
            />
            <Button
              isDisabled={isPending}
              isLoading={isPending}
              onClick={() => setQueryArticleKey(articleKey)}
            >
              Preload
            </Button>
          </HStack>
          <ArticleCard {...state} />
        </VStack>
      </HStack>
      <Box w={'100%'} h={'100%'} borderRadius={'md'}>
        <ArticlePreviewDrawer mdString={state.md_data} />
      </Box>
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
      </HStack>
    </VStack>
  );
};

export default ArticleEditor;
