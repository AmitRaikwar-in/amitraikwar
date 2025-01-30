import { Box, Input, VStack } from '@chakra-ui/react';
import { MDXEditor } from '@mdxeditor/editor';
import { ALL_PLUGINS } from './AllPlugins';
import '@mdxeditor/editor/style.css';
import { useCursor } from '@components';
import { useLayoutEffect } from 'react';

const ArticleEditor = () => {
  const { setCursorType } = useCursor();
  useLayoutEffect(() => {
    setCursorType('none');
    return () => {
      setCursorType('follow');
    };
  }, [setCursorType]);
  return (
    <VStack px={10} pt={20} width={'100vw'} rowGap={4} bg={'black'}>
      <Input placeholder="Title" />
      <Input placeholder="Description" />
      <Box
        width={'100%'}
        bg={'black'}
        border={'1px solid white'}
        borderRadius={'md'}
        p={2}
      >
        <MDXEditor
          className="w-full"
          markdown="# Hello world"
          plugins={ALL_PLUGINS}
          spellCheck={true}
          contentEditableClassName="w-[100%] h-96 text-white"
        />
      </Box>
    </VStack>
  );
};

export default ArticleEditor;
