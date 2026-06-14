import { SVGProps } from 'react';
import TestCovImg from './images/TestCov.png';

const TestCov = ({
  width = '1em',
  height = '1em',
  style,
  ...props
}: SVGProps<SVGSVGElement>) => {
  return (
    <img
      src={TestCovImg}
      alt="TestCOV"
      style={{
        borderRadius: '10%',
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        objectFit: 'contain',
        ...style,
      }}
    />
  );
};

export default TestCov;
