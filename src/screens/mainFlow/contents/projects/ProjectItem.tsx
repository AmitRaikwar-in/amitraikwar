import {
  GithubIcon,
  PROJECT_NAME_ICON_MAP,
  Redirect,
  StarIcon,
  StarTrekIcon,
} from '@assets';
import {
  HStack,
  VStack,
  Img,
  Heading,
  IconButton,
  Text,
  Link,
  Wrap,
} from '@chakra-ui/react';
import { AnimatedModal, Chip, CardSpotlight } from '@components';
import { ProjectItemType } from '@data';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';

const CustomIconButton = ({
  type = 'github',
  link,
}: {
  type?: 'github' | 'web';
  link: string;
}) => {
  return (
    <IconButton
      variant="outline"
      aria-label={type}
      color={'white'}
      width={10}
      icon={
        type === 'github' ? (
          <GithubIcon width={'2em'} />
        ) : (
          <Redirect width={'2em'} />
        )
      }
      _hover={{ color: 'white' }}
      as={Link}
      href={link}
      isExternal
    />
  );
};

const ProjectItem = ({
  index,
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
  const ref = useRef<HTMLDivElement>(null);
  const height = window.innerHeight;
  console.log(height);
  const base = [0, 1400, 1800, ref.current?.offsetHeight ?? 2209].map(
    (val) => val + height * 0.55 * index,
  );
  const { scrollY } = useScroll({ target: ref });

  const opacity = useTransform(scrollY, base, [0.5, 1, 0, 0]);
  const translateXX = useTransform(scrollY, base, ['0%', '0%', '120%', '200%']);
  const translateX = useTransform(scrollY, base, [
    '0%',
    '0%',
    '-120%',
    '-200%',
  ]);

  return (
    <HStack
      width={'100%'}
      px={32}
      zIndex={1}
      ref={ref}
      position={'sticky'}
      top={'38vh'}
      gap={20}
      overflowX={'hidden'}
    >
      <motion.div
        style={{
          width: '40%',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          translateX: translateX,
          opacity: opacity,
          overflowX: 'hidden',
        }}
      >
        <Carousel
          axis="horizontal"
          dynamicHeight
          showStatus={false}
          emulateTouch
          autoPlay
          showThumbs={false}
          infiniteLoop
          interval={3000}
          showArrows={false}
          showIndicators={false}
          stopOnHover
          width={'100%'}
        >
          {image.map((img) => (
            <Img key={img} src={img} alt={title} loading="lazy" />
          ))}
        </Carousel>
      </motion.div>
      <motion.div
        style={{
          width: '55%',
          translateX: translateXX,
          opacity: opacity,
          overflowX: 'hidden',
        }}
      >
        <CardSpotlight>
          <VStack
            width={'100%'}
            height={'55vh'}
            alignItems={'flex-start'}
            justifyContent={'space-between'}
          >
            <HStack justifyContent={'space-between'} width={'full'}>
              <HStack>
                <Heading size="lg">{title}</Heading>
                {PROJECT_NAME_ICON_MAP[icon]}
              </HStack>
              <HStack spacing={5}>
                <AnimatedModal
                  triggerText={'Demo'}
                  title={title}
                  videoUrl={demoVideo}
                  websiteUrl={link}
                />
                <CustomIconButton type="web" link={link} />
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
      </motion.div>
    </HStack>
  );
};

export default ProjectItem;
