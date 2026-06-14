import { SVGProps } from 'react';
import InstaPilotImg from './images/InstaPilot.png';

const InstaPilot = ({
  width = '1em',
  height = '1em',
  style,
  ...props
}: SVGProps<SVGSVGElement>) => {
  return (
    <img
      src={InstaPilotImg}
      alt="InstaPilot"
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

export default InstaPilot;
