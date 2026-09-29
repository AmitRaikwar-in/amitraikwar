import { render } from '@testing-library/react';
import { SearchIcon } from '../Search';
import { ThreeDIcon } from '../3D';
import { TwoDIcon } from '../2D';
import CodeChefIcon from '../CodeChefIcon';
import CodeforcesIcon from '../CodeforcesIcon';
import CopyIcon from '../CopyIcon';
import CheckIcon from '../CheckIcon';

describe('Common Icon', () => {
  it(' `SearchIcon` renders correctly', () => {
    const { container } = render(<SearchIcon />);

    expect(container).toMatchSnapshot();
  });

  it(' `ThreeDIcon` renders correctly', () => {
    const { container } = render(<ThreeDIcon />);

    expect(container).toMatchSnapshot();
  });

  it(' `TwoDIcon` renders correctly', () => {
    const { container } = render(<TwoDIcon />);

    expect(container).toMatchSnapshot();
  });

  it(' `CodeChefIcon` renders correctly', () => {
    const { container } = render(<CodeChefIcon />);

    expect(container).toMatchSnapshot();
  });

  it(' `CodeforcesIcon` renders correctly', () => {
    const { container } = render(<CodeforcesIcon />);

    expect(container).toMatchSnapshot();
  });

  it(' `CopyIcon` renders correctly', () => {
    const { container } = render(<CopyIcon />);

    expect(container).toMatchSnapshot();
  });

  it(' `CheckIcon` renders correctly', () => {
    const { container } = render(<CheckIcon />);

    expect(container).toMatchSnapshot();
  });
});
