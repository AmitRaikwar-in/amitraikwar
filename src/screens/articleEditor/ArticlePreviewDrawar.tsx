import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from '@chakra-ui/react';
import { MdPreview, Noise } from '@components';
import { useRef } from 'react';

const ArticlePreviewDrawer = ({ mdString }: { mdString: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        Preview Article
      </Button>
      <Drawer
        size={'xl'}
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          bg={'black'}
          color={'white'}
          border={'1px solid gray'}
          borderRadius={10}
        >
          <Noise />
          <DrawerCloseButton />
          <DrawerHeader>Article Preview</DrawerHeader>
          <DrawerBody p={0}>
            <MdPreview mdString={mdString} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ArticlePreviewDrawer;
