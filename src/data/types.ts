import { ProjectName } from '@assets/icons/Projects/type';
import { Language } from '@components';

export enum Status {
  LIVE = 'Live',
  DEVELOPMENT = 'Development',
  IDEAPHASE = 'Idea Phase',
}

export type ProjectItemType = {
  title: string;
  icon: ProjectName;
  description: string;
  status: Status;
  keyPoints: string[];
  githubLink: string;
  link: string;
  tags: Language[];
  image?: string[];
  demoVideo?: string;
  npmLink?: string;
};

export type WorkItemType = {
  title: string;
  description: string;
  keyPoints: string[];
  links: { title: string; link: string }[];
  tags: string[];
};

export type WorkType = {
  [title: string]: WorkItemType;
};
