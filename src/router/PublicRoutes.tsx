import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromChildren,
} from 'react-router-dom';
import {
  LazyArticlesScreen,
  LazyHostScreen,
  LazyMainScreen,
} from './lazyScreen';

const publicRouter = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<LazyHostScreen />}>
      <Route path="" element={<LazyMainScreen />} />
      <Route path="articles" element={<LazyArticlesScreen />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>,
  ),
);

export { publicRouter };
