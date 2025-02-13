const Noise = ({ type = 'bg' }: { type?: 'bg' | 'fg' }) => {
  return (
    <div
      className={`${type === 'bg' ? 'absolute inset-0 w-full h-full' : 'w-[100%] h-[100%]'} transform opacity-10 [mask-image:radial-gradient(#fff,transparent,75%)]`}
      style={{
        backgroundImage: 'url(/noise.webp)',
        backgroundSize: '15%',
      }}
    ></div>
  );
};

export default Noise;
