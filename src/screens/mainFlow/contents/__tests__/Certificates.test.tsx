import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LocalizationProvider from '../../../../providers/localizationProvider/LocalizationProvider';
import Certificates from '../Certificates';

describe('Certificates Component', () => {
  it('should render the certificates section heading and credential cards', () => {
    render(
      <LocalizationProvider>
        <Certificates />
      </LocalizationProvider>,
    );

    // Section header
    expect(screen.getByText('Certifications')).toBeInTheDocument();

    // Badges / Credentials
    expect(
      screen.getByText('AWS Certified Cloud Practitioner'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('AWS Certified AI Practitioner'),
    ).toBeInTheDocument();

    // Issuer
    const issuers = screen.getAllByText('Amazon Web Services');
    expect(issuers.length).toBe(2);

    // Verification links
    const verifyButtons = screen.getAllByRole('link', {
      name: /verify on credly/i,
    });
    expect(verifyButtons.length).toBe(2);
    expect(verifyButtons[0]).toHaveAttribute(
      'href',
      'https://www.credly.com/badges/ee58a8d8-6dcf-433b-9d14-d29833b531b7',
    );
    expect(verifyButtons[1]).toHaveAttribute(
      'href',
      'https://www.credly.com/badges/38fd07b0-fad2-4c89-b569-f7d8ffdd441b',
    );

    // Badge images
    expect(
      screen.getByAltText(/aws certified cloud practitioner badge/i),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(/aws certified ai practitioner badge/i),
    ).toBeInTheDocument();
  });
});
