import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavigationBar from '../NavigationBar';

jest.mock('@components', () => ({
  ...jest.requireActual('@components'),
  useCursor: () => ({
    setCursorInsets: jest.fn(),
  }),
  GlassBox: () => <div data-testid="glass-box" />,
}));

// Mock Resume content inside modal to keep test lightweight
jest.mock('../../mainFlow/contents/Resume', () => {
  const MockResume = () => <div data-testid="resume-content">Resume Content</div>;
  MockResume.displayName = 'MockResume';
  return MockResume;
});

describe('NavigationBar', () => {
  it('renders all navigation links including Resume and Articles', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <NavigationBar />
      </MemoryRouter>
    );

    // Section links
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();

    // Articles link
    expect(screen.getByRole('link', { name: /articles/i })).toBeInTheDocument();

    // Resume button
    expect(screen.getByRole('button', { name: /resume/i })).toBeInTheDocument();

    // Search button
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });
});
