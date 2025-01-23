import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { DotPattern } from '@components';
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
    <Box minH={'100vh'} width={'99vw'} id="contact">
      <Heading
        textAlign={'start'}
        position={'sticky'}
        top={'10vh'}
        paddingX={32}
      >
        {t('contact.title')}
      </Heading>
      <VStack top={'10vh'} position={'sticky'}>
        <DotPattern
          className={
            '[mask-image:radial-gradient(350px_circle_at_center,white,transparent)] h-[90vh] absolute z-0'
          }
        />
      </VStack>
      <VStack w={'100%'} marginTop={'30vh'} align={'start'} spacing={8} px={32}>
        <Text fontSize={'3xl'} width={'50%'}>
          {t('contact.description')}
        </Text>
        <Button
          leftIcon={<EmailIcon />}
          as="a"
          href={`mailto:${CONTACT.email}`}
          variant={'outline'}
          colorScheme={'violet'}
          size={'lg'}
          px={2}
          ref={ref}
        >
          {CONTACT.email}
        </Button>
        <AnimatePresence initial={false}>
          {isContactContainerIntersecting && (
            <motion.div
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
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                bottom: 180,
                right: 150,
                alignItems: 'end',
              }}
            >
              <GetInTouch width={56} height={56} />
              <Text>{t('contact.getInTouch')}</Text>
            </motion.div>
          )}
        </AnimatePresence>
      </VStack>
    </Box>
  );
};

export default Contact;
