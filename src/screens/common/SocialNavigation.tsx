import { GithubIcon, LeetcodeIcon, LinkedInIcon, MediumIcon } from '@assets';
import { IconButton, VStack, Box } from '@chakra-ui/react';
import { useCursor, GlassBox } from '@components';
import { RefObject, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CONTACT } from '@data';
import { AnimatePresence, motion } from 'framer-motion';

const IconProps = {
  variant: 'ghost',
  color: 'white',
  transition: 'transform 0.3s',
  transform: 'scale(1.5)',
  _hover: {
    transform: 'scale(2.2)',
  },
  _active: {
    bg: 'transparent',
  },
};

const MobileIconProps = {
  variant: 'ghost',
  color: 'white',
  transition: 'transform 0.2s',
  _hover: {
    transform: 'scale(1.2)',
  },
  _active: {
    bg: 'transparent',
  },
};

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const SocialNavigation = () => {
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const { setCursorInsets } = useCursor();
  const [isOpen, setIsOpen] = useState(false);

  if (
    location.pathname.startsWith('/projects') ||
    location.pathname.startsWith('/articles')
  ) {
    return null;
  }

  const onMouseEnter =
    (ref: RefObject<HTMLDivElement>, radius: string) => () => {
      const { width, height, top, left } =
        ref.current?.getBoundingClientRect() || {
          width: 56,
          height: 56,
          top: 0,
          left: 0,
        };
      setCursorInsets(undefined);
      setTimeout(() => {
        setCursorInsets({ height, width, top, left, borderRadius: radius });
      }, 0);
    };

  const onMouseLeave = () => {
    setCursorInsets(undefined);
  };

  const SafeAnimatePresence = AnimatePresence as any;

  return (
    <>
      {/* Desktop Version */}
      <VStack
        position={'fixed'}
        top="50%"
        transform="translateY(-50%)"
        right={14}
        rowGap={6}
        zIndex={500}
        display={{ base: 'none', lg: 'flex' }}
      >
        <VStack
          ref={ref}
          position="relative"
          zIndex={0}
          px={2}
          py={5}
          border={'1px solid rgba(255, 255, 255, 0.1)'}
          boxShadow={'0 8px 32px 0 rgba(0, 0, 0, 0.5)'}
          borderRadius={'30px'}
          overflow="hidden"
          onMouseEnter={onMouseEnter(ref, '30px')}
          onMouseLeave={onMouseLeave}
          transition={'background-color 0.3s'}
        >
          <GlassBox
            width="100%"
            height="100%"
            borderRadius={30}
            borderWidth={0.15}
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
          <IconButton
            icon={<GithubIcon />}
            aria-label="github icon"
            as={'a'}
            href={CONTACT.github}
            target={'_blank'}
            {...IconProps}
          />
          <IconButton
            icon={<LinkedInIcon />}
            aria-label="linkedin icon"
            as={'a'}
            href={CONTACT.linkedIn}
            target={'_blank'}
            {...IconProps}
          />
          <IconButton
            icon={<MediumIcon />}
            aria-label="medium icon"
            as={'a'}
            href={CONTACT.medium}
            target={'_blank'}
            {...IconProps}
          />
          <IconButton
            icon={<LeetcodeIcon />}
            aria-label="leetcode icon"
            as={'a'}
            href={CONTACT.leetcode}
            target={'_blank'}
            {...IconProps}
          />
        </VStack>
      </VStack>

      {/* Mobile Menu Version */}
      <Box
        position="fixed"
        bottom={{ base: '20px', md: '30px' }}
        right={{ base: '20px', md: '30px' }}
        zIndex={500}
        display={{ base: 'block', lg: 'none' }}
      >
        <IconButton
          icon={
            <motion.div
              animate={{ rotate: isOpen ? 135 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PlusIcon />
            </motion.div>
          }
          aria-label="social links menu"
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          color="white"
          colorScheme="whiteAlpha"
          borderRadius="full"
          p={3}
          bg="rgba(0, 0, 0, 0.4)"
          boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.37)"
          border="1px solid rgba(255, 255, 255, 0.15)"
          size="md"
          _hover={{
            transform: 'scale(1.1)',
          }}
          transition="all 0.2s"
        />
        <SafeAnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{
                position: 'absolute',
                bottom: '52px',
                right: 0,
                zIndex: 1099,
              }}
            >
              <VStack
                spacing={3}
                p={2}
                borderRadius="20px"
                border="1px solid rgba(255, 255, 255, 0.15)"
                boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.6)"
                overflow="hidden"
                position="relative"
                bg="rgba(0, 0, 0, 0.4)"
              >
                <GlassBox
                  width="100%"
                  height="100%"
                  borderRadius={20}
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
                <IconButton
                  icon={<GithubIcon />}
                  aria-label="github icon"
                  as={'a'}
                  href={CONTACT.github}
                  target={'_blank'}
                  size="sm"
                  {...MobileIconProps}
                />
                <IconButton
                  icon={<LinkedInIcon />}
                  aria-label="linkedin icon"
                  as={'a'}
                  href={CONTACT.linkedIn}
                  target={'_blank'}
                  size="sm"
                  {...MobileIconProps}
                />
                <IconButton
                  icon={<MediumIcon />}
                  aria-label="medium icon"
                  as={'a'}
                  href={CONTACT.medium}
                  target={'_blank'}
                  size="sm"
                  {...MobileIconProps}
                />
                <IconButton
                  icon={<LeetcodeIcon />}
                  aria-label="leetcode icon"
                  as={'a'}
                  href={CONTACT.leetcode}
                  target={'_blank'}
                  size="sm"
                  {...MobileIconProps}
                />
              </VStack>
            </motion.div>
          )}
        </SafeAnimatePresence>
      </Box>
    </>
  );
};

export default SocialNavigation;
