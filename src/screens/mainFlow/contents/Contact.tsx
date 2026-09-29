import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Text,
  Tooltip,
  useClipboard,
  VStack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { DotField } from '@components';
import { CheckIcon, CopyIcon, EmailIcon } from '@assets';
import { CONTACT } from '@data';
import { useRef } from 'react';

const Contact = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLButtonElement>(null);
  const { onCopy, hasCopied } = useClipboard(CONTACT.email);

  return (
    <Box minH={'100vh'} width={'100%'} id="contact">
      <Heading
        textAlign={'start'}
        position={'sticky'}
        top={'10vh'}
        paddingX={{ base: 4, md: 8, lg: 20, xl: 32 }}
      >
        {t('contact.title')}
      </Heading>
      <VStack
        top={'10vh'}
        position={'sticky'}
        h={0}
        w={'full'}
        zIndex={0}
        pointerEvents={'none'}
      >
        <DotField
          style={{
            position: 'absolute',
            width: '100%',
            height: '90vh',
            pointerEvents: 'none',
          }}
        />
      </VStack>
      <VStack
        w={'100%'}
        marginTop={'30vh'}
        align={'start'}
        spacing={8}
        px={{ base: 4, md: 8, lg: 20, xl: 32 }}
      >
        <Text
          fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
          width={{ base: '100%', lg: '60%', xl: '50%' }}
        >
          {t('contact.description')}
        </Text>
        <HStack spacing={3}>
          <Tooltip label={CONTACT.email} hasArrow placement="top">
            <Button
              leftIcon={<EmailIcon />}
              as="a"
              href={`mailto:${CONTACT.email}`}
              variant={'outline'}
              colorScheme={'violet'}
              size={'lg'}
              px={6}
              ref={ref}
            >
              {t('contact.sendEmail')}
            </Button>
          </Tooltip>
          <Tooltip
            label={hasCopied ? t('contact.copied') : t('contact.copyEmail')}
            closeOnClick={false}
            hasArrow
            placement="top"
          >
            <IconButton
              icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
              aria-label="copy email"
              onClick={onCopy}
              variant={'outline'}
              colorScheme={hasCopied ? 'green' : 'violet'}
              size={'lg'}
            />
          </Tooltip>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Contact;
