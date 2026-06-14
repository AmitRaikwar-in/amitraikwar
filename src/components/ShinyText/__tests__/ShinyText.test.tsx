import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShinyText from '../ShinyText';

describe('ShinyText', () => {
  it('should render the ShinyText component with correct text', () => {
    const { container } = render(<ShinyText text="Hello World" />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should apply correct animation style using default speed prop', () => {
    render(<ShinyText text="Dynamic Speed Default" />);
    const element = screen.getByText('Dynamic Speed Default');
    expect(element).toHaveStyle({
      animation: 'shine 5s linear infinite',
    });
  });

  it('should apply correct animation style using custom speed prop', () => {
    render(<ShinyText text="Dynamic Speed Custom" speed={10} />);
    const element = screen.getByText('Dynamic Speed Custom');
    expect(element).toHaveStyle({
      animation: 'shine 10s linear infinite',
    });
  });

  it('should disable animation when disabled is true', () => {
    const { container } = render(<ShinyText text="Disabled Animation" disabled={true} />);
    const element = screen.getByText('Disabled Animation');
    expect(element).toHaveStyle({
      animation: 'none',
    });
    expect(container).toMatchSnapshot();
  });

  it('should pass custom className to the element', () => {
    render(<ShinyText text="Class Test" className="custom-class" />);
    const element = screen.getByText('Class Test');
    expect(element).toHaveClass('custom-class');
  });
});
