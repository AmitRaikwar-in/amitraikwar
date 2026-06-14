import { ProjectName } from '@assets';
import { Language } from '../Chip';
import { Status } from '@data';

export type CardExportProps = {
  centerText?: string;
  titleText?: string;
  icon?: ProjectName;
  subtitleText?: string;
  chips?: Language[];
  link?: string;
  npmLink?: string;
  description?: string;
  status?: Status;
};
