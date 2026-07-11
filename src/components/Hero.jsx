import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden"
    >
      {/* ===== 3D GYM SCENE BACKGROUND ===== */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <GymScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-[1]"></div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 py-20">
        {/* Badge */}
        <div className="mb-8 inline-block animate-fade-in-down">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-yellow-400/30 bg-yellow-400/5 backdrop-blur-md">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            <p className="text-yellow-400 text-xs font-bold tracking-[4px] uppercase">
              Transform Yourself
            </p>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-6xl md:text-7xl lg:text-9xl font-black mb-6 leading-[0.9] tracking-tighter">
          <span className="block text-white drop-shadow-[0_0_30px_rgba(250,204,21,0.3)]">
            ALBO
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-[length:200%_auto] animate-gradient-x">
            FITNESS
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
          Excellence in every rep. <span className="text-yellow-400 font-semibold">Transformation</span> in every session.
        </p>

        {/* Stats Preview */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-12 my-16 max-w-3xl mx-auto">
          {[
            { value: '500+', label: 'Members Transformed' },
            { value: '8', label: 'Expert Trainers' },
            { value: '10+', label: 'Years Experience' },
          ].map((stat, i) => (
            <div
              key={i}
              className="group relative p-4 md:p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-yellow-400/50 transition-all duration-500 hover:-translate-y-1"
            >
              <p className="text-3xl md:text-5xl font-black text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]">
                {stat.value}
              </p>
              <p className="text-xs md:text-sm text-gray-400 mt-2 uppercase tracking-wider font-semibold">
                {stat.label}
              </p>
              <div className="absolute inset-0 rounded-2xl bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-all duration-500 -z-10 blur-xl"></div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={() => scrollToSection('trainers')}
            className="group relative px-8 py-4 bg-yellow-400 text-black rounded-full font-bold text-lg overflow-hidden transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(250,204,21,0.4)] hover:shadow-[0_0_50px_rgba(250,204,21,0.6)] uppercase tracking-wide"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Meet Our Trainers
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-8 py-4 bg-transparent text-white rounded-full font-bold text-lg border-2 border-yellow-400/50 hover:border-yellow-400 hover:bg-yellow-400/10 backdrop-blur-md transition-all transform hover:scale-105 uppercase tracking-wide"
          >
            Start Your Journey
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <p className="text-[10px] text-yellow-400/60 uppercase tracking-[3px] font-bold">
            Scroll
          </p>
          <svg
            className="w-6 h-6 text-yellow-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 4s ease infinite;
        }
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 1s ease-out;
        }
      `}</style>
    </section>
  );
}

// ===== 3D GYM SCENE COMPONENT =====
function GymScene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#facc15" />
      <pointLight position={[-5, -5, 5]} intensity={0.8} color="#facc15" />
      <pointLight position={[5, -5, -5]} intensity={0.5} color="#ffffff" />

      {/* Environment for premium reflections */}
      <Environment preset="night" />

      {/* Starfield background */}
      <Stars
        radius={50}
        depth={50}
        count={1500}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* ===== GYM EQUIPMENT ===== */}
      <Dumbbell position={[-4.5, 2, -2]} rotation={[0.3, 0.5, 0.2]} />
      <Dumbbell position={[5, 0.5, -3]} rotation={[-0.5, 0.8, -0.3]} scale={0.8} />
      <Kettlebell position={[4.5, -1.5, -1]} rotation={[0.2, -0.3, 0.1]} />
      <Barbell position={[-4, -2.5, -3]} rotation={[0.4, 0.6, 0.8]} />
      <WeightPlate position={[4, 2.5, -2]} rotation={[0.5, 0.2, 0]} />
      <WeightPlate position={[-5, -0.5, -4]} rotation={[1.2, 0.5, 0.3]} scale={0.7} />
      <MedicineBall position={[0, -3.5, -4]} />

      {/* Particle Field */}
      <ParticleField />

      {/* Mouse-reactive camera */}
      <MouseParallax />
    </>
  );
}

// ===== DUMBBELL =====
function Dumbbell({ position, rotation, scale = 1 }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.003;
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
        {/* Handle (silver bar) */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 1.6, 32]} />
          <meshStandardMaterial
            color="#9ca3af"
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>

        {/* Left Weight Stack */}
        <mesh position={[-0.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.35, 0.35, 0.15, 32]} />
          <meshStandardMaterial
            color="#facc15"
            metalness={0.9}
            roughness={0.15}
            emissive="#facc15"
            emissiveIntensity={0.2}
          />
        </mesh>
        <mesh position={[-0.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.28, 0.28, 0.12, 32]} />
          <meshStandardMaterial
            color="#facc15"
            metalness={0.9}
            roughness={0.15}
            emissive="#facc15"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Right Weight Stack */}
        <mesh position={[0.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.35, 0.35, 0.15, 32]} />
          <meshStandardMaterial
            color="#facc15"
            metalness={0.9}
            roughness={0.15}
            emissive="#facc15"
            emissiveIntensity={0.2}
          />
        </mesh>
        <mesh position={[0.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.28, 0.28, 0.12, 32]} />
          <meshStandardMaterial
            color="#facc15"
            metalness={0.9}
            roughness={0.15}
            emissive="#facc15"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* End caps */}
        <mesh position={[-0.82, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.05, 32]} />
          <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0.82, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.05, 32]} />
          <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

// ===== KETTLEBELL =====
function Kettlebell({ position, rotation, scale = 1 }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.004;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
      <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
        {/* Main Body (yellow sphere) */}
        <mesh position={[0, -0.2, 0]}>
          <sphereGeometry args={[0.55, 64, 64]} />
          <meshStandardMaterial
            color="#facc15"
            metalness={0.9}
            roughness={0.15}
            emissive="#facc15"
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* Flat bottom */}
        <mesh position={[0, -0.7, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.08, 32]} />
          <meshStandardMaterial
            color="#facc15"
            metalness={0.9}
            roughness={0.15}
            emissive="#facc15"
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* Handle (silver torus arc) */}
        <mesh position={[0, 0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.32, 0.08, 16, 32, Math.PI]} />
          <meshStandardMaterial
            color="#9ca3af"
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>

        {/* Handle connectors */}
        <mesh position={[-0.32, 0.15, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0.32, 0.15, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>
    </Float>
  );
}

// ===== BARBELL =====
function Barbell({ position, rotation, scale = 1 }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.003;
      groupRef.current.rotation.x += 0.002;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={1} floatIntensity={2}>
      <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
        {/* Long Bar */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 3.5, 32]} />
          <meshStandardMaterial
            color="#d1d5db"
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>

        {/* Left Plates (stacked) */}
        <mesh position={[-1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.5, 0.5, 0.12, 32]} />
          <meshStandardMaterial
            color="#facc15"
            metalness={0.9}
            roughness={0.15}
            emissive="#facc15"
            emissiveIntensity={0.2}
          />
        </mesh>
        <mesh position={[-1.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
          <meshStandardMaterial
            color="#facc15"
            metalness={0.9}
            roughness={0.15}
            emissive="#facc15"
            emissiveIntensity={0.2}
          />
        </mesh>
        <mesh position={[-1.22, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.08, 32]} />
          <meshStandardMaterial
            color="#facc15"
            metalness={0.9}
            roughness={0.15}
            emissive="#facc15"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Right Plates (stacked) */}
        <mesh position={[1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.5, 0.5, 0.12, 32]} />
          <meshStandardMaterial
            color="#facc15"
            metalness={0.9}
            roughness={0.15}
            emissive="#facc15"
            emissiveIntensity={0.2}
          />
        </mesh>
        <mesh position={[1.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
          <meshStandardMaterial
            color="#facc15"
            metalness={0.9}
            roughness={0.15}
            emissive="#facc15"
            emissiveIntensity={0.2}
          />
        </mesh>
        <mesh position={[1.22, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.08, 32]} />
          <meshStandardMaterial
            color="#facc15"
            metalness={0.9}
            roughness={0.15}
            emissive="#facc15"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Collars/Clips */}
        <mesh position={[-1.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
          <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[1.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
          <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

// ===== WEIGHT PLATE (Torus) =====
function WeightPlate({ position, rotation, scale = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <group position={position} rotation={rotation} scale={scale}>
        <mesh ref={meshRef}>
          <torusGeometry args={[0.7, 0.25, 32, 64]} />
          <meshStandardMaterial
            color="#facc15"
            metalness={0.9}
            roughness={0.15}
            emissive="#facc15"
            emissiveIntensity={0.2}
          />
        </mesh>
        {/* Inner ring detail */}
        <mesh>
          <torusGeometry args={[0.45, 0.08, 16, 32]} />
          <meshStandardMaterial
            color="#1f2937"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
}

// ===== MEDICINE BALL =====
function MedicineBall({ position }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <mesh position={position}>
        <sphereGeometry args={[0.6, 64, 64]} />
        <MeshDistortMaterial
          color="#facc15"
          metalness={0.4}
          roughness={0.5}
          distort={0.25}
          speed={2}
          emissive="#facc15"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

// ===== PARTICLE FIELD =====
function ParticleField() {
  const pointsRef = useRef();
  const count = 400;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#facc15"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ===== MOUSE PARALLAX =====
function MouseParallax() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 1.5 - camera.position.x) * 0.05;
    camera.position.y += (mouse.current.y * 1 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}