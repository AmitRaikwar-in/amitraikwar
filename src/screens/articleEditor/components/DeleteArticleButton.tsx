import {
  useDisclosure,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  Input,
  AlertDialogFooter,
} from '@chakra-ui/react';
import { useDeleteArticle } from '@services';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';

const DeleteArticleButton = ({
  articleKey,
  onDelete,
}: {
  articleKey: string;
  onDelete: () => void;
}) => {
  const { mutate } = useDeleteArticle();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const [articleKeyValidation, setArticleKeyValidation] = useState<string>('');

  return (
    <>
      <Button
        colorScheme="red"
        onClick={onOpen}
        isDisabled={isEmpty(articleKey)}
      >
        Delete Article
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              {`Are you sure of deleting the article? You can't undo this action afterwards.`}
              <Input
                mt={3}
                placeholder={`Type ${articleKey} to confirm`}
                value={articleKeyValidation}
                onChange={(e) => setArticleKeyValidation(e.target.value)}
              />
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  mutate({ articleKey });
                  onClose();
                  onDelete();
                }}
                isDisabled={articleKeyValidation !== articleKey}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteArticleButton;
