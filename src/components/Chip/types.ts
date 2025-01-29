export enum Skills {
  python = 'python',
  typescript = 'typescript',
  chakra = 'chakra',
  zustand = 'zustand',
  react = 'react',
  node = 'node',
  express = 'express',
  mysql = 'mysql',
  supabase = 'supabase',
  tanstack = 'tanstack',
  i18n = 'i18n',
  git = 'git',
  jest = 'jest',
  html = 'html',
  css = 'css',
  more = 'more',
}

export type ChipProps = {
  size?: 'sm' | 'md';
  type: Skills;
};
