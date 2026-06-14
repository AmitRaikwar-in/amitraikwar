import { Box, Stack } from '@chakra-ui/react';
import { LoadingSpinner, MdPreview } from '@components';
import { useGetArticleData } from '@services';
import { useMemo } from 'react';
import SideViewer from './SideViewer';
import CommentBox from './CommentBox';

const MarkdownViewer = ({ articleKey }: { articleKey: string }) => {
  const { data } = useGetArticleData(articleKey);

  const mdString = useMemo(
    () => (data as any)?.data?.rows?.[0]?.md_data ?? '',
    [data],
  );

  const likes = useMemo(
    () => (data as any)?.data?.rows?.[0]?.likes ?? '',
    [data],
  );

  const views = useMemo(
    () => (data as any)?.data?.rows?.[0]?.views ?? '',
    [data],
  );

  if (!data) {
    return <LoadingSpinner />;
  }

  return (
    <Stack
      direction={{ base: 'column-reverse', md: 'row' }}
      w={'100%'}
      minH={'100vh'}
      color={'white'}
      justifyContent={'start'}
      alignItems={'start'}
      spacing={{ base: 6, md: 8 }}
    >
      <Box width={{ base: '100%', md: '72%' }} id="md-preview-flex-box">
        <MdPreview mdString={mdString ?? ''} />
        <CommentBox articleKey={articleKey} />
      </Box>
      <SideViewer
        mdString={mdString ?? ''}
        likes={likes}
        views={views}
        articleKey={articleKey}
      />
    </Stack>
  );
};

export default MarkdownViewer;
