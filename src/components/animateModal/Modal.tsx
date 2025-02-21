import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from './AnimatedModal';
import { Box, Heading } from '@chakra-ui/react';

const AnimatedModal = ({
  title,
  triggerComponent,
  children,
  footer,
}: {
  title: string;
  triggerComponent: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
}) => {
  return (
    <Box className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-white flex justify-center group/modal-btn">
          {triggerComponent}
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
            {children}
          </ModalContent>
          <ModalFooter>{footer}</ModalFooter>
        </ModalBody>
      </Modal>
    </Box>
  );
};

export default AnimatedModal;
