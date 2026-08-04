import { Box } from '@chakra-ui/react';

export interface ResumeAudioPlayerProps {
  audioUrl: string;
  title?: string;
  subtitle?: string;
  fallbackDuration?: string;
}

const ResumeAudioPlayer = ({
  audioUrl,
  title = 'Audio Walkthrough',
}: ResumeAudioPlayerProps) => {
  const isGDrive = audioUrl.includes('drive.google.com');
  const embedSrc = isGDrive
    ? audioUrl.replace(/\/view.*/, '/preview')
    : audioUrl;

  return (
    <Box
      width="100%"
      borderRadius="8px"
      border="1px solid rgba(255, 255, 255, 0.12)"
      boxShadow="0 4px 20px 0 rgba(0, 0, 0, 0.4)"
      bg="rgba(18, 18, 22, 0.85)"
      height={'50px'}
      overflow="hidden"
    >
      <iframe
        src={embedSrc}
        title={title}
        style={{
          width: '100%',
          transform: 'scaleY(0.5)',
          transformOrigin: 'top left',
          zIndex: 1,
        }}
      />
    </Box>
  );
};

export default ResumeAudioPlayer;
