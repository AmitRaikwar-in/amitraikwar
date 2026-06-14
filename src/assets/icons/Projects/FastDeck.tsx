import { SVGProps } from 'react';
import FastDeckImg from './images/FastDeck.png';

const FastDeck = ({
  width = '1em',
  height = '1em',
  style,
  ...props
}: SVGProps<SVGSVGElement>) => {
  return (
    <img
      src={FastDeckImg}
      alt="FastDeck"
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

export default FastDeck;
