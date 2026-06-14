import { VStack } from '@chakra-ui/react';
import { PROJECT_DATA } from '@data';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ProjectItem } from './components';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useCursor } from '@components';
import { BASE_URL } from '@router';

const Projects = () => {
  const { setCursorType } = useCursor();
  const location = useLocation();
  const name = location.pathname.split('/');

  const projectName = name[1] === BASE_URL ? name[3] : name[2];
  const ref = useRef(null);

  const filteredProjects = PROJECT_DATA.filter((project) =>
    project.icon === projectName ? project : null,
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
    </VStack>
  );
};

export default Projects;
