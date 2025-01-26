import Apple from './Apple';
import Dashwave from './Dashwave';
import Galaxy from './Galaxy';
import Hourcoding from './Hourcoding';
import Telegramonic from './Telegramonic';
import TopAppAi from './TopAppAi';
import { ProjectName } from './type';

const SIZE = 72;

export const PROJECT_NAME_ICON_MAP: Record<ProjectName, JSX.Element> = {
  [ProjectName.Hourcoding]: (
    <Hourcoding width={SIZE} height={SIZE} color="green" />
  ),
  [ProjectName.HourcodingCheatsheet]: (
    <Hourcoding width={SIZE} height={SIZE} color="green" />
  ),
  [ProjectName.HourcodingTools]: (
    <Hourcoding width={SIZE} height={SIZE} color="green" />
  ),
  [ProjectName.HourcodingUI]: (
    <Hourcoding width={SIZE} height={SIZE} color="green" />
  ),
  [ProjectName.HourcodingRoadmap]: (
    <Hourcoding width={SIZE} height={SIZE} color="green" />
  ),
  [ProjectName.HourcodingStalker]: (
    <Hourcoding width={SIZE} height={SIZE} color="green" />
  ),
  [ProjectName.MacOs]: <Apple width={SIZE} height={SIZE} color="white" />,
  [ProjectName.Telegramonic]: <Telegramonic width={SIZE} height={SIZE} />,
  [ProjectName.TopAppAi]: <TopAppAi width={SIZE} height={SIZE} />,
  [ProjectName.Dashwave]: <Dashwave width={SIZE} height={SIZE} />,
  [ProjectName.GalaxyUI]: <Galaxy width={SIZE} height={SIZE} color="white" />,
};
