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
import { Carousel } from 'react-responsive-carousel';
import CustomIconButton from './CustomIconButton';

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
  const handleClick = () => {
    const element = document.getElementById('project-images');
    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  return (
    <VStack
      width={'99vw'}
      px={24}
      zIndex={1}
      position={'sticky'}
      top={'15vh'}
      gap={20}
      overflowX={'hidden'}
    >
      <Box
        style={{
          width: '100%',
          overflowX: 'hidden',
        }}
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
                    triggerText={'Demo'}
                    title={title}
                    videoUrl={'../../' + demoVideo}
                    websiteUrl={link}
                  />
                )}
                <CustomIconButton link={link} />
                <CustomIconButton link={githubLink} />
              </HStack>
            </HStack>
            <HStack justify={'flex-start'}>
              <StarTrekIcon width={56} height={56} />
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
      {image ? (
        <Box width={'100%'} id="project-images">
          <Carousel
            axis="horizontal"
            centerMode
            dynamicHeight
            showStatus={false}
            emulateTouch
            autoPlay
            showThumbs={false}
            infiniteLoop
            interval={3000}
            showArrows={false}
            renderIndicator={(clickHandler, isSelected) => (
              <Box
                h={2}
                w={2}
                top={0}
                marginX={1}
                display={'inline-block'}
                bg={isSelected ? 'violet' : 'white'}
                borderRadius={'50%'}
                _hover={{ bg: 'black' }}
                onClick={clickHandler}
              />
            )}
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
        </Box>
      ) : null}
    </VStack>
  );
};

export default ProjectItem;
