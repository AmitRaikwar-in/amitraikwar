import { Box, Button, HStack, Img, Text } from '@chakra-ui/react';
import { AnimatedModal, LinkButton, useCursor, GlassBox } from '@components';
import AmitRaikwarLogo from '@assets/images/AmitRaikwarLogo.png';
import { SearchIcon } from '@assets';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMoveToTop } from '@hooks';
import { BASE_URL_ROUTE } from '@router';
import PingTest from './PingTest';
import Resume from '../mainFlow/contents/Resume';

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
  const moveToTop = useMoveToTop();
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

  if (pathName.startsWith('/projects') || pathName.startsWith('/articles')) {
    return (
      <Box
        position="fixed"
        top={{ base: 4, md: 6 }}
        left={{ base: 4, md: 8 }}
        zIndex={1000}
        p={2.5}
        borderRadius="50%"
        border="1px solid rgba(255, 255, 255, 0.15)"
        boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.37)"
        overflow="hidden"
        cursor="pointer"
        onClick={() => {
          navigate(BASE_URL_ROUTE);
          moveToTop();
        }}
        _hover={{
          transform: 'scale(1.1)',
        }}
        transition="all 0.3s"
      >
        <GlassBox
          width="100%"
          height="100%"
          borderRadius={50}
          borderWidth={0.15}
          blur={4}
          displace={1.2}
          distortionScale={40}
          yChannel="B"
          backgroundOpacity={0.005}
          saturation={1}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: -1,
            pointerEvents: 'none',
          }}
        />
        <Img
          src={AmitRaikwarLogo}
          alt={'logo'}
          w={7}
          _hover={{
            transform: 'scale(1.05)',
            transition: 'transform 0.3s',
          }}
        />
      </Box>
    );
  }

  return (
    <HStack
      position={'fixed'}
      paddingTop={{ base: 2, md: 4, xl: 6 }}
      paddingBottom={4}
      width={'100%'}
      zIndex={1000}
      justifyContent={'center'}
      bg={
        'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%)'
      }
      pointerEvents="none"
    >
      <HStack
        position="relative"
        zIndex={0}
        columnGap={{ base: 1.5, sm: 3, md: 6 }}
        border={'1px solid rgba(255, 255, 255, 0.1)'}
        boxShadow={'0 8px 32px 0 rgba(0, 0, 0, 0.6)'}
        paddingX={{ base: 2, md: 3 }}
        paddingY="0.5"
        borderRadius="24px"
        overflow="hidden"
        alignItems="center"
        justifyContent="space-between"
        pointerEvents="auto"
        width={{ base: '90%', md: '60%' }}
        maxWidth="1400px"
      >
        <GlassBox
          width="100%"
          height="100%"
          borderRadius={24}
          borderWidth={0.15}
          blur={2}
          displace={1}
          distortionScale={40}
          yChannel="B"
          backgroundOpacity={0.005}
          saturation={1}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: -1,
            pointerEvents: 'none',
          }}
        />

        {/* Left: Logo */}
        <Img
          m={1}
          src={AmitRaikwarLogo}
          alt={'logo'}
          w={{ base: 5, md: 7 }}
          onClick={() => {
            navigate(BASE_URL_ROUTE);
            moveToTop();
          }}
          _hover={{
            transform: 'scale(1.2)',
            transition: 'transform 0.3s',
            cursor: 'pointer',
          }}
        />

        {/* Center: Navigation Links */}
        {pathName === BASE_URL_ROUTE && (
          <HStack columnGap={{ base: 1, sm: 2, md: 3 }}>
            {NavigationLink.map(({ name, href }) => (
              <LinkButton
                key={name}
                text={t(name)}
                href={`#${href}`}
                fontSize={{ base: 'xs', sm: 'sm', md: 'lg' }}
                onClick={() => scrollToComponent(href)}
              />
            ))}
            <Box
              position="relative"
              padding={{ base: '0.1', md: '0.2' }}
              border={'1px solid rgba(255, 255, 255, 0.1)'}
              borderRadius="12px"
              overflow="hidden"
            >
              <GlassBox
                width="100%"
                height="100%"
                borderRadius={12}
                borderWidth={0.1}
                blur={2}
                displace={1.2}
                distortionScale={40}
                yChannel="B"
                backgroundOpacity={0.005}
                saturation={1}
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: -1,
                  pointerEvents: 'none',
                }}
              />
              <Button
                key={ArticleLink.name}
                as={Link}
                to={'/' + ArticleLink.href}
                fontSize={{ base: 'xs', sm: 'sm', md: 'lg' }}
                size={{ base: 'xs', sm: 'sm', md: 'md' }}
                color={'white'}
                colorScheme="violet"
                _hover={{
                  transform: 'scale(1.02)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  textDecoration: 'none',
                }}
              >
                {t(ArticleLink.name)}
              </Button>
            </Box>
            <Text
              color={'white'}
              fontSize={{ base: 'xs', sm: 'sm', md: 'lg' }}
              display={{
                base: 'none',
                md: 'block',
              }}
            >
              {'|'}
            </Text>
            <AnimatedModal
              triggerComponent={
                <LinkButton
                  text={t('navigation.resume')}
                  fontSize={{ base: 'xs', sm: 'sm', md: 'lg' }}
                />
              }
              title={t('resume.title')}
              containerClassName="w-[92vw] max-w-[1100px]"
              footer={<Box></Box>}
            >
              <Resume />
            </AnimatedModal>
          </HStack>
        )}

        {/* Right: Search / Private route trigger */}
        <HStack spacing={2} alignItems="center">
          {pathName === BASE_URL_ROUTE + '/privateRoute' && <PingTest />}
          {pathName === BASE_URL_ROUTE && (
            <AnimatedModal
              triggerComponent={
                <Box
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  ref={ref}
                  position="relative"
                  color={'white'}
                  borderRadius="100px"
                  cursor="pointer"
                  p={2}
                  _hover={{
                    transform: 'scale(1.1)',
                  }}
                  transition="all 0.2s"
                >
                  <SearchIcon />
                </Box>
              }
              title="Search"
              footer={<Box></Box>}
            >
              <Box></Box>
            </AnimatedModal>
          )}
        </HStack>
      </HStack>
    </HStack>
  );
};

export default NavigationBar;
