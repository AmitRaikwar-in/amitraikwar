import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LocalizationProvider from '../../../../providers/localizationProvider/LocalizationProvider';
import Resume from '../Resume';

describe('Resume Screen Component', () => {
  beforeEach(() => {
    window.HTMLMediaElement.prototype.play = jest.fn().mockImplementation(() => Promise.resolve());
    window.HTMLMediaElement.prototype.pause = jest.fn();
  });

  it('should render the resume section heading and interactive components', () => {
    render(
      <LocalizationProvider>
        <Resume />
      </LocalizationProvider>,
    );

    // Content header
    expect(screen.getByText('Resume Document')).toBeInTheDocument();



    // Audio player iframe / component
    expect(screen.getByTitle('Audio Walkthrough')).toBeInTheDocument();


    // External action links
    const driveLink = screen.getByRole('link', { name: /view in google drive/i });
    expect(driveLink).toBeInTheDocument();
    expect(driveLink).toHaveAttribute('target', '_blank');

    const downloadLink = screen.getByRole('link', { name: /download pdf/i });
    expect(downloadLink).toBeInTheDocument();
    expect(downloadLink).toHaveAttribute('target', '_blank');

    // Google Drive Iframe
    const iframe = screen.getByTitle('Google Drive Resume Viewer');
    expect(iframe).toBeInTheDocument();
  });

  it('should hide loading spinner when iframe loads', () => {
    render(
      <LocalizationProvider>
        <Resume />
      </LocalizationProvider>,
    );

    expect(screen.getByText('Loading Resume PDF...')).toBeInTheDocument();

    const iframe = screen.getByTitle('Google Drive Resume Viewer');
    fireEvent.load(iframe);

    expect(screen.queryByText('Loading Resume PDF...')).not.toBeInTheDocument();
  });
});
