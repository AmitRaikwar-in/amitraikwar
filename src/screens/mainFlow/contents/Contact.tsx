import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { DotField } from '@components';
import { EmailIcon, GetInTouch } from '@assets';
import { CONTACT } from '@data';
import { useRef } from 'react';
import { useIsIntersecting } from '@hooks';
import { AnimatePresence, motion } from 'framer-motion';

const Contact = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLButtonElement>(null);

  const isContactContainerIntersecting = useIsIntersecting(ref);
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
      <VStack w={'100%'} marginTop={'30vh'} align={'start'} spacing={8} px={{ base: 4, md: 8, lg: 20, xl: 32 }}>
        <Text fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }} width={{ base: '100%', lg: '60%', xl: '50%' }}>
          {t('contact.description')}
        </Text>
        <Button
          leftIcon={<EmailIcon />}
          as="a"
          href={`mailto:${CONTACT.email}`}
          variant={'outline'}
          colorScheme={'violet'}
          size={'lg'}
          px={4}
          ref={ref}
        >
          {CONTACT.email}
        </Button>
        <AnimatePresence initial={false}>
          {isContactContainerIntersecting && (
            <Box
              display={{ base: 'none', lg: 'flex' }}
              flexDirection="column"
              position="fixed"
              bottom="40vh"
              right={150}
              alignItems="end"
              as={motion.div}
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{
                duration: 0.5,
                ease: [0.04, 0.62, 0.23, 0.98],
              } as any}
            >
              <GetInTouch width={56} height={56} />
              <Text>{t('contact.getInTouch')}</Text>
            </Box>
          )}
        </AnimatePresence>
      </VStack>
    </Box>
  );
};

export default Contact;
