import { motion } from 'framer-motion';
import { Box, VStack, SimpleGrid } from '@chakra-ui/react';
import { PROJECT_DATA } from '@data';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Card, LightPillar } from '@components';
import HeroText from './HeroText';
import { useRef } from 'react';

const Projects = () => {
  const ref = useRef(null);

  return (
    <VStack
      minH={'100vh'}
      width={'100%'}
      id="projects"
      rowGap={20}
      ref={ref}
      pos="relative"
    >
      <HeroText />
      <motion.div
        style={{
          position: 'absolute',
          top: '-30vh',
          width: '100%',
          height: '80vh',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <LightPillar
          topColor="#5227ff"
          bottomColor="#ff9ffc"
          intensity={2}
          rotationSpeed={1.3}
          glowAmount={0.003}
          pillarWidth={3}
          pillarHeight={1.0}
          noiseIntensity={0.6}
          pillarRotation={90}
          interactive={false}
          mixBlendMode="screen"
          quality="medium"
        />
      </motion.div>
      <Box style={{ height: '40vh', width: '100%' }} />
      <SimpleGrid
        columns={{ base: 2, md: 4, lg: 4 }}
        spacing={8}
        justifyItems="center"
        mx={{ base: 4, md: 8, lg: 20 }}
        mb={{ base: 8, md: 24 }}
        transform={{
          base: 'translateY(-20vh)',
          md: 'translateY(-35vh)',
          lg: 'translateY(-50vh)',
        }}
        marginBottom={{ base: '-10vh', md: '-20vh', lg: '-30vh' }}
        style={{ zIndex: 1, position: 'relative' }}
      >
        {PROJECT_DATA.map(
          (
            { title, tags, icon, description, link, npmLink, status },
            index,
          ) => (
            <Card
              key={index}
              titleText={title}
              chips={tags}
              icon={icon}
              description={description.split('\n').slice(0, 1).join('\n')}
              link={link}
              npmLink={npmLink}
              status={status}
            />
          ),
        )}
      </SimpleGrid>
    </VStack>
  );
};

export default Projects;
