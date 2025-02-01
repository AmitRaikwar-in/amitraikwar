import isEmpty from 'lodash/isEmpty';
import {
  Navigate,
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromChildren,
} from 'react-router-dom';
import { LazyHiderScreen, LazyHostScreen } from './lazyScreen';
import MainScreen from '../screens/mainFlow/MainScreen';
import ArticlesScreen from '../screens/articles/ArticlesScreen';
import ProjectsScreen from '../screens/projects/ProjectsScreen';
import ArticleEditor from '@screens/articleEditor/ArticleEditor';

export const BASE_URL = 'secret_path';
export const BASE_URL_ROUTE = isEmpty(BASE_URL) ? '/' : `/${BASE_URL}`;
export const BASE_NAV_ROUTE = isEmpty(BASE_URL) ? '/' : `/${BASE_URL}/`;

const publicRouter = createBrowserRouter(
  createRoutesFromChildren(
    <Route
      path=""
      element={
        <>
          <Outlet />
        </>
      }
    >
      {!isEmpty(BASE_URL) && <Route path="" element={<LazyHiderScreen />} />}
      <Route path={BASE_URL} element={<LazyHostScreen />}>
        <Route path="" element={<MainScreen />} />
        <Route path="articles" element={<ArticlesScreen />} />
        <Route path="privateRoute" element={<ArticleEditor />} />
        <Route path="projects" element={<ProjectsScreen />}>
          <Route path=":id" element={<ProjectsScreen />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Route>,
  ),
);

export { publicRouter };
