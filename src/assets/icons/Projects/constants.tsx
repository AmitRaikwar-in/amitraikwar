import Apple from './Apple';
import Hourcoding from './Hourcoding';
import Telegramonic from './Telegramonic';
import TopAppAi from './TopAppAi';
import { ProjectName } from './type';

const SIZE = 36;

export const PROJECT_NAME_ICON_MAP: Record<ProjectName, JSX.Element> = {
  [ProjectName.Hourcoding]: (
    <Hourcoding width={SIZE} height={SIZE} color="green" />
  ),
  [ProjectName.MacOs]: <Apple width={SIZE} height={SIZE} color="white" />,
  [ProjectName.Telegramonic]: <Telegramonic width={SIZE} height={SIZE} />,
  [ProjectName.TopAppAi]: <TopAppAi width={SIZE} height={SIZE} />,
};
