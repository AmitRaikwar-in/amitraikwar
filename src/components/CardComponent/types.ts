import { ProjectName } from '@assets';
import { Language } from '../Chip';

export type CardExportProps = {
  centerText?: string;
  titleText?: string;
  icon?: ProjectName;
  subtitleText?: string;
  chips?: Language[];
  link?: string;
  description?: string;
};
