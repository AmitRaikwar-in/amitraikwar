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
  Text,
} from '@chakra-ui/react';
import { useDeleteArticle } from '@services';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';

const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const DeleteArticleButton = ({
  articleKey,
  onDelete,
}: {
  articleKey: string;
  onDelete: () => void;
}) => {
  const { mutate, isPending } = useDeleteArticle() as any;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const [articleKeyValidation, setArticleKeyValidation] = useState<string>('');

  const isConfirmed = articleKeyValidation === articleKey && !isEmpty(articleKey);

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        colorScheme="red"
        leftIcon={<TrashIcon />}
        onClick={onOpen}
        isDisabled={isEmpty(articleKey)}
        borderRadius="full"
        w="100%"
        _hover={{
          bg: 'rgba(239, 68, 68, 0.15)',
        }}
      >
        Delete Article
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay bg="rgba(0, 0, 0, 0.75)" backdropFilter="blur(8px)">
          <AlertDialogContent
            bg="rgba(18, 18, 24, 0.95)"
            color="white"
            border="1px solid rgba(239, 68, 68, 0.3)"
            borderRadius="20px"
            p={2}
          >
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Article
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text color="gray.300" mb={3}>
                Are you sure you want to permanently delete this article? This action cannot be undone.
              </Text>
              <Text fontSize="xs" color="gray.400" mb={2}>
                Type <Text as="span" fontWeight="bold" color="red.300">{articleKey}</Text> to confirm:
              </Text>
              <Input
                placeholder={`Type ${articleKey} to confirm`}
                value={articleKeyValidation}
                onChange={(e) => setArticleKeyValidation(e.target.value)}
                bg="rgba(10, 10, 14, 0.8)"
                border="1px solid rgba(255, 255, 255, 0.15)"
                borderRadius="12px"
                _focus={{
                  borderColor: 'red.400',
                  boxShadow: '0 0 0 1px #f87171',
                }}
              />
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onClose}
                variant="ghost"
                color="gray.400"
                _hover={{ color: 'white' }}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                isLoading={isPending}
                onClick={() => {
                  mutate({ articleKey });
                  onClose();
                  onDelete();
                }}
                isDisabled={!isConfirmed}
                ml={3}
                borderRadius="full"
              >
                Permanently Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteArticleButton;
