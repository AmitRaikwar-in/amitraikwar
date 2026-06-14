import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';

import { PROJECT_NAME_ICON_MAP, StarIcon, StarTrekIcon } from '@assets';
import {
  HStack,
  VStack,
  Img,
  Heading,
  Text,
  Wrap,
  Box,
  Button,
  Stack,
} from '@chakra-ui/react';
import { AnimatedModal, Chip, CardSpotlight } from '@components';
import { ProjectItemType, Status } from '@data';
import CustomIconButton from './CustomIconButton';
import { useMoveToTop } from '@hooks';
import ReactPlayer from 'react-player';

const ProjectItem = ({
  title,
  icon,
  description,
  keyPoints,
  image,
  githubLink,
  link,
  tags,
  demoVideo,
  npmLink,
  status,
}: ProjectItemType & { index: number }) => {
  const handleClick = useMoveToTop();
  const { scrollY } = useScroll();
  const top = useTransform(scrollY, [300, 1000], [0, 50]);
  const [blur, setBlur] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 700 });
  }, [scrollY]);

  useEffect(() => {
    // Add scroll event listener without using framer-motion
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setBlur(false);
      } else {
        setBlur(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  return (
    <VStack
      width={'100%'}
      px={{ base: 2, md: 8, lg: 24 }}
      zIndex={1}
      position={'sticky'}
      top={'15vh'}
      overflowX={'hidden'}
    >
      {image ? (
        <motion.div
          animate={blur ? 'visible' : 'hidden'}
          variants={{
            hidden: {
              filter: 'blur(5px)',
              opacity: 0.5,
            },
            visible: {
              filter: 'blur(0px)',
              opacity: 1,
            },
          }}
          transition={{ duration: 1 }}
          style={{
            width: '100%',
            position: 'fixed',
            top: top,
          }}
          id="project-images"
        >
          <Carousel
            dynamicHeight={false}
            axis="horizontal"
            showStatus={false}
            emulateTouch
            autoPlay
            showThumbs={false}
            infiniteLoop
            interval={5000}
            showArrows={true}
            showIndicators={false}
            // renderIndicator={(clickHandler, isSelected) => (
            //   <Box
            //     h={2}
            //     w={2}
            //     top={0}
            //     marginX={1}
            //     display={'inline-block'}
            //     bg={isSelected ? 'violet' : 'white'}
            //     borderRadius={'50%'}
            //     _hover={{ bg: 'black' }}
            //     onClick={clickHandler}
            //   />
            // )}
            stopOnHover
            width={'100%'}
          >
            {image.map((img) => (
              <Img
                width={{ base: '90vw', md: '80vh' }}
                maxW="100%"
                key={img}
                src={'../../' + img}
                alt={title}
                loading="lazy"
              />
            ))}
          </Carousel>
        </motion.div>
      ) : null}
      <Box
        style={{
          width: '100%',
          overflowX: 'hidden',
          marginTop: '100vh',
        }}
        my={2}
        shadow={' 0 0 10px 1px #FFFFFFfA'}
      >
        <CardSpotlight>
          <VStack
            width={'100%'}
            height={{ base: 'auto', lg: '80vh' }}
            py={{ base: 6, lg: 0 }}
            alignItems={'flex-start'}
            color={'white'}
            justifyContent={'space-between'}
          >
            <Stack
              direction={{ base: 'column', md: 'row' }}
              justifyContent={'space-between'}
              alignItems={{ base: 'flex-start', md: 'center' }}
              width={'full'}
              spacing={{ base: 4, md: 5 }}
            >
              <HStack spacing={4} alignItems="center" flexWrap="wrap">
                <HStack spacing={2} alignItems="center">
                  <Heading size="lg">{title}</Heading>
                  {PROJECT_NAME_ICON_MAP[icon]}
                </HStack>
                {status && (
                  <HStack
                    spacing={1.5}
                    bg="rgba(255, 255, 255, 0.08)"
                    px={2.5}
                    py={1}
                    borderRadius="full"
                    border="1px solid"
                    borderColor={
                      status === Status.LIVE
                        ? 'rgba(72, 187, 120, 0.4)'
                        : status === Status.DEVELOPMENT
                          ? 'rgba(237, 137, 54, 0.4)'
                          : 'rgba(66, 153, 225, 0.4)'
                    }
                  >
                    <Box
                      w={2}
                      h={2}
                      borderRadius="full"
                      bg={
                        status === Status.LIVE
                          ? 'green.400'
                          : status === Status.DEVELOPMENT
                            ? 'orange.400'
                            : 'blue.400'
                      }
                      className="animate-pulse"
                      style={{
                        boxShadow:
                          status === Status.LIVE
                            ? '0 0 8px #48BB78'
                            : status === Status.DEVELOPMENT
                              ? '0 0 8px #ED8936'
                              : '0 0 8px #4299E1',
                      }}
                    />
                    <Text
                      fontSize="10px"
                      fontWeight="bold"
                      color="white"
                      letterSpacing="wider"
                    >
                      {status.toUpperCase()}
                    </Text>
                  </HStack>
                )}
              </HStack>
              <HStack
                spacing={{ base: 2, md: 5 }}
                flexWrap="wrap"
                width={{ base: 'full', md: 'auto' }}
                justifyContent={{ base: 'flex-start', md: 'flex-end' }}
              >
                {image && (
                  <Button
                    onClick={handleClick}
                    colorScheme="blue"
                    variant={'outline'}
                  >
                    See Images
                  </Button>
                )}
                {demoVideo && (
                  <AnimatedModal
                    title={title}
                    triggerComponent={
                      <Button
                        variant="outline"
                        colorScheme="white"
                        boxShadow={'0 0 10px 2px #ffffff5a'}
                        style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '0.5rem',
                        }}
                      >
                        Demo
                      </Button>
                    }
                    footer={
                      <Button
                        as="a"
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28"
                      >
                        Visit website
                      </Button>
                    }
                  >
                    <ReactPlayer
                      controls
                      progressInterval={1000}
                      previewTabIndex={0}
                      url={'../../' + demoVideo}
                      style={{
                        justifyContent: 'center',
                        flex: 1,
                        borderRadius: '0.5rem',
                      }}
                    />
                  </AnimatedModal>
                )}
                <CustomIconButton link={link} />
                {npmLink && <CustomIconButton link={npmLink} />}
                <CustomIconButton link={githubLink} />
              </HStack>
            </Stack>
            <HStack justify={'start'} alignItems={'start'}>
              <Box display={{ base: 'none', md: 'block' }}>
                <StarTrekIcon width={'72px'} height={'72px'} />
              </Box>
              <Text>{description}</Text>
            </HStack>
            <VStack alignItems={'flex-start'} width={'100%'}>
              {keyPoints.map((point) => (
                <HStack
                  key={point}
                  justify={'flex-start'}
                  alignItems={'flex-start'}
                  paddingStart={3}
                >
                  <StarIcon />
                  <Text key={point}>{point}</Text>
                </HStack>
              ))}
            </VStack>
            <Wrap>
              {tags.map((tag) => (
                <Chip key={tag} type={tag} />
              ))}
            </Wrap>
          </VStack>
        </CardSpotlight>
      </Box>
    </VStack>
  );
};

export default ProjectItem;
