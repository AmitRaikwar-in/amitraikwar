import * as React from 'react';
import { LazyComponentProviderProps } from './types';
import { LoadingSpinner } from '@components';

const LazyComponentProvider = (props: LazyComponentProviderProps) => {
  return (
    <React.Suspense fallback={<LoadingSpinner />}>
      {props.children}
    </React.Suspense>
  );
};

export default LazyComponentProvider;
