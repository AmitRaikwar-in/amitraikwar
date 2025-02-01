import { Language } from '@components';
import { ProjectItemType } from './types';
import { ProjectName } from '@assets';

export const PROJECT_DATA: ProjectItemType[] = [
  {
    title: 'Hourcoding.com',
    icon: ProjectName.Hourcoding,
    description: `Hourcoding is a responsive web app which hosts various types of coding tutorials, tools, cheatsheets, projects etc. Currently this website has more than 300 language, framework and library tutorials.
Core idea of this project is to build a place on the internet where coders can find everything related to coding like cheat sheets, roadmaps, projects, coding tools, tutorials etc.`,
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
      'Web application hosting more than 300 tutorials for languages, frameworks and library.',
      'Built with React, TypeScript, Chakra UI, and Tailwind CSS, Framer motion.',
      'Features like dark mode, language translation, search, filter, and more.',
      'Categorized tutorials, tools, cheatsheets, projects, and more.',
      'MYSql database for storing data and is being integrated with the backend.',
      'NodeJs backend apis for fetching data and more.',
      'Other feature and sub-domains of this project are still under development.',
    ],
    demoVideo: 'hourcoding/hourcoding_main.webm',
  },
  {
    title: 'Mac OS App',
    icon: ProjectName.MacOs,
    description:
      'A web app that inspired by Mac OS UI built using React, ChakraUi, Tailwind CSS, Zustand. This project was started as a challenge to myself for building something complex and fancy in web development using react.',
    githubLink: 'https://www.github.com/onemanfighter/mac-os-app',
    image: ['mac/AR_Mac1.png', 'mac/AR_Mac2.png', 'mac/AR_Mac3.png'],
    link: 'https://mac.amitraikwar.in',
    tags: [
      Language.react,
      Language.typescript,
      Language.chakra,
      Language.zustand,
      Language.i18n,
    ],
    keyPoints: [
      'This project is inspired by the Mac OS desktop.',
      'Built with React, TypeScript, Chakra UI, Zustand, i18n and Tailwind CSS.',
      'Mac OS App supports various features like opening and closing of windows, changing the wallpaper, and more.',
      'Password protected lock screen, draggable multi windows, shutdown, and restart options.',
      'This is an ongoing project and more features are being added regularly.',
    ],
    demoVideo: 'mac/AR_Mac.webm',
  },
  {
    title: 'Top Apps AI',
    icon: ProjectName.TopAppAi,
    description:
      'Web app for AI enthusiasts to find top AI applications and agents on the internet. This app has more than 2000 AI applications listed and various features like listing new AI, search engines.',
    githubLink: 'https://www.github.com/onemanfighter/mac-os-app',
    image: ['mac/AR_Mac1.png', 'mac/AR_Mac2.png', 'mac/AR_Mac3.png'],
    link: 'https://topappsai.com',
    tags: [Language.react, Language.typescript, Language.chakra],
    keyPoints: [
      'Top App AI helps you to find top AI applications available in the market.',
      'It has more than 2000 AI applications listed.',
      'Top App AI supports various features like searching, filtering, and news letters.',
    ],
    demoVideo: 'mac/AR_Mac.webm',
  },
  {
    title: 'Telegramonic.com',
    icon: ProjectName.Telegramonic,
    description:
      'Web app for listing telegram channels, groups, bots, stickers, etc. This app has more than 3000 telegram channels and groups listed and was started to implement the idea of listing most popular telegram related information.',
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
      'Telegramonic helps you to find telegram channels, groups, bots, stickers, games etc.',
      'It has more than 3000 telegram channels and groups listed.',
      'Telegramonic supports various features like fuzzy searching, filtering, categories, and Social sharing. ',
      'Currently working on adding more content and improving the design.',
    ],
    demoVideo: 'mac/AR_Mac.webm', // Update
  },
  {
    title: 'Hourcoding UI Library',
    icon: ProjectName.HourcodingUI,
    description: `Developed a react typescript UI library for Hourcoding.com and its subdomain projects. This is currently hosted on NPM and is being used in various projects.
This library has most of the UI components and hooks required for building hourcoding.com and its subdomains.`,
    githubLink: 'https://www.github.com/onemanfighter/hourcoding-ui',
    link: 'https://www.npmjs.com/package/@hourcoding/hourcoding-ui',
    tags: [
      Language.react,
      Language.zustand,
      Language.typescript,
      Language.chakra,
    ],
    keyPoints: [
      'It is built with React, Next.js, TypeScript, Chakra UI, and Tailwind CSS.',
      'It has various type of UI components and hooks required in the web app.',
      'Components like infinite carousels, modals, tabs, accordions, buttons, typography, and design system themes.',
      'This library is used in various projects and is being updated regularly.',
    ],
  },
  {
    title: 'Galaxy UI Library',
    icon: ProjectName.GalaxyUI,
    description:
      'React typescript UI library for building web apps. Idea is to create a very fancy web application using this library. This library is currently hosted on NPM and is updated with new components and features regularly.',
    githubLink: 'https://www.github.com/onemanfighter/hourcoding-ui',
    link: 'https://www.npmjs.com/package/@galaxy_ui/ui',
    tags: [Language.react, Language.typescript, Language.i18n],
    keyPoints: [
      'This website is designed for coding tutorials and programming articles.',
      'It is built with React, Next.js, TypeScript, Chakra UI, and Tailwind CSS.',
      'Utility hooks that facilitate the development of web applications.',
      'Currently hosted on NPM and is being updated with new components and features regularly.',
    ],
  },
  {
    title: 'Dashwave',
    icon: ProjectName.Dashwave,
    description: `A web app for managing stuffs in life like study, projects, expenses, secrets, passwords, writing journals, etc. A web app for managing stuff in life like study, projects, expenses, secrets, passwords, writing journals etc. 
      This project was started with a idea to manage everything at one place without maintaining something overwhelming or complicated.`,
    githubLink: 'https://www.github.com/onemanfighter/hourcoding-ui',
    link: 'https://dashwave.amitraikwar.com',
    tags: [
      Language.react,
      Language.typescript,
      Language.i18n,
      Language.supabase,
    ],
    keyPoints: [
      'Compatible with all devices and has a responsive design.',
      'Built with React, TypeScript, Chakra UI, and Tailwind CSS.',
      'Feature like project management, expense management, password management, journal writing, and more.',
      'This project is still under development and more features are being added regularly.',
    ],
  },
];
