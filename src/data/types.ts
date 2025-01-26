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
