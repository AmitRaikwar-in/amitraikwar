import { lazy } from 'react';
import { LazyComponentProvider } from '@providers';

const HostScreen = lazy(() => import('@screens/host/Host'));

export const LazyHostScreen = () => {
  return (
    <LazyComponentProvider>
      <HostScreen />
    </LazyComponentProvider>
  );
};

const MainScreen = lazy(() => import('@screens/mainFlow/MainScreen'));

export const LazyMainScreen = () => {
  return (
    <LazyComponentProvider>
      <MainScreen />
    </LazyComponentProvider>
  );
};

const ArticlesScreen = lazy(() => import('@screens/articles/Articles'));

export const LazyArticlesScreen = () => {
  return (
    <LazyComponentProvider>
      <ArticlesScreen />
    </LazyComponentProvider>
  );
};
