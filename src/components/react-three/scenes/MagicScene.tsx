'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { DoubleSide, Vector3 } from 'three';
import { Float } from '@react-three/drei';

export default function MagicScene() {
  return (
    <div className="w-full h-full bg-black">
      <Canvas shadows camera={{ position: [0, 0, 15], fov: 35 }}>
        {/* Lighting setup */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.5}
          color="#ffeebb"
          castShadow
        />
        <directionalLight
          position={[-3, -3, 3]}
          intensity={0.8}
          color="#ccddff"
        />
        
        {/* Camera controller */}
        <CinematicCamera />
        
        {/* World filled with glass shards */}
        <FilledWorld />
      </Canvas>
    </div>
  );
}

function CinematicCamera() {
  const { camera, size } = useThree();
  const targetPos = useRef(new Vector3(0, 0, 15));
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / size.width - 0.5) * 2,
        y: -(e.clientY / size.height - 0.5) * 2
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [size]);

  useFrame((state, delta) => {
    const targetX = mouse.current.x * 4;
    const targetY = mouse.current.y * 3;
    
    targetPos.current.x += (targetX - targetPos.current.x) * 0.05;
    targetPos.current.y += (targetY - targetPos.current.y) * 0.05;
    targetPos.current.z = 15 - Math.abs(targetPos.current.x) * 0.3;
    
    camera.position.lerp(targetPos.current, Math.min(delta * 2, 0.1));
    camera.lookAt(new Vector3(targetPos.current.x * 0.3, targetPos.current.y * 0.3, 0));
    camera.rotation.z = -targetPos.current.x * 0.01;
  });

  return null;
}

function FilledWorld() {
  const shards = useRef<any>([]);
  const { camera } = useThree();
  
  // Create a massive grid of shards (200 total)
  if (shards.current.length === 0) {
    const gridSize = 5;
    const spacing = 4;
    
    for (let x = -gridSize; x <= gridSize; x++) {
      for (let y = -gridSize; y <= gridSize; y++) {
        for (let z = -gridSize; z <= gridSize; z++) {
          if (Math.random() > 0.7) { // 70% density
            shards.current.push({
              position: [
                x * spacing + (Math.random() - 0.5) * 3,
                y * spacing + (Math.random() - 0.5) * 3,
                z * spacing + (Math.random() - 0.5) * 3
              ],
              rotation: [
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI,
              ],
              scale: Math.random() * 0.8 + 0.4,
              speed: Math.random() * 0.5 + 0.5
            });
          }
        }
      }
    }
  }

  return (
    <>
      {shards.current.map((shard: any, idx: any) => (
        <Float
          key={idx}
          speed={shard.speed}
          rotationIntensity={0.3}
          floatIntensity={0.4}
        >
          <mesh
            position={shard.position}
            rotation={shard.rotation}
            scale={shard.scale}
          >
            <planeGeometry args={[1.3, 1.3]} />
            <meshPhysicalMaterial
              color="#ffffff"
              transmission={0.7}
              roughness={0.1}
              metalness={0.75}
              opacity={0.85}
              transparent
              side={DoubleSide}
              ior={1.5}
              thickness={0.3}
              clearcoat={0.5}
              envMapIntensity={1.2}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}






