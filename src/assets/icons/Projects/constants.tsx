import Apple from './Apple';
import AudioMesh from './AudioMesh';
import Galaxy from './Galaxy';
import Hourcoding from './Hourcoding';
import Telegramonic from './Telegramonic';
import WorldOfTech from './WorldOfTech';
import InstaPilot from './InstaPilot';
import TestCov from './TestCov';
import FastDeck from './FastDeck';
import GrowboardIcon from './Growboard';
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
  [ProjectName.Growboard]: <GrowboardIcon width={SIZE} height={SIZE} />,
  [ProjectName.GalaxyUI]: <Galaxy width={SIZE} height={SIZE} color="white" />,
  [ProjectName.TestCov]: <TestCov width={SIZE} height={SIZE} />,
  [ProjectName.AudioMesh]: <AudioMesh width={SIZE} height={SIZE} />,
  [ProjectName.WorldOfTech]: (
    <WorldOfTech width={SIZE} height={SIZE} color="violet" />
  ),
  [ProjectName.InstaPilot]: <InstaPilot width={SIZE} height={SIZE} />,
  [ProjectName.FastDeck]: <FastDeck width={SIZE} height={SIZE} />,
};
