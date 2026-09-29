export interface ResumeData {
  gdriveViewUrl: string;
  gdriveDownloadUrl: string;
  audioUrl: string;
  audioDuration: string;
  highlights: string[];
}

export const RESUME_DATA: ResumeData = {
  gdriveViewUrl:
    'https://drive.google.com/file/d/1LS1xNQA2giDl3JWF9apHLYYTUo4fS07j/preview',
  gdriveDownloadUrl:
    'https://drive.google.com/uc?export=download&id=1LS1xNQA2giDl3JWF9apHLYYTUo4fS07j',
  audioUrl:
    'https://drive.google.com/file/d/1C3Vq5pMbjbdHHq56d8gWpblUjv9RYln-/preview',
  audioDuration: '9:31',
  highlights: [
    '5+ years of experience in Full-Stack & Mobile Development (React, React Native, TypeScript, Java)',
    'Key achievements at Raja Software Labs',
    'Specialized in Performance Optimization, Custom UI Components, and State Architecture',
  ],
};
