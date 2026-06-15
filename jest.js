import '@localization/config';

jest.useFakeTimers();

jest.mock('zustand');

jest.mock('@tsparticles/react', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

jest.mock('@tsparticles/slim', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

// Mock font @fontsource/space-mono
jest.mock('@fontsource/space-mono', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

// React markdown preview mock.
jest.mock('@uiw/react-markdown-preview', () => ({
  __esModule: true,
  default: 'markdown-preview',
}));

// Mock ogl
jest.mock('ogl', () => ({
  Renderer: jest.fn().mockImplementation(() => ({
    gl: {
      canvas: document.createElement('canvas'),
      getExtension: jest.fn(),
    },
    setSize: jest.fn(),
    render: jest.fn(),
  })),
  Program: jest.fn(),
  Triangle: jest.fn(),
  Mesh: jest.fn(),
}));


