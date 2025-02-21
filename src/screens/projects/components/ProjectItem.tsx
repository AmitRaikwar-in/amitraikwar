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
} from '@chakra-ui/react';
import { AnimatedModal, Chip, CardSpotlight } from '@components';
import { ProjectItemType } from '@data';
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
      width={'99vw'}
      px={24}
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
                width={'80vh'}
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
            height={'80vh'}
            alignItems={'flex-start'}
            color={'white'}
            justifyContent={'space-between'}
          >
            <HStack justifyContent={'space-between'} width={'full'}>
              <HStack>
                <Heading size="lg">{title}</Heading>
                {PROJECT_NAME_ICON_MAP[icon]}
              </HStack>
              <HStack spacing={5}>
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
                <CustomIconButton link={githubLink} />
              </HStack>
            </HStack>
            <HStack justify={'start'} alignItems={'start'}>
              <StarTrekIcon width={'72px'} height={'72px'} />
              <Text>{description}</Text>
            </HStack>
            <VStack alignItems={'flex-start'} width={'100%'}>
              {keyPoints.map((point) => (
                <HStack key={point} justify={'flex-start'} paddingStart={3}>
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
