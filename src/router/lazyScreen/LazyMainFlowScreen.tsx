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
