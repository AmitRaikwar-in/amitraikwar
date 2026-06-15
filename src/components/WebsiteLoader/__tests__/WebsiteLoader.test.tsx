import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WebsiteLoader } from '../WebsiteLoader';

describe('WebsiteLoader', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render the loader, show status logs and initial progress of 0%', () => {
    const handleComplete = jest.fn();
    render(<WebsiteLoader onComplete={handleComplete} />);

    // Verify system status logs are initialized
    expect(screen.getByText(/SYS_INIT/)).toBeInTheDocument();

    // Initial progress starts at 0%
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('should increment progress over time', () => {
    const handleComplete = jest.fn();
    render(<WebsiteLoader onComplete={handleComplete} />);

    // Fast-forward initial delay
    act(() => {
      jest.advanceTimersByTime(350);
    });

    // Verify progress has advanced from 0%
    const progressText = screen.queryByText('0%');
    expect(progressText).not.toBeInTheDocument();
  });

  it('should trigger onComplete once loading reaches 100%', () => {
    const handleComplete = jest.fn();
    render(<WebsiteLoader onComplete={handleComplete} />);

    // Fast-forward all timers to let the loading finish
    act(() => {
      // It has multiple stages, so we advance by a substantial time
      jest.advanceTimersByTime(15000);
    });

    expect(screen.getByText('100%')).toBeInTheDocument();
    
    // Decrypting matrix text should be fully resolved at 100%
    expect(screen.getByText('SYSTEM_ONLINE // LINK_ESTABLISHED')).toBeInTheDocument();

    // Advance the remaining hold delay to trigger onComplete
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(handleComplete).toHaveBeenCalledTimes(1);
  });

  it('should fade out and remove preloader if it exists in the DOM', () => {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    document.body.appendChild(preloader);

    expect(document.getElementById('preloader')).toBeInTheDocument();

    const handleComplete = jest.fn();
    render(<WebsiteLoader onComplete={handleComplete} />);

    expect(preloader).toHaveClass('preloader-fade-out');
    expect(document.getElementById('preloader')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(800);
    });

    expect(document.getElementById('preloader')).not.toBeInTheDocument();
  });
});
