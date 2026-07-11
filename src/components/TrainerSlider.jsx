import React, { useState, useEffect, useRef } from "react";
import { Award, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "../services/supabase";

export default function TrainerSlider() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    fetchTrainers();
  }, []);

  // Premium 3D Scroll Effect Logic
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || trainers.length === 0) return;

    const handleScroll = () => {
      const cards = slider.querySelectorAll(".trainer-card");
      const sliderCenter = slider.scrollLeft + slider.offsetWidth / 2;

      cards.forEach((card) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(sliderCenter - cardCenter);
        const maxDistance = slider.offsetWidth / 2;

        // Normalize distance from 0 (center) to 1 (edge)
        const progress = Math.min(distance / maxDistance, 1);

        // Calculate 3D Transform Values
        const scale = 1.15 - progress * 0.35; // 1.15 at center, 0.8 at edges
        const opacity = 1 - progress * 0.6;   // 1 at center, 0.4 at edges
        const direction = cardCenter < sliderCenter ? 1 : -1;
        const rotateY = progress * 25 * direction; // Rotates inwards towards center
        const liftUp = -(1 - progress) * 15; // Center card lifts up 15px

        // Apply transforms
        card.style.transform = `scale(${scale}) rotateY(${rotateY}deg) translateY(${liftUp}px)`;
        card.style.opacity = opacity;
        card.style.zIndex = Math.round((1 - progress) * 10);

        // Apply Premium Glow to the exact center card
        if (progress < 0.1) {
          card.style.boxShadow = "0 25px 60px -10px rgba(250, 204, 21, 0.35)";
          card.style.borderColor = "rgba(250, 204, 21, 1)";
        } else {
          card.style.boxShadow = "0 15px 30px -5px rgba(0, 0, 0, 0.6)";
          card.style.borderColor = "rgba(31, 41, 55, 1)"; // gray-800
        }
      });
    };

    // Attach listeners
    slider.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    
    // Initial call to set positions on load
    setTimeout(handleScroll, 50); 

    return () => {
      slider.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [trainers]);

  async function fetchTrainers() {
    try {
      const { data, error } = await supabase.from("trainers").select("*").order("id");
      if (error) throw error;
      setTrainers(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleTrainerClick(trainer) {
    window.selectedTrainer = trainer;
    const contact = document.getElementById("contact");
    if (contact) contact.scrollIntoView({ behavior: "smooth" });
  }

  function scrollLeft() {
    sliderRef.current?.scrollBy({ left: -380, behavior: "smooth" });
  }

  function scrollRight() {
    sliderRef.current?.scrollBy({ left: 380, behavior: "smooth" });
  }

  if (loading) {
    return <div className="py-24 text-center text-gray-400">Loading Trainers...</div>;
  }

  if (!trainers.length) {
    return <div className="py-24 text-center text-gray-500">No Trainers Available</div>;
  }

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Premium Background Depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-400/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[4px] text-yellow-400 font-bold mb-3">Expert Team</p>
          <h2 className="text-5xl md:text-6xl font-black text-white drop-shadow-[0_4px_10px_rgba(250,204,21,0.15)]">
            MEET OUR TRAINERS
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mt-5 shadow-[0_0_15px_rgba(250,204,21,0.5)]"></div>
        </div>

        <div className="relative">
          {/* Left Nav */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-black/80 backdrop-blur-md border border-white/10 hover:bg-yellow-400 hover:border-yellow-400 hover:text-black transition-all shadow-2xl flex items-center justify-center group"
          >
            <ChevronLeft size={22} className="group-hover:scale-110 transition-transform" />
          </button>

          {/* 3D Slider Container */}
          <div
            ref={sliderRef}
            className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar py-12 px-[35%] md:px-[40%]"
            style={{ 
              perspective: "1500px",
              scrollbarWidth: "none", 
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch"
            }}
          >
            {trainers.map((trainer) => (
              <div
                key={trainer.id}
                onMouseEnter={() => setHoveredId(trainer.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleTrainerClick(trainer)}
                className="trainer-card flex-shrink-0 w-[320px] cursor-pointer group transition-all duration-200 ease-out"
                style={{ transformOrigin: "center center" }}
              >
                <div className="bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-3xl border-2 border-gray-800 transition-all duration-500 overflow-hidden flex flex-col h-[520px] backdrop-blur-xl">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-gray-800">
                    {trainer.photo_url ? (
                      <img
                        src={trainer.photo_url}
                        alt={trainer.name}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                          hoveredId === trainer.id ? "scale-110" : "scale-100"
                        }`}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">No Photo</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
                    
                    {/* Floating 3D Badge */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-yellow-400/30 rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                      <Award className="text-yellow-400" size={14} />
                      <span className="text-[10px] uppercase text-yellow-300 font-black">Pro</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <p className="uppercase tracking-[3px] text-[10px] text-yellow-400 font-bold">
                      {trainer.specialization || "Expert Trainer"}
                    </p>
                    <h3 className="text-2xl font-black text-white mt-2 group-hover:text-yellow-400 transition-colors">
                      {trainer.name}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-3 mt-5 mb-4">
                      <div className="bg-black/40 border border-white/5 rounded-xl p-3 text-center">
                        <p className="text-[9px] text-gray-400 uppercase font-bold">Experience</p>
                        <p className="text-xl font-black text-white mt-1">
                          {trainer.experience_years || 0}<span className="text-xs text-yellow-400">+</span>
                        </p>
                      </div>
                      <div className="bg-black/40 border border-white/5 rounded-xl p-3 text-center">
                        <p className="text-[9px] text-gray-400 uppercase font-bold">Clients</p>
                        <p className="text-xl font-black text-white mt-1">
                          500<span className="text-xs text-yellow-400">+</span>
                        </p>
                      </div>
                    </div>

                    {trainer.bio && (
                      <p className="text-xs text-gray-400 italic leading-relaxed mb-5 line-clamp-2">
                        "{trainer.bio}"
                      </p>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTrainerClick(trainer);
                      }}
                      className="mt-auto w-full bg-yellow-400 hover:bg-yellow-300 text-black py-3 rounded-xl font-black uppercase flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-yellow-400/20 hover:scale-[1.02]"
                    >
                      <Zap size={18} className="fill-black" />
                      Train Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Nav */}
          <button
            onClick={scrollRight}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-black/80 backdrop-blur-md border border-white/10 hover:bg-yellow-400 hover:border-yellow-400 hover:text-black transition-all shadow-2xl flex items-center justify-center group"
          >
            <ChevronRight size={22} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}