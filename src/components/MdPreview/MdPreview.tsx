import { Box } from '@chakra-ui/react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import markdownStyle from './css/Markdown.module.css';
import { MdPreviewProps } from './types';

const MdPreview = ({ mdString }: MdPreviewProps) => {
  return (
    <Box width={'100%'} maxW={'70vw'} data-color-mode={'dark'}>
      <MarkdownPreview className={markdownStyle.markdown} source={mdString} />
    </Box>
  );
};

export default MdPreview;
