import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'; 
import { Suspense } from 'react';
import { Html, useGLTF } from '@react-three/drei';

const Model = () => {
  const { scene } = useGLTF('/planet/scene.gltf'); 
  const ref = useRef(); 

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  return <primitive object={scene} ref={ref} scale={[5, 5, 5]} />; // Scale the model and attach the reference
};

const ModelLoader = () => {
  const lightRef = useRef();
  return (
    <Canvas className='canvas'
      camera={{ position: [0, 0, 8], fov: 80 }} // Adjust the camera position
      style={{ height: '400px', width: '400px' }} // Fixed size for the canvas
    >
      <ambientLight intensity={3} /> {/* Increase light intensity */}
      <directionalLight
        ref={lightRef}
        position={[10, 10, 10]} 
        intensity={1.5} 
        />
      <Suspense fallback={<Html center>Loading...</Html>}>
        <Model />
      </Suspense>
    </Canvas>
  );
};

export default ModelLoader;
