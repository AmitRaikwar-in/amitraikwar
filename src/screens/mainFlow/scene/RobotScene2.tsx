/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber';
import { lazy, useRef } from 'react';

import { Environment, OrbitControls } from '@react-three/drei';
import { Mesh } from 'three';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

const ReapTheWhirlwind = lazy(() => import('./ReapTheWhirlwind'));

const RobotScene = () => {
  const ref = useRef<Mesh | null>(null);

  return (
    <Canvas
      flat
      shadows
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: 'transparent',
      }}
      gl={{ antialias: true }}
      dpr={[1, 2]}
      performance={{ min: 0.1, max: 1 }}
      camera={{
        position: [-50, 4, -20],
        fov: 70,
      }}
    >
      <ambientLight intensity={0.4} color={'violet'} />
      <directionalLight
        position={[-2, 0, 2]}
        intensity={0.3}
        color={'violet'}
      />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        enableDamping={true}
      />
      <directionalLight
        position={[-4, 1.5, 4]}
        intensity={0.4}
        color={'blue'}
      />
      <ReapTheWhirlwind ref={ref} />
      <Environment preset="night" blur={0.2} />
      <EffectComposer>
        <Bloom
          luminanceThreshold={1}
          mipmapBlur
          luminanceSmoothing={0.2}
          intensity={1}
        />
      </EffectComposer>
    </Canvas>
  );
};

export default RobotScene;
