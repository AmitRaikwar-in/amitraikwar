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
      <Route path="" element={<LazyHiderScreen />} />
      <Route path="version2" element={<LazyHostScreen />}>
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
