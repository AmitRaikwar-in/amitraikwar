import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { GlassBox, ResumeAudioPlayer } from '@components';
import { RESUME_DATA } from '@data';
import { useTranslation } from 'react-i18next';

const ExternalLinkIcon = () => (
  <Icon viewBox="0 0 24 24" boxSize={4} fill="currentColor">
    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
  </Icon>
);

const DownloadIcon = () => (
  <Icon viewBox="0 0 24 24" boxSize={4} fill="currentColor">
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
  </Icon>
);

const Resume = () => {
  const { t } = useTranslation();
  const [iframeLoading, setIframeLoading] = useState(true);

  return (
    <VStack
      width="100%"
      spacing={5}
      padding={{ base: 2, md: 4 }}
      align="stretch"
      maxH="80vh"
      overflowY="auto"
      css={{
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(0,0,0,0.2)',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '3px',
        },
      }}
    >
      {/* Audio Walkthrough Header & Player */}
      <VStack align="start" spacing={2} width="100%">
        <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="bold" color="white">
          {t('resume.audioTitle')}
        </Text>
        <Box width="100%">
          <ResumeAudioPlayer
            audioUrl={RESUME_DATA.audioUrl}
            title={t('resume.audioTitle')}
            subtitle={t('resume.audioSubtitle')}
            fallbackDuration={RESUME_DATA.audioDuration}
          />
        </Box>
      </VStack>

      {/* PDF View Header & Actions */}
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        justify="space-between"
        align={{ base: 'start', sm: 'center' }}
        gap={3}
        width="100%"
        pt={1}
      >
        <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="bold" color="white">
          {t('resume.pdfTitle')}
        </Text>

        <HStack spacing={3} wrap="wrap">
          <Button
            as="a"
            href={RESUME_DATA.gdriveViewUrl}
            target="_blank"
            rel="noopener noreferrer"
            rightIcon={<ExternalLinkIcon />}
            variant="outline"
            borderColor="rgba(255, 255, 255, 0.2)"
            color="white"
            size="xs"
            _hover={{
              bg: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'brand.500',
              transform: 'translateY(-2px)',
            }}
            transition="all 0.2s"
          >
            {t('resume.openInDrive')}
          </Button>

          <Button
            as="a"
            href={RESUME_DATA.gdriveDownloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            rightIcon={<DownloadIcon />}
            colorScheme="violet"
            bg="brand.500"
            color="white"
            size="xs"
            _hover={{
              bg: 'violet.600',
              transform: 'translateY(-2px)',
            }}
            transition="all 0.2s"
          >
            {t('resume.downloadPdf')}
          </Button>
        </HStack>
      </Flex>

      {/* Google Drive PDF Embedded Frame */}
      <Box
        position="relative"
        width="100%"
        height={{ base: '520px', md: '680px', lg: '740px' }}
        borderRadius="16px"
        border="1px solid rgba(255, 255, 255, 0.12)"
        boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.5)"
        overflow="hidden"
        bg="rgba(10, 10, 12, 0.9)"
      >
        <GlassBox
          width="100%"
          height="100%"
          borderRadius={16}
          borderWidth={0.15}
          blur={4}
          displace={1.2}
          distortionScale={40}
          yChannel="B"
          backgroundOpacity={0.005}
          saturation={1}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {iframeLoading && (
          <Flex
            position="absolute"
            inset={0}
            zIndex={1}
            align="center"
            justify="center"
            bg="rgba(0, 0, 0, 0.8)"
            direction="column"
            gap={3}
          >
            <Spinner size="lg" color="brand.500" thickness="3px" />
            <Text fontSize="xs" color="gray.400">
              Loading Resume PDF...
            </Text>
          </Flex>
        )}

        <iframe
          src={RESUME_DATA.gdriveViewUrl}
          title="Google Drive Resume Viewer"
          width="100%"
          height="100%"
          style={{ border: 'none', position: 'relative', zIndex: 2 }}
          onLoad={() => setIframeLoading(false)}
        />
      </Box>
    </VStack>
  );
};

export default Resume;
