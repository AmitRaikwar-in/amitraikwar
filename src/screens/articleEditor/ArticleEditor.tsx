import { Box, Input, VStack } from '@chakra-ui/react';
import { MDXEditor } from '@mdxeditor/editor';
import { ALL_PLUGINS } from './AllPlugins';
import '@mdxeditor/editor/style.css';
import { useCursor } from '@components';
import { useLayoutEffect } from 'react';

const MD_Example = `
# Hello world
This is a paragraph

- This is a list
- This is another list

\`\`\`js
console.log('Hello world');
\`\`\`

This is a code block

`;

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
      <VStack w={'50%'} rowGap={4}>
        <Input placeholder="Title" />
        <Input placeholder="Subtitle" />
      </VStack>
      <Box
        width={'100%'}
        border={'1px solid white'}
        borderRadius={'md'}
        p={2}
        className=" min-h-[100vh]"
      >
        <MDXEditor
          className="bg-white"
          markdown={MD_Example}
          plugins={ALL_PLUGINS}
          spellCheck={true}
          contentEditableClassName="min-h-[100vh] px-6 py-6 prose"
        />
      </Box>
    </VStack>
  );
};

export default ArticleEditor;
