import { motion, useScroll, useTransform } from 'framer-motion';
import { VStack, Wrap } from '@chakra-ui/react';
import { PROJECT_DATA } from '@data';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Card, WavyBackground } from '@components';
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
      <Wrap style={{ zIndex: 0 }} spacing={16} justify="center" mx={24} mb={24}>
        {PROJECT_DATA.map(({ title, tags, icon, description, link }, index) => (
          <Card
            key={index}
            titleText={title}
            centerText=""
            chips={tags}
            icon={icon}
            description={description}
            link={link}
          />
        ))}
      </Wrap>
      );
    </VStack>
  );
};

export default Projects;
