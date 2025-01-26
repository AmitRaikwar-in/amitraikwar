import { Box, HStack, Img, Kbd } from '@chakra-ui/react';
import { LinkButton, useCursor } from '@components';
import AmitRaikwarLogo from '@assets/images/AmitRaikwarLogo.png';
import { SearchIcon } from '@assets';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

const NavigationLink = [
  {
    name: 'navigation.projects',
    href: 'projects',
  },
  {
    name: 'navigation.work',
    href: 'work',
  },
  {
    name: 'navigation.about',
    href: 'about',
  },
  {
    name: 'navigation.contact',
    href: 'contact',
  },
];

const ArticleLink = {
  name: 'navigation.articles',
  href: 'articles',
};

const NavigationBar = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const { setCursorInsets } = useCursor();

  const onMouseEnter = () => {
    const { width, height, top, left } =
      ref.current?.getBoundingClientRect() || {
        width: 56,
        height: 56,
        top: 0,
        left: 0,
      };
    setCursorInsets(undefined);
    setTimeout(() => {
      setCursorInsets({ height, width, top, left, borderRadius: '50%' });
    }, 0);
  };

  const onMouseLeave = () => {
    setCursorInsets(undefined);
  };

  const scrollToComponent = (target: string) => {
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <HStack
      position={'fixed'}
      marginY={{ md: 2, xl: 4 }}
      width={'100%'}
      paddingRight={14}
      paddingLeft={{ base: 14, '2xl': 32 }}
      zIndex={1}
      justifyContent={'space-between'}
    >
      <Img
        src={AmitRaikwarLogo}
        alt={'logo'}
        w={8}
        onClick={() => navigate('/')}
        _hover={{
          transform: 'scale(1.3)',
          transition: 'transform 0.5s',
          cursor: 'pointer',
        }}
      />
      <HStack
        zIndex={1000}
        columnGap={3}
        top={6}
        border={'1px solid gray'}
        padding="2"
        borderRadius="100px"
        bg={'rgba(255, 255, 255, 0.1)'}
        backdropFilter={'blur(20px)'}
        transition={'background-color 0.3s'}
        display={pathName !== '/' ? 'none' : 'flex'}
      >
        {NavigationLink.map(({ name, href }) => (
          <LinkButton
            key={name}
            text={t(name)}
            href={`#${href}`}
            fontSize={'lg'}
            animationOnHover
            onClick={() => scrollToComponent(href)}
          />
        ))}
        <Box
          padding="0.2"
          borderRadius="100px"
          bg={'rgba(255, 255, 255, 0.1)'}
          backdropFilter={'blur(20px)'}
          transition={'background-color 0.3s'}
        >
          <LinkButton
            key={ArticleLink.name}
            text={t(ArticleLink.name)}
            href={ArticleLink.href}
            fontSize={'lg'}
            animationOnHover
          />
        </Box>
      </HStack>
      <HStack
        border={'1px solid gray'}
        padding="2.5"
        color={'white'}
        borderRadius="100px"
        bg={'rgba(255, 255, 255, 0.1)'}
        backdropFilter={'blur(20px)'}
        transition={'all 0.3s'}
        _hover={{
          transform: 'scale(1.1)',
          cursor: 'pointer',
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={ref}
        onClick={() => {}} // eslint-disable-line
      >
        <SearchIcon />
      </HStack>
    </HStack>
  );
};

export default NavigationBar;
