import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../services/supabase';
import { MessageCircle, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase.from('testimonials').select('*');
      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -450, behavior: 'smooth' });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 450, behavior: 'smooth' });
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-400">Loading testimonials...</div>;
  }

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Premium 3D Background Depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px]"></div>
        {/* Subtle 3D Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(250,204,21,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(250,204,21,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-400"></div>
            <p className="text-sm font-bold tracking-[6px] uppercase text-yellow-400">Success Stories</p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-yellow-400"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            CLIENT TRANSFORMATIONS
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto shadow-[0_0_15px_rgba(250,204,21,0.5)]"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mt-6">
            Real results from real people who trusted ALBO Fitness
          </p>
        </div>

        {/* Testimonials Slider */}
        {testimonials.length === 0 ? (
          <p className="text-center text-gray-400 py-12">No testimonials yet.</p>
        ) : (
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={scrollLeft}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:bg-yellow-400 hover:border-yellow-400 hover:text-black transition-all shadow-2xl items-center justify-center group"
            >
              <ChevronLeft size={22} className="group-hover:scale-110 transition-transform" />
            </button>

            {/* Horizontal Cards Container */}
            <div
              ref={sliderRef}
              className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar px-4 md:px-12 py-10"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={testimonial.id} 
                  testimonial={testimonial} 
                  index={index} 
                />
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={scrollRight}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:bg-yellow-400 hover:border-yellow-400 hover:text-black transition-all shadow-2xl items-center justify-center group"
            >
              <ChevronRight size={22} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        )}

        {/* CTA Section */}
        {testimonials.length > 0 && (
          <div className="mt-16 text-center">
            <button className="group relative px-10 py-4 bg-yellow-400 text-black rounded-full font-black text-lg uppercase overflow-hidden transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(250,204,21,0.4)] hover:shadow-[0_0_50px_rgba(250,204,21,0.6)]">
              <span className="relative z-10">Start Your Transformation</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            <p className="text-gray-400 mt-4">
              Join <span className="text-yellow-400 font-bold">{testimonials.length}+</span> satisfied members
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// ===== 3D HORIZONTAL TESTIMONIAL CARD =====
function TestimonialCard({ testimonial, index }) {
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
    
    // Subtle tilt (max 4 degrees)
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    
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
      className="flex-shrink-0 w-[320px] md:w-[650px] lg:w-[700px] group"
      style={{ perspective: '1200px' }}
    >
      {/* 3D Transform Wrapper */}
      <div
        className="relative h-[280px] transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glowing Border Effect */}
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]"></div>

        {/* Main Card */}
        <div className="relative h-full bg-gradient-to-br from-gray-900/95 via-gray-950 to-black rounded-2xl border border-gray-800 group-hover:border-transparent transition-all duration-500 overflow-hidden flex shadow-2xl group-hover:shadow-[0_20px_60px_-15px_rgba(250,204,21,0.2)]">
          
          {/* Dynamic Cursor Spotlight */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
            style={{
              background: `radial-gradient(circle 300px at ${glow.x}% ${glow.y}%, rgba(250, 204, 21, 0.08), transparent 70%)`,
            }}
          ></div>

          {/* ===== LEFT SIDE: PHOTO ===== */}
          <div 
            className="w-1/3 md:w-72 h-full relative overflow-hidden bg-gray-800 flex-shrink-0 border-r border-white/5"
            style={{
              transform: isHovered ? 'translateZ(20px)' : 'translateZ(0)',
              transition: 'transform 0.5s ease-out',
            }}
          >
            {testimonial.photo_url ? (
              <img
                src={testimonial.photo_url}
                alt={testimonial.client_name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 bg-gradient-to-br from-gray-800 to-gray-900">
                <MessageCircle size={48} className="text-gray-600" />
              </div>
            )}
            
            {/* Gradient Overlay for blending */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/80"></div>
            
            {/* 3D Floating Quote Icon */}
            <div 
              className="absolute bottom-5 left-5 bg-yellow-400 rounded-full p-3 shadow-xl"
              style={{
                transform: isHovered ? 'translateZ(40px) scale(1.1)' : 'translateZ(0) scale(1)',
                transition: 'transform 0.5s ease-out',
                boxShadow: isHovered ? '0 10px 30px rgba(250, 204, 21, 0.4)' : 'none',
              }}
            >
              <MessageCircle size={22} className="text-black" />
            </div>
          </div>

          {/* ===== RIGHT SIDE: CONTENT ===== */}
          <div 
            className="flex-1 p-6 md:p-8 flex flex-col justify-between relative z-0"
            style={{
              transform: isHovered ? 'translateZ(10px)' : 'translateZ(0)',
              transition: 'transform 0.5s ease-out',
            }}
          >
            {/* Top Section */}
            <div>
              {/* 3D Floating Stars */}
              <div 
                className="flex justify-end mb-4"
                style={{
                  transform: isHovered ? 'translateZ(30px)' : 'translateZ(0)',
                  transition: 'transform 0.5s ease-out',
                }}
              >
                <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-1.5 flex gap-1 backdrop-blur-sm">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>

              {/* Testimonial Text (Clamped to prevent overflow) */}
              <p className="text-white text-base md:text-lg font-semibold leading-relaxed mb-4 line-clamp-3 overflow-hidden">
                "{testimonial.message}"
              </p>
            </div>

            {/* Bottom Section - Name & Role */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div
                style={{
                  transform: isHovered ? 'translateZ(20px)' : 'translateZ(0)',
                  transition: 'transform 0.5s ease-out',
                }}
              >
                <p className="text-white font-black text-lg md:text-xl mb-1 group-hover:text-yellow-400 transition-colors">
                  {testimonial.client_name}
                </p>
                <p className="text-yellow-400/80 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                  ALBO FITNESS MEMBER
                </p>
              </div>
              
              {/* Decorative 3D Quote Mark */}
              <div 
                className="hidden md:flex w-10 h-10 rounded-full bg-yellow-400/10 border border-yellow-400/30 items-center justify-center"
                style={{
                  transform: isHovered ? 'translateZ(25px)' : 'translateZ(0)',
                  transition: 'transform 0.5s ease-out',
                }}
              >
                <span className="text-yellow-400 font-black text-lg">"</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}