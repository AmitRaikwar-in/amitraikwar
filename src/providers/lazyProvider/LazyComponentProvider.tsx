import * as React from 'react';
import { LazyComponentProviderProps } from './types';
import { WebsiteLoader } from '@components';

const LazyComponentProvider = (props: LazyComponentProviderProps) => {
  return (
    <React.Suspense fallback={<WebsiteLoader />}>
      {props.children}
    </React.Suspense>
  );
};

export default LazyComponentProvider;
