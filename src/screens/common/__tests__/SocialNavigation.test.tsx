import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SocialNavigation from '../SocialNavigation';
import { CONTACT } from '@data';

jest.mock('@components', () => ({
  ...jest.requireActual('@components'),
  useCursor: () => ({
    setCursorInsets: jest.fn(),
  }),
  GlassBox: () => <div data-testid="glass-box" />,
}));

describe('SocialNavigation', () => {
  it('renders all social links including LinkedIn, CodeChef, and Codeforces', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <SocialNavigation />
      </MemoryRouter>
    );

    const githubLinks = screen.getAllByRole('link', { name: /github icon/i });
    expect(githubLinks[0].getAttribute('href')).toBe(CONTACT.github);

    const linkedInLinks = screen.getAllByRole('link', { name: /linkedin icon/i });
    expect(linkedInLinks[0].getAttribute('href')).toBe(CONTACT.linkedIn);

    const mediumLinks = screen.getAllByRole('link', { name: /medium icon/i });
    expect(mediumLinks[0].getAttribute('href')).toBe(CONTACT.medium);

    const leetcodeLinks = screen.getAllByRole('link', { name: /leetcode icon/i });
    expect(leetcodeLinks[0].getAttribute('href')).toBe(CONTACT.leetcode);

    const codechefLinks = screen.getAllByRole('link', { name: /codechef icon/i });
    expect(codechefLinks[0].getAttribute('href')).toBe(CONTACT.codechef);

    const codeforcesLinks = screen.getAllByRole('link', { name: /codeforces icon/i });
    expect(codeforcesLinks[0].getAttribute('href')).toBe(CONTACT.codeforces);
  });

  it('does not render on /projects or /articles routes', () => {
    const { container: projectsContainer } = render(
      <MemoryRouter initialEntries={['/projects']}>
        <SocialNavigation />
      </MemoryRouter>
    );
    expect(projectsContainer.firstChild).toBeNull();

    const { container: articlesContainer } = render(
      <MemoryRouter initialEntries={['/articles']}>
        <SocialNavigation />
      </MemoryRouter>
    );
    expect(articlesContainer.firstChild).toBeNull();
  });
});
