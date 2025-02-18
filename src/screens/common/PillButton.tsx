import { Button } from '@chakra-ui/react';

const PillButton = ({ title }: { title: string }) => {
  return (
    <Button
      size={'sm'}
      borderRadius={'full'}
      px={4}
      colorScheme={'teal'}
      variant={'outline'}
    >
      {title}
    </Button>
  );
};

export default PillButton;
