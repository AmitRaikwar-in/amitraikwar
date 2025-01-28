import { Language } from '@components';
import { ProjectItemType } from './types';
import { ProjectName } from '@assets';

export const PROJECT_DATA: ProjectItemType[] = [
  {
    title: 'Hourcoding.com',
    icon: ProjectName.Hourcoding,
    description:
      'Developed a website for coding tutorials and programming articles. Currently this website have more than 300 language, framework and library tutorials.',
    githubLink: 'https://www.github.com/onemanfighter/hourcoding-main',
    image: [
      'hourcoding/hourcoding_main1.png',
      'hourcoding/hourcoding_main2.png',
      'hourcoding/hourcoding_main3.png',
    ],
    link: 'https://hourcoding.com',
    tags: [
      Language.react,
      Language.tanstack,
      Language.zustand,
      Language.mysql,
      Language.i18n,
      Language.python,
      Language.typescript,
      Language.chakra,
    ],
    keyPoints: [
      'This website is designed for coding tutorials and programming articles.',
      'It is built with React, Next.js, TypeScript, Chakra UI, and Tailwind CSS.',
      'Currently working on adding more content and improving the design.',
      'Hourcoding.com supports various features like coding tutorials, cheatsheets.',
    ],
    demoVideo: 'hourcoding/hourcoding_main.webm',
  },
  {
    title: 'Mac OS App',
    icon: ProjectName.MacOs,
    description:
      'Developed a web app of the Mac OS desktop using React and Tailwind CSS. This project is inspired by the Mac OS desktop.',
    githubLink: 'https://www.github.com/onemanfighter/mac-os-app',
    image: ['mac/AR_Mac1.png', 'mac/AR_Mac2.png', 'mac/AR_Mac3.png'],
    link: 'https://mac.amitraikwar.in',
    tags: [Language.react, Language.typescript, Language.chakra],
    keyPoints: [
      'This project is inspired by the Mac OS desktop.',
      'It is built with React and Chakra ui.',
      'Currently working on adding more features and improving the design.',
      'Mac OS App supports various features like opening and closing of windows, changing the wallpaper, and more.',
    ],
    demoVideo: 'mac/AR_Mac.webm',
  },
  {
    title: 'Top Apps AI',
    icon: ProjectName.TopAppAi,
    description:
      'A web app for AI enthusiasts to find top AI applications. This app has more than 2000 AI applications listed.',
    githubLink: 'https://www.github.com/onemanfighter/mac-os-app',
    image: ['mac/AR_Mac1.png', 'mac/AR_Mac2.png', 'mac/AR_Mac3.png'],
    link: 'https://topappsai.com',
    tags: [Language.react, Language.typescript, Language.chakra],
    keyPoints: [
      'Top App AI helps you to find top AI applications.',
      'It has more than 2000 AI applications listed.',
      'Top App AI supports various features like searching, filtering, and more.',
    ],
    demoVideo: 'mac/AR_Mac.webm',
  },
  {
    title: 'Telegramonic.com',
    icon: ProjectName.Telegramonic,
    description:
      'Web app for listing telegram channels and groups. This project is built with React, TypeScript, and Chakra UI.',
    githubLink: 'https://www.github.com/onemanfighter/telegramonic',
    image: ['mac/AR_Mac1.png', 'mac/AR_Mac2.png', 'mac/AR_Mac3.png'], // Update
    link: 'https://telegramonic.com',
    tags: [
      Language.react,
      Language.typescript,
      Language.chakra,
      Language.i18n,
      Language.zustand,
      Language.tanstack,
    ],
    keyPoints: [
      'Telegramonic helps you to find telegram channels and groups.',
      'It has more than 3000 telegram channels and groups listed.',
      'Telegramonic supports various features like searching, filtering, and more.',
    ],
    demoVideo: 'mac/AR_Mac.webm', // Update
  },
  {
    title: 'Hourcoding UI Library',
    icon: ProjectName.HourcodingUI,
    description:
      'Developed a UI library for Hourcoding.com and others hourcoding sub-project.',
    githubLink: 'https://www.github.com/onemanfighter/hourcoding-ui',
    link: 'https://www.npmjs.com/package/@hourcoding/hourcoding-ui',
    tags: [
      Language.react,
      Language.tanstack,
      Language.zustand,
      Language.typescript,
      Language.chakra,
    ],
    keyPoints: [
      'This website is designed for coding tutorials and programming articles.',
      'It is built with React, Next.js, TypeScript, Chakra UI, and Tailwind CSS.',
      'Currently working on adding more content and improving the design.',
      'Hourcoding.com supports various features like coding tutorials, cheatsheets.',
    ],
  },
  {
    title: 'Galaxy UI Library',
    icon: ProjectName.GalaxyUI,
    description:
      'Developed a TS UI library having most React UI component and hooks.',
    githubLink: 'https://www.github.com/onemanfighter/hourcoding-ui',
    link: 'https://www.npmjs.com/package/@galaxy_ui/ui',
    tags: [Language.react, Language.typescript, Language.i18n],
    keyPoints: [
      'This website is designed for coding tutorials and programming articles.',
      'It is built with React, Next.js, TypeScript, Chakra UI, and Tailwind CSS.',
    ],
  },
  {
    title: 'Dashwave',
    icon: ProjectName.Dashwave,
    description: 'Management website for life and work.',
    githubLink: 'https://www.github.com/onemanfighter/hourcoding-ui',
    link: 'https://dashwave.amitraikwar.com',
    tags: [
      Language.react,
      Language.typescript,
      Language.i18n,
      Language.supabase,
    ],
    keyPoints: [
      'This website is designed for coding tutorials and programming articles.',
      'It is built with React, Next.js, TypeScript, Chakra UI, and Tailwind CSS.',
    ],
  },
];
