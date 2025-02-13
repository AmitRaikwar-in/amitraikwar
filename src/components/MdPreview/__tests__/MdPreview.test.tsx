import MdPreview from '../MdPreview';
import { render } from '@testing-library/react';

describe('MdPreview', () => {
  it('should render MdPreview', () => {
    const { container } = render(
      <MdPreview mdString={''} variant={'withSide'} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render MdPreview', () => {
    const { container } = render(
      <MdPreview mdString={'test'} variant={'withoutSide'} />,
    );
    expect(container).toMatchSnapshot();
  });
});
