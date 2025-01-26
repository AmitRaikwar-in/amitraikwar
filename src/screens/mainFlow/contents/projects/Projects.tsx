import { motion, useScroll, useTransform } from 'framer-motion';
import { VStack } from '@chakra-ui/react';
import { ProjectsData } from '@data';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ProjectItem from './ProjectItem';
import { WavyBackground } from '@components';
import HeroText from './HeroText';
import { useRef } from 'react';

const Projects = () => {
  const ref = useRef(null);
  const base = [0, 2300, 2400];
  const { scrollY } = useScroll({ target: ref });
  const heroOpacity = useTransform(
    scrollY,
    base.map((i) => i + 550),
    [1, 1, 0],
  );

  return (
    <VStack minH={'100vh'} width={'99vw'} id="projects" rowGap={20} ref={ref}>
      <HeroText opacity={heroOpacity} />
      <motion.div
        style={{
          zIndex: 0,
          position: 'sticky',
          top: '15vh',
          transform: 'translateY(-10vh)',
          opacity: heroOpacity,
        }}
      >
        <WavyBackground />
      </motion.div>
      <motion.div
        style={{
          position: 'sticky',
          top: '35vh',
          translateY: '-15vh',
        }}
      >
        {ProjectsData.map((project, index) => (
          <ProjectItem key={index} index={index} {...project} />
        ))}
      </motion.div>
      );
    </VStack>
  );
};

export default Projects;
