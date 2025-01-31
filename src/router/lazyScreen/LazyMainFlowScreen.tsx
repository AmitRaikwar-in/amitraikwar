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

const HiderScreen = lazy(() => import('@screens/hider/Hider'));

export const LazyHiderScreen = () => {
  return (
    <LazyComponentProvider>
      <HiderScreen />
    </LazyComponentProvider>
  );
};
