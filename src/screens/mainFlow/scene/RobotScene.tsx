/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber';
import { lazy, useEffect, useRef } from 'react';

import { Environment } from '@react-three/drei';
import { useMousePositions } from '@hooks';
import gsap from 'gsap';
import { Mesh } from 'three';
import { CharacterType } from '.';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

const AdamHead = lazy(() => import('./AdamHead'));
const LieutenantHead = lazy(() => import('./LieutenantHead'));
const Copernicus = lazy(() => import('./Copernicus'));

const RobotScene = ({
  type = CharacterType.COPERNICUS,
}: {
  type: CharacterType;
}) => {
  const { x, y } = useMousePositions();
  const ref = useRef<Mesh | null>(null);
  const tl = useRef<gsap.core.Timeline>();
  useEffect(() => {
    tl.current = gsap.timeline({
      defaults: {
        ease: 'power3.out',
      },
    });
    if (!ref.current) return;
    tl.current.to(ref.current.rotation, {
      y: x !== 0 ? x / 5000 - 0.25 : -0.25,
      x: y !== 0 ? -y / 5000 - 0.17 : -0.17,
      duration: 1.5,
    });

    tl.current?.play();
  }, [x, y]);

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
        position:
          type === CharacterType.COPERNICUS ? [0, -3, -20] : [0, -3, 20],
        fov: 20,
      }}
    >
      <ambientLight intensity={0.9} color={'violet'} />
      <directionalLight position={[2, 0, 2]} intensity={0.3} color={'violet'} />
      <directionalLight
        position={[-4, 1.5, 4]}
        intensity={0.4}
        color={'blue'}
      />
      {type === CharacterType.ADAM ? (
        <AdamHead ref={ref} />
      ) : type === CharacterType.COPERNICUS ? (
        <Copernicus ref={ref} />
      ) : (
        <LieutenantHead ref={ref} />
      )}
      <Environment preset="night" blur={0.2} />
      <EffectComposer>
        <Bloom
          luminanceThreshold={1}
          mipmapBlur
          luminanceSmoothing={0.2}
          intensity={1}
        />
      </EffectComposer>
      {/* <CameraRig /> */}
    </Canvas>
  );
};

// function CameraRig() {
//   useFrame((state, delta) => {
//     easing.damp3(
//       state.camera.position,
//       [
//         -0 + (state.pointer.x * state.viewport.width) / 3,
//         (3 + state.pointer.y) / 2,
//         20,
//       ],
//       0.5,
//       delta,
//     );
//     state.camera.lookAt(0, 0, 0);
//   });

//   return null;
// }

export default RobotScene;
