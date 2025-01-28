import { ProjectName } from '@assets/icons/Projects/type';
import { Language } from '@components';

export type ProjectItemType = {
  title: string;
  icon: ProjectName;
  description: string;
  keyPoints: string[];
  githubLink: string;
  link: string;
  tags: Language[];
  image?: [string, string, string];
  demoVideo?: string;
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
