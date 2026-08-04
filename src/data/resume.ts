export interface ResumeData {
  gdriveViewUrl: string;
  gdriveDownloadUrl: string;
  audioUrl: string;
  audioDuration: string;
  highlights: string[];
}

export const RESUME_DATA: ResumeData = {
  gdriveViewUrl:
    'https://drive.google.com/file/d/1wSTgBKD-me8VoJEKuQ71INGCiCrZK_pY/preview',
  gdriveDownloadUrl:
    'https://drive.google.com/uc?export=download&id=1BojE5ecoNn8y6zFyJphQ5Td59OISDljm',
  audioUrl:
    'https://drive.google.com/file/d/1C3Vq5pMbjbdHHq56d8gWpblUjv9RYln-/preview',
  audioDuration: '9:31',
  highlights: [
    '5+ years of experience in Full-Stack & Mobile Development (React, React Native, TypeScript)',
    'Key achievements at Raja Software Labs',
    'Specialized in Performance Optimization, Custom UI Components, and State Architecture',
  ],
};
