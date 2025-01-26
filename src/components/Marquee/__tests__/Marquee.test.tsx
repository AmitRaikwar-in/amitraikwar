import { render } from '@testing-library/react';
import Marquee from '../Marquee';

describe('Marquee', () => {
  it('should render the Marquee component', () => {
    const { container } = render(<Marquee>Test container</Marquee>);

    expect(container).toMatchSnapshot();
  });

  it('should render the Marquee component', () => {
    const { container } = render(
      <Marquee
        repeat={40}
        duration={10}
        gap={4}
        pauseOnHover={true}
        reverse={true}
      >
        Test container
      </Marquee>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render the Marquee component with vertical direction', () => {
    const { container } = render(
      <Marquee
        repeat={40}
        duration={10}
        gap={4}
        pauseOnHover={true}
        reverse={true}
        vertical={true}
      >
        Test container
      </Marquee>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render the Marquee component with horizontal direction', () => {
    const { container } = render(
      <Marquee
        repeat={40}
        duration={10}
        gap={4}
        pauseOnHover={true}
        reverse={true}
        vertical={false}
      >
        Test container
      </Marquee>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render the Marquee component without hover', () => {
    const { container } = render(
      <Marquee
        repeat={40}
        duration={10}
        gap={4}
        pauseOnHover={false}
        reverse={true}
        vertical={false}
      >
        Test container
      </Marquee>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render the Marquee component with reverse false', () => {
    const { container } = render(
      <Marquee
        repeat={40}
        duration={10}
        gap={4}
        pauseOnHover={false}
        reverse={false}
        vertical={false}
      >
        Test container
      </Marquee>,
    );

    expect(container).toMatchSnapshot();
  });
});
