import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Card from '../CardExport';
import { Language } from '../../Chip';
import { Status } from '@data';

jest.mock('../../Cursor', () => ({
  useCursor: () => ({
    setCursorInsets: jest.fn(),
  }),
}));

describe('Card (CardExport)', () => {
  const defaultProps = {
    titleText: 'Portfolio Site',
    chips: [Language.typescript, Language.react],
    centerText: 'PF',
    icon: 'portfolio',
    description: 'A personal portfolio website showcasing projects and blogs.',
    link: 'https://example.com',
    npmLink: 'https://npmjs.com/package/test',
    status: Status.LIVE,
  };

  it('should render the card with title, description, and Know More button', () => {
    render(
      <MemoryRouter>
        <Card {...defaultProps} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Portfolio Site')).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();

    const knowMoreBtn = screen.getByRole('link', { name: /know more/i });
    expect(knowMoreBtn).toBeInTheDocument();
    expect(knowMoreBtn).toHaveAttribute('href', '/projects/portfolio');
  });

  it('should render live status badge and npm link when provided', () => {
    render(
      <MemoryRouter>
        <Card {...defaultProps} />
      </MemoryRouter>,
    );

    expect(screen.getByText(Status.LIVE)).toBeInTheDocument();
    expect(screen.getByText('NPM')).toBeInTheDocument();
  });
});
