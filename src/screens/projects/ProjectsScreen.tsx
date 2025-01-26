import { VStack } from '@chakra-ui/react';
import { ProjectsData } from '@data';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ProjectItem } from './components';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useCursor } from '@components';

const Projects = () => {
  const { setCursorType } = useCursor();
  const location = useLocation();
  const secondName = location.pathname.split('/')[2];
  const ref = useRef(null);

  const filteredProjects = ProjectsData.filter((project) =>
    project.icon === secondName ? project : null,
  );

  useEffect(() => {
    setCursorType('splash');
    return () => {
      setCursorType('follow');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VStack
      minH={'100vh'}
      width={'100%'}
      id="projects"
      rowGap={20}
      ref={ref}
      bg={'black'}
      paddingTop={20}
    >
      {filteredProjects.map((project, index) => (
        <ProjectItem key={index} index={index} {...project} />
      ))}
      );
    </VStack>
  );
};

export default Projects;
