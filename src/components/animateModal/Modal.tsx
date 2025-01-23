import ReactPlayer from 'react-player';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from './AnimatedModal';
import { Box, Button, Heading } from '@chakra-ui/react';

const AnimatedModal = ({
  triggerText,
  title,
  videoUrl,
  websiteUrl,
}: {
  triggerText: string;
  title: string;
  videoUrl: string;
  websiteUrl: string;
}) => {
  return (
    <Box height={10} className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-white flex justify-center group/modal-btn">
          <Button
            variant="outline"
            colorScheme="white"
            boxShadow={'0 0 10px 2px #ffffff5a'}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
            }}
          >
            {triggerText}
          </Button>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <Heading
              fontSize="xl"
              className="text-center text-white"
              marginBottom={'4'}
            >
              {title}
            </Heading>
            <ReactPlayer
              controls
              progressInterval={1000}
              previewTabIndex={0}
              url={videoUrl}
              style={{
                justifyContent: 'center',
                flex: 1,
                borderRadius: '0.5rem',
              }}
            />
          </ModalContent>
          <ModalFooter>
            <Button
              as="a"
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28"
            >
              Visit website
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </Box>
  );
};

export default AnimatedModal;
