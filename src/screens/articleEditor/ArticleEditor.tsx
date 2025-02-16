import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Divider,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import '@mdxeditor/editor/style.css';
import { ArticleCard, MdPreview, useCursor } from '@components';
import { useCallback, useLayoutEffect, useState } from 'react';
import { ARTICLE_DEFAULT } from './constants';
import { ArticleWithContent } from './types';
import { getRequestObject, isValidArticle } from './utils';
import {
  useAddArticle,
  useDeleteArticle,
  useGetEditorArticleData,
  useUpdateArticle,
} from '@services';
import React from 'react';
import { isEmpty } from 'lodash';

const DeleteArticleButton = ({
  articleKey,
  onDelete,
}: {
  articleKey: string;
  onDelete: () => void;
}) => {
  const { mutate } = useDeleteArticle();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const [articleKeyValidation, setArticleKeyValidation] = useState<string>('');

  return (
    <>
      <Button
        colorScheme="red"
        onClick={onOpen}
        isDisabled={isEmpty(articleKey)}
      >
        Delete Article
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              {`Are you sure of deleting the article? You can't undo this action afterwards.`}
              <Input
                mt={3}
                placeholder={`Type ${articleKey} to confirm`}
                value={articleKeyValidation}
                onChange={(e) => setArticleKeyValidation(e.target.value)}
              />
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  mutate({ articleKey });
                  onClose();
                  onDelete();
                }}
                isDisabled={articleKeyValidation !== articleKey}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

const ArticleEditor = () => {
  const { setCursorType } = useCursor();
  const [articleKey, setArticleKey] = useState<string>('');
  const [articleType, setArticleType] = useState<'New' | 'Update'>('New');
  const [queryArticleKey, setQueryArticleKey] = useState<string>('');
  const [state, setState] = useState<ArticleWithContent>(ARTICLE_DEFAULT);
  const { data, isPending } = useGetEditorArticleData(queryArticleKey);
  const { mutate: addArticleMutation } = useAddArticle();
  const { mutate: updateArticleMutation } = useUpdateArticle();

  useLayoutEffect(() => {
    setCursorType('none');
  }, [setCursorType]);

  const onSubmit = useCallback(() => {
    console.log('State', articleType);

    if (articleType === 'New') {
      addArticleMutation(getRequestObject(state));
      return;
    }

    updateArticleMutation(getRequestObject(state));
  }, [addArticleMutation, articleType, state, updateArticleMutation]);

  useLayoutEffect(() => {
    if (data) {
      const dataFromReq = (data as any)?.data.rows[0];
      setState({ ...dataFromReq, author: JSON.parse(dataFromReq.author).name });
      setQueryArticleKey('');
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
            <RadioGroup
              value={articleType}
              onChange={(value) => {
                setArticleType(value as 'New' | 'Update');
              }}
            >
              <Radio value="New">New Article</Radio>
              <Radio value="Update">Update Article</Radio>
            </RadioGroup>
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
            {articleType === 'New' ? 'Submit' : 'Update'} Article
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
          <DeleteArticleButton
            articleKey={state.article_key}
            onDelete={() => setState(ARTICLE_DEFAULT)}
          />
          <ArticleCard {...state} />
        </VStack>
      </HStack>
      <Divider />
      <Text fontSize={'xl'} fontWeight={'bold'} color={'white'}>
        Article Content
      </Text>
      <HStack
        width={'100%'}
        height={'100%'}
        border={'1px solid white'}
        borderRadius={'md'}
        p={2}
        className=" min-h-[100vh]"
        align={'start'}
      >
        <Box
          w={'50%'}
          height={'100%'}
          minH={'100vh'}
          borderRight={'1px solid white'}
        >
          <MdPreview mdString={state.md_data} />
        </Box>
        <Textarea
          w={'50%'}
          h={'100%'}
          minH={'100vh'}
          value={state.md_data}
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              md_data: e.target.value,
            }))
          }
        />
      </HStack>
    </VStack>
  );
};

export default ArticleEditor;
