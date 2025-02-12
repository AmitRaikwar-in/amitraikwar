import { Box, HStack } from '@chakra-ui/react';
import { LoadingSpinner, MdPreview } from '@components';
import { useGetArticleData } from '@services';
import { useMemo } from 'react';
import SideViewer from './SideViewer';
import CommentBox from './CommentBox';

const MarkdownViewer = ({ articleKey }: { articleKey: string }) => {
  const { data } = useGetArticleData(articleKey);

  const mdString = useMemo(
    () => (data as any)?.data?.rows?.[0].md_data,
    [data],
  );

  const comments = useMemo(
    () => (data as any)?.data?.rows?.[0].comments,
    [data],
  );

  if (!data) {
    return <LoadingSpinner />;
  }

  return (
    <HStack
      w={'100%'}
      minH={'100vh'}
      color={'white'}
      justifyContent={'start'}
      alignItems={'start'}
    >
      <Box width={'80%'} id="md-preview-flex-box">
        <MdPreview mdString={mdString ?? ''} />
        <CommentBox comments={comments} />
      </Box>
      <SideViewer mdString={mdString ?? ''} />
    </HStack>
  );
};

export default MarkdownViewer;
