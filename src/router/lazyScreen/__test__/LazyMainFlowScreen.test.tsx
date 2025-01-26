import { render } from '@testing-library/react';
import { LazyHostScreen } from '../LazyMainFlowScreen';

jest.mock('react-social-icons', () => ({
  SocialIcon: ({ url }: { url: string }) => <div>{url}</div>,
}));

describe('LazyMainFlowScreen', () => {
  it('should render lazy about screen', async () => {
    const { container } = render(<LazyHostScreen />);

    expect(container).toMatchSnapshot();
  });
});
