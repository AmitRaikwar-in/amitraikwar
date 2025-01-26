import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromChildren,
} from 'react-router-dom';
import { LazyHostScreen } from './lazyScreen';
import MainScreen from '../screens/mainFlow/MainScreen';
import ArticlesScreen from '../screens/articles/ArticlesScreen';
import ProjectsScreen from '../screens/projects/ProjectsScreen';

const publicRouter = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<LazyHostScreen />}>
      <Route path="" element={<MainScreen />} />
      <Route path="articles" element={<ArticlesScreen />} />
      <Route path="projects" element={<ProjectsScreen />}>
        <Route path=":id" element={<ProjectsScreen />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>,
  ),
);

export { publicRouter };
