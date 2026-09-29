import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LocalizationProvider from '../../../../providers/localizationProvider/LocalizationProvider';
import AboutMe from '../AboutMe';

describe('AboutMe Component', () => {
  it('should render the about me section heading and falling text', () => {
    render(
      <LocalizationProvider>
        <AboutMe />
      </LocalizationProvider>,
    );

    expect(screen.getByText('About Me')).toBeInTheDocument();
  });
});
