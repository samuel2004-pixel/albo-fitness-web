import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { supabase } from '../services/supabase';

export default function GymInfo() {
  const [gymInfo, setGymInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGymInfo();
  }, []);

  const fetchGymInfo = async () => {
    try {
      const { data, error } = await supabase.from('gym_info').select('*').single();
      if (error && error.code !== 'PGRST116') throw error;
      setGymInfo(data || {});
    } catch (error) {
      console.error('Error fetching gym info:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-24 text-gray-400">
        <div className="inline-block animate-pulse">Loading gym info...</div>
      </div>
    );
  }

  return (
    <section 
      className="py-28 relative overflow-hidden bg-black"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/xxa8wqzk/image/upload/f_auto,q_auto/vecteezy_ai-generated-exercise-machines-in-a-gym_37229509_tap6j1')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Premium Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
      <div className="absolute inset-0 bg-black/60"></div>
      
      {/* Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-yellow-400/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Premium Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-400"></div>
            <p className="text-sm font-bold tracking-[6px] uppercase text-yellow-400">
              Welcome To
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-yellow-400"></div>
          </div>
          
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
            ALBO
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-[length:200%_auto] animate-gradient-x">
              FITNESS
            </span>
          </h2>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Where champions are forged and transformations begin
          </p>
        </div>

        {gymInfo ? (
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Side - About Section */}
            <div className="space-y-8">
              {gymInfo.about && (
                <AboutCard content={gymInfo.about} />
              )}
            </div>

            {/* Right Side - Contact Info */}
            <div className="space-y-6">
              {gymInfo.address && (
                <InfoCard
                  icon={<MapPin size={28} />}
                  label="Location"
                  content={gymInfo.address}
                  index={0}
                />
              )}

              {gymInfo.phone && (
                <InfoCard
                  icon={<Phone size={28} />}
                  label="Phone"
                  content={gymInfo.phone}
                  index={1}
                />
              )}

              {gymInfo.email && (
                <InfoCard
                  icon={<Mail size={28} />}
                  label="Email"
                  content={gymInfo.email}
                  index={2}
                />
              )}

              {gymInfo.hours && (
                <InfoCard
                  icon={<Clock size={28} />}
                  label="Hours"
                  content={gymInfo.hours}
                  isMultiline
                  index={3}
                />
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400 text-xl">
            Gym information not available
          </p>
        )}

        {/* Premium CTA Button */}
        <div className="text-center mt-20">
          <button className="group relative px-10 py-5 bg-yellow-400 text-black rounded-full font-black text-lg uppercase overflow-hidden transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(250,204,21,0.4)] hover:shadow-[0_0_60px_rgba(250,204,21,0.6)]">
            <span className="relative z-10 flex items-center justify-center gap-3">
              Join Now & Transform
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
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

// ===== 3D ABOUT CARD =====
function AboutCard({ content }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    
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
      style={{ perspective: '1200px' }}
    >
      <div
        className="relative transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Animated Gradient Border */}
        <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-yellow-400 via-yellow-200 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]"></div>

        {/* Main Card */}
        <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-black/90 backdrop-blur-xl p-10 rounded-2xl border-2 border-gray-800 group-hover:border-transparent transition-all duration-500 overflow-hidden">
          
          {/* Dynamic Cursor Glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(circle 300px at ${glow.x}% ${glow.y}%, rgba(250, 204, 21, 0.12), transparent 70%)`,
            }}
          ></div>

          {/* Shimmer Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 -inset-y-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h3 
              className="text-3xl font-black text-yellow-400 mb-6 uppercase tracking-tight"
              style={{
                transform: isHovered ? 'translateZ(30px)' : 'translateZ(0)',
                transition: 'transform 0.5s',
                textShadow: isHovered ? '0 0 30px rgba(250, 204, 21, 0.4)' : 'none',
              }}
            >
              About Us
            </h3>
            <p 
              className="text-gray-200 leading-relaxed text-lg"
              style={{
                transform: isHovered ? 'translateZ(20px)' : 'translateZ(0)',
                transition: 'transform 0.5s',
              }}
            >
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== 3D INFO CARD =====
function InfoCard({ icon, label, content, isMultiline = false, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
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
        perspective: '1200px',
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div
        className="relative transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Animated Gradient Border */}
        <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]"></div>

        {/* Main Card */}
        <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-950/90 to-black/90 backdrop-blur-xl p-6 rounded-2xl border-2 border-gray-800 group-hover:border-transparent transition-all duration-500 overflow-hidden flex gap-5">
          
          {/* Dynamic Cursor Glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(circle 250px at ${glow.x}% ${glow.y}%, rgba(250, 204, 21, 0.1), transparent 70%)`,
            }}
          ></div>

          {/* Icon - 3D Floating */}
          <div 
            className="flex-shrink-0 pt-1 transition-all duration-500"
            style={{
              transform: isHovered ? 'translateZ(40px) scale(1.15)' : 'translateZ(0) scale(1)',
            }}
          >
            <div className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.3)]">
              {icon}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <p 
              className="font-bold text-yellow-400 text-xs uppercase tracking-[3px] mb-2"
              style={{
                transform: isHovered ? 'translateZ(25px)' : 'translateZ(0)',
                transition: 'transform 0.5s',
              }}
            >
              {label}
            </p>
            <p 
              className={`text-white text-lg ${isMultiline ? 'whitespace-pre-line' : ''}`}
              style={{
                transform: isHovered ? 'translateZ(20px)' : 'translateZ(0)',
                transition: 'transform 0.5s',
              }}
            >
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}