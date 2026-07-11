import React, { useRef, useState } from 'react';
import { Zap, Trophy, Users, TrendingUp, Heart, Apple, ArrowUpRight } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      number: '01',
      icon: <Zap size={36} />,
      title: 'Strength',
      description: 'Progressive overload programming for raw power and lean muscle, coached rep by rep.',
      accent: 'yellow',
    },
    {
      number: '02',
      icon: <TrendingUp size={36} />,
      title: 'Cardio & HIIT',
      description: 'High-intensity intervals that spike your engine and torch calories long after.',
      accent: 'orange',
    },
    {
      number: '03',
      icon: <Heart size={36} />,
      title: 'Yoga & Mobility',
      description: 'Guided flows that unlock range, balance, and a quieter, sharper mind.',
      accent: 'yellow',
    },
    {
      number: '04',
      icon: <Trophy size={36} />,
      title: 'Personal Trainer',
      description: 'One-on-one coaching mapped to your body, schedule, and ambition.',
      accent: 'orange',
    },
    {
      number: '05',
      icon: <Users size={36} />,
      title: 'Group Classes',
      description: 'Train harder together — high-energy sessions built on accountability.',
      accent: 'yellow',
    },
    {
      number: '06',
      icon: <Apple size={36} />,
      title: 'Nutrition',
      description: 'Personalized fueling plans from in-house dietitians to power every result.',
      accent: 'orange',
    },
  ];

  return (
    <section className="py-28 bg-black relative overflow-hidden">
      {/* ===== PREMIUM BACKGROUND ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px]"></div>
        
        {/* 3D Grid Pattern for Depth */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(250,204,21,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(250,204,21,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* ===== PREMIUM HEADER ===== */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-400"></div>
            <p className="text-sm font-bold tracking-[6px] uppercase text-yellow-400">
              Why Choose Us
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-yellow-400"></div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-6 text-white leading-tight">
            EXCELLENCE
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-[length:200%_auto] animate-gradient-x">
              DEFINED
            </span>
          </h2>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Six pillars of transformation. One unstoppable you.
          </p>
        </div>

        {/* ===== 3D FEATURE GRID ===== */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              feature={feature} 
              index={index} 
            />
          ))}
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 4s ease infinite;
        }
        
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fade-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </section>
  );
}

// ===== 3D INTERACTIVE FEATURE CARD =====
function FeatureCard({ feature, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const accentColors = {
    yellow: {
      text: 'text-yellow-400',
      bg: 'bg-yellow-400',
      border: 'border-yellow-400',
      glow: 'rgba(250, 204, 21, 0.4)',
      gradient: 'from-yellow-400 to-yellow-200',
    },
    orange: {
      text: 'text-orange-500',
      bg: 'bg-orange-500',
      border: 'border-orange-500',
      glow: 'rgba(249, 115, 22, 0.4)',
      gradient: 'from-orange-500 to-orange-300',
    },
  };

  const colors = accentColors[feature.accent];

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate 3D tilt (subtle, max 8 degrees)
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    setTilt({ x: rotateX, y: rotateY });
    setGlow({ 
      x: (x / rect.width) * 100, 
      y: (y / rect.height) * 100 
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlow({ x: 50, y: 50 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="animate-fade-up group relative"
      style={{ 
        animationDelay: `${index * 100}ms`,
        perspective: '1200px',
      }}
    >
      {/* 3D Transform Wrapper */}
      <div
        className="relative h-full transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Animated Gradient Border (visible on hover) */}
        <div 
          className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]`}
        ></div>

        {/* Main Card */}
        <div className="relative h-full bg-gradient-to-br from-gray-950 via-gray-900 to-black rounded-2xl border border-gray-800 group-hover:border-transparent transition-all duration-500 overflow-hidden flex flex-col">
          
          {/* Dynamic Cursor Glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(circle 250px at ${glow.x}% ${glow.y}%, ${colors.glow}, transparent 70%)`,
            }}
          ></div>

          {/* Shimmer Scan Line Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div 
              className="absolute top-0 -inset-y-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ animationDelay: `${index * 0.5}s` }}
            ></div>
          </div>

          {/* Card Content */}
          <div className="relative p-8 flex-1 flex flex-col z-10">
            
            {/* Top Row: Number + Icon */}
            <div className="flex items-start justify-between mb-8">
              {/* Number Badge */}
              <div className="relative">
                <span 
                  className={`text-6xl font-black ${colors.text} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
                  style={{ 
                    textShadow: isHovered ? `0 0 30px ${colors.glow}` : 'none',
                    transform: isHovered ? 'translateZ(30px)' : 'translateZ(0)',
                    transition: 'transform 0.5s, text-shadow 0.5s',
                  }}
                >
                  {feature.number}
                </span>
              </div>

              {/* 3D Floating Icon */}
              <div 
                className={`relative p-4 rounded-2xl bg-black/60 backdrop-blur-md border ${colors.border}/30 group-hover:${colors.border} transition-all duration-500`}
                style={{
                  transform: isHovered ? 'translateZ(50px) scale(1.1)' : 'translateZ(0) scale(1)',
                  boxShadow: isHovered ? `0 10px 40px ${colors.glow}` : 'none',
                  transition: 'transform 0.5s, box-shadow 0.5s, border-color 0.5s',
                }}
              >
                <div className={colors.text}>
                  {feature.icon}
                </div>
              </div>
            </div>

            {/* Title */}
            <h3 
              className="text-2xl md:text-3xl font-black mb-4 text-white uppercase tracking-tight leading-tight"
              style={{
                transform: isHovered ? 'translateZ(25px)' : 'translateZ(0)',
                transition: 'transform 0.5s',
              }}
            >
              {feature.title}
            </h3>

            {/* Description */}
            <p 
              className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed text-sm md:text-base mb-8 flex-1"
              style={{
                transform: isHovered ? 'translateZ(15px)' : 'translateZ(0)',
                transition: 'transform 0.5s, color 0.5s',
              }}
            >
              {feature.description}
            </p>

            {/* Premium CTA Button */}
            <div 
              className="flex items-center gap-3 group/btn cursor-pointer"
              style={{
                transform: isHovered ? 'translateZ(35px)' : 'translateZ(0)',
                transition: 'transform 0.5s',
              }}
            >
              <span className="text-sm font-bold uppercase tracking-[3px] text-gray-400 group-hover/btn:text-white transition-colors">
                EXPLORE
              </span>
              <div 
                className={`relative ${colors.bg} p-3 rounded-full text-black transition-all transform group-hover/btn:scale-110 group-hover/btn:rotate-12 shadow-lg`}
                style={{
                  boxShadow: isHovered ? `0 8px 25px ${colors.glow}` : 'none',
                }}
              >
                <ArrowUpRight size={18} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </div>
              {/* Animated underline */}
              <div className={`flex-1 h-px bg-gradient-to-r ${colors.gradient} opacity-0 group-hover/btn:opacity-100 transition-opacity`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}