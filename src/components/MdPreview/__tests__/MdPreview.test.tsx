import MdPreview from '../MdPreview';
import { render } from '@testing-library/react';

describe('MdPreview', () => {
  it('should render MdPreview with empty string', () => {
    const { container } = render(<MdPreview mdString={''} />);
    expect(container).toMatchSnapshot();
  });

  it('should render MdPreview with content', () => {
    const { container } = render(<MdPreview mdString={'test'} />);
    expect(container).toMatchSnapshot();
  });
});
