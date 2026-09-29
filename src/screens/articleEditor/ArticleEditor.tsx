import { Box, Flex, VStack } from '@chakra-ui/react';
import '@mdxeditor/editor/style.css';
import { useCursor } from '@components';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_NAV_ROUTE } from '@router';
import { ARTICLE_DEFAULT } from './constants';
import { ArticleWithContent } from './types';
import { getRequestObject, isValidArticle } from './utils';
import {
  useAddArticle,
  useGetEditorArticleData,
  useUpdateArticle,
} from '@services';
import {
  EditorHeader,
  MarkdownWorkspace,
  MetadataSection,
  PreloadSection,
  PublishSidebar,
} from './components';

const ArticleEditor = () => {
  const navigate = useNavigate();
  const { setCursorType } = useCursor();

  // Component state
  const [articleKey, setArticleKey] = useState<string>('');
  const [articleType, setArticleType] = useState<'New' | 'Update'>('New');
  const [queryArticleKey, setQueryArticleKey] = useState<string>('');
  const [state, setState] = useState<ArticleWithContent>(ARTICLE_DEFAULT);
  const [isMetadataOpen, setIsMetadataOpen] = useState<boolean>(true);

  // API mutations & query
  const { data, isPending: isQueryPending } = useGetEditorArticleData(queryArticleKey);
  const { mutate: addArticleMutation, isPending: isAdding } = useAddArticle() as any;
  const { mutate: updateArticleMutation, isPending: isUpdating } = useUpdateArticle() as any;

  const isSubmitting = isAdding || isUpdating;

  useLayoutEffect(() => {
    setCursorType('none');
  }, [setCursorType]);

  // Preload populated data into editor state
  useLayoutEffect(() => {
    if (data) {
      const dataFromReq = (data as any)?.data?.rows?.[0];
      if (dataFromReq) {
        let authorName = dataFromReq.author;
        try {
          const parsed = JSON.parse(dataFromReq.author);
          if (parsed && typeof parsed === 'object' && parsed.name) {
            authorName = parsed.name;
          }
        } catch {
          // Author is already a string
        }
        setState({ ...dataFromReq, author: authorName || '' });
        setQueryArticleKey('');
      }
    }
  }, [data]);

  // Handlers
  const onSubmit = useCallback(() => {
    if (articleType === 'New') {
      addArticleMutation(getRequestObject(state));
      return;
    }

    updateArticleMutation(getRequestObject(state));
  }, [addArticleMutation, articleType, state, updateArticleMutation]);

  const onReset = useCallback(() => {
    setState(ARTICLE_DEFAULT);
    setQueryArticleKey('');
    setArticleKey('');
  }, []);

  const onFieldChange = useCallback(
    (field: keyof ArticleWithContent, value: string) => {
      setState((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [],
  );

  const onContentChange = useCallback((value: string) => {
    setState((prev) => ({
      ...prev,
      md_data: value,
    }));
  }, []);

  // Live Statistics
  const stats = useMemo(() => {
    const text = state.md_data || '';
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const lines = text ? text.split('\n').length : 0;
    const readTime = Math.max(1, Math.ceil(words / 200));
    return { words, chars, lines, readTime };
  }, [state.md_data]);

  // Field validation checklist items
  const validationItems = useMemo(
    () => [
      { key: 'article_key', label: 'Slug / Key', filled: Boolean(state.article_key.trim()) },
      { key: 'title', label: 'Title', filled: Boolean(state.title.trim()) },
      { key: 'description', label: 'Description', filled: Boolean(state.description.trim()) },
      { key: 'author', label: 'Author', filled: Boolean(state.author.trim()) },
      { key: 'group_id', label: 'Group ID', filled: Boolean(state.group_id.trim()) },
      { key: 'group_name', label: 'Group Name', filled: Boolean(state.group_name.trim()) },
      { key: 'md_data', label: 'Content', filled: Boolean(state.md_data.trim()) },
    ],
    [state],
  );

  const filledCount = validationItems.filter((i) => i.filled).length;
  const isFormValid = isValidArticle(state);

  return (
    <Box
      minH="100vh"
      w="100%"
      bg="#07080d"
      color="gray.100"
      position="relative"
      overflowX="hidden"
      pb={16}
    >
      {/* Background ambient glow spots */}
      <Box
        position="absolute"
        top="-100px"
        left="15%"
        w="500px"
        h="450px"
        bg="radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)"
        pointerEvents="none"
        filter="blur(50px)"
        zIndex={0}
      />
      <Box
        position="absolute"
        top="300px"
        right="10%"
        w="550px"
        h="500px"
        bg="radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, transparent 70%)"
        pointerEvents="none"
        filter="blur(60px)"
        zIndex={0}
      />

      <Box
        maxW="1800px"
        w="100%"
        mx="auto"
        px={{ base: 4, md: 8, xl: 10 }}
        pt={6}
        position="relative"
        zIndex={1}
      >
        {/* Navigation, Mode Toggle & Actions */}
        <EditorHeader
          articleType={articleType}
          setArticleType={setArticleType}
          isFormValid={isFormValid}
          filledCount={filledCount}
          isSubmitting={isSubmitting}
          onClear={onReset}
          onSubmit={onSubmit}
          onBack={() => navigate(`${BASE_NAV_ROUTE}articles`)}
        />

        {/* Preload Search Card (when in Update mode) */}
        {articleType === 'Update' && (
          <PreloadSection
            articleKey={articleKey}
            setArticleKey={setArticleKey}
            onPreload={(key) => setQueryArticleKey(key)}
            isLoading={isQueryPending}
          />
        )}

        {/* Main 2-Column Workspace Grid */}
        <Flex direction={{ base: 'column', xl: 'row' }} gap={6} align="flex-start">
          {/* Left Column: Metadata & Markdown Workspace */}
          <VStack spacing={6} flex={1} w="100%" align="stretch">
            <MetadataSection
              state={state}
              onChange={onFieldChange}
              isOpen={isMetadataOpen}
              onToggle={() => setIsMetadataOpen((prev) => !prev)}
              isFormValid={isFormValid}
              filledCount={filledCount}
            />

            <MarkdownWorkspace
              content={state.md_data}
              onChangeContent={onContentChange}
              stats={stats}
            />
          </VStack>

          {/* Right Column: Feed Preview & Readiness Checklist */}
          <PublishSidebar
            state={state}
            articleType={articleType}
            isFormValid={isFormValid}
            filledCount={filledCount}
            validationItems={validationItems}
            onReset={onReset}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default ArticleEditor;
