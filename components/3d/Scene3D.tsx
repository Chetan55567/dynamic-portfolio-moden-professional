'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

// Animated floating particles
function Particles({ count = 100, color = '#0ea5e9' }: { count?: number; color?: string }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * viewport.width * 3;
      const y = (Math.random() - 0.5) * viewport.height * 3;
      const z = (Math.random() - 0.5) * 10 - 5;
      const scale = Math.random() * 0.5 + 0.1;
      const speed = Math.random() * 0.5 + 0.1;
      temp.push({ x, y, z, scale, speed });
    }
    return temp;
  }, [count, viewport]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    const time = state.clock.getElapsedTime();
    particles.forEach((particle, i) => {
      const matrix = new THREE.Matrix4();
      const position = new THREE.Vector3(
        particle.x + Math.sin(time * particle.speed) * 0.5,
        particle.y + Math.cos(time * particle.speed) * 0.5,
        particle.z
      );
      matrix.setPosition(position);
      matrix.scale(new THREE.Vector3(particle.scale, particle.scale, particle.scale));
      mesh.current!.setMatrixAt(i, matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </instancedMesh>
  );
}

// Morphing sphere
function MorphingSphere({ color = '#0ea5e9' }: { color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.5}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

// Glowing ring
function GlowingRing({ color = '#0ea5e9' }: { color?: string }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2;
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <mesh ref={ringRef} position={[0, 0, -1]}>
      <torusGeometry args={[3.5, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  );
}

// Orbiting elements
function OrbitingElements({ color = '#0ea5e9' }: { color?: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 6) * Math.PI * 2) * 3.2,
            Math.sin((i / 6) * Math.PI * 2) * 3.2,
            0,
          ]}
        >
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

// Main 3D scene
interface Scene3DProps {
  accentColor?: string;
  particleCount?: number;
}

export default function Scene3D({ accentColor = '#0ea5e9', particleCount = 100 }: Scene3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#0a0a0f']} />
      
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color={accentColor} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color={accentColor}
      />

      {/* Background stars */}
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

      {/* Main sphere */}
      <MorphingSphere color={accentColor} />

      {/* Glowing rings */}
      <GlowingRing color={accentColor} />

      {/* Orbiting elements */}
      <OrbitingElements color={accentColor} />

      {/* Floating particles */}
      <Particles count={particleCount} color={accentColor} />

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.ADD}
        />
      </EffectComposer>
    </Canvas>
  );
}
