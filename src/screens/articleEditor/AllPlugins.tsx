import {
  toolbarPlugin,
  KitchenSinkToolbar,
  listsPlugin,
  quotePlugin,
  headingsPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  thematicBreakPlugin,
  frontmatterPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  markdownShortcutPlugin,
  AdmonitionDirectiveDescriptor,
  directivesPlugin,
} from '@mdxeditor/editor';

export const ALL_PLUGINS = [
  toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
  listsPlugin(),
  quotePlugin({
    quoteAutocompleteSuggestions: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
  }),
  headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
  linkPlugin(),
  linkDialogPlugin(),
  imagePlugin({
    imageAutocompleteSuggestions: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
    imageUploadHandler: async () =>
      Promise.resolve('https://picsum.photos/200/300'),
  }),
  tablePlugin(),
  thematicBreakPlugin(),
  frontmatterPlugin(),
  codeBlockPlugin({ defaultCodeBlockLanguage: '' }),
  //   sandpackPlugin({ sandpackConfig: virtuosoSampleSandpackConfig }),
  codeMirrorPlugin({
    codeBlockLanguages: {
      js: 'JavaScript',
      css: 'CSS',
      txt: 'Plain Text',
      tsx: 'TypeScript',
      '': 'Unspecified',
    },
  }),
  directivesPlugin({
    directiveDescriptors: [AdmonitionDirectiveDescriptor],
  }),
  diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo' }),
  markdownShortcutPlugin(),
];
