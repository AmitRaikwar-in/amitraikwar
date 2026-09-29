import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Contact from '../Contact';
import { CONTACT } from '@data';

describe('Contact Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
  });

  it('renders the contact heading and description', () => {
    render(<Contact />);

    expect(screen.getByRole('heading', { name: /^contact$/i })).toBeInTheDocument();
    expect(screen.getByText(/get in touch, i'd love to hear from you/i)).toBeInTheDocument();
  });

  it('renders the CTA button for sending email and no floating image text', () => {
    const { container } = render(<Contact />);

    const ctaButton = screen.getByRole('link', { name: /send email/i });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton.getAttribute('href')).toBe(`mailto:${CONTACT.email}`);

    // Verify floating image text is not rendered
    expect(screen.queryByText(/get in touch$/i)).not.toBeInTheDocument();
    expect(container.querySelector('svg[width="550"]')).not.toBeInTheDocument();
  });

  it('renders the copy email button and triggers copy', () => {
    render(<Contact />);

    const copyButton = screen.getByRole('button', { name: /copy email/i });
    expect(copyButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(copyButton);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(CONTACT.email);
  });
});
