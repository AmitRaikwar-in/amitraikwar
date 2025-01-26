export enum Language {
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
  more = 'more',
}

export type ChipProps = {
  size?: 'sm' | 'md';
  type: Language;
};
