import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResumeAudioPlayer from '../ResumeAudioPlayer';

describe('ResumeAudioPlayer', () => {
  it('should render audio iframe with title attribute for direct audio link', () => {
    render(
      <ResumeAudioPlayer
        audioUrl="/audio/test.mp3"
        title="Test Title"
      />,
    );

    const iframe = screen.getByTitle('Test Title');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', '/audio/test.mp3');
  });

  it('should render Google Drive iframe with preview URL when audioUrl is a GDrive link', () => {
    render(
      <ResumeAudioPlayer
        audioUrl="https://drive.google.com/file/d/1C3Vq5pMbjbdHHq56d8gWpblUjv9RYln-/view?usp=drive_link"
        title="GDrive Audio"
      />,
    );

    const iframe = screen.getByTitle('GDrive Audio');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      'src',
      'https://drive.google.com/file/d/1C3Vq5pMbjbdHHq56d8gWpblUjv9RYln-/preview',
    );
  });
});
