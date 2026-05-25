import React from 'react';
import { TESTIMONIALS } from '../data';
import { Star, MessageCircle } from 'lucide-react';

export default function SocialProof() {
  // Multiply the lists to ensure the loop repeats with no whitespace gaps
  const doubledTribe = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-20 bg-[#2b1b17] text-white overflow-hidden relative border-t-2 border-b-2 border-tatos-dark">
      {/* Background visual grain mesh */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(#ffc107 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px"
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-white border border-outline-variant/30 text-[10px] font-black uppercase tracking-wider mb-3">
          <MessageCircle size={10} />
          COMUNIDAD TATOS
        </div>
        <h2 className="font-headline text-3xl md:text-5xl font-black text-white uppercase leading-none">
          Únete a la <span className="text-primary-container">Tribe de Tatos</span>
        </h2>
        <p className="text-surface-variant/70 font-sans text-xs md:text-sm max-w-lg mx-auto mt-2">
          Mira por qué los fanáticos del crunch alrededor del globo están descartando las bolsas pálidas genéricas.
        </p>
      </div>

      {/* Infinite scrolling marquee wrapper */}
      <div className="relative flex overflow-x-hidden py-4 border-y border-outline/10 bg-[#201b11]/30">
        <div className="animate-marquee flex gap-6 whitespace-nowrap pr-6">
          {doubledTribe.map((member, idx) => (
            <div
              key={`${member.handle}-${idx}`}
              className="w-72 md:w-80 h-96 bg-surface-container rounded-[40px] flex-shrink-0 relative overflow-hidden group border-2 border-tatos-dark shadow text-tatos-dark"
            >
              {/* Profile Background Image */}
              <img
                referrerPolicy="no-referrer"
                src={member.image}
                alt={member.handle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* High Contrast Sticker Card */}
              <div className="absolute bottom-4 inset-x-4 p-4 bg-white/90 backdrop-blur-md rounded-2xl border-2 border-tatos-dark shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-headline font-black text-xs md:text-sm text-secondary">
                      {member.handle}
                    </span>
                    <div className="flex gap-0.5 text-primary-container">
                      <Star size={12} fill="currentColor" className="stroke-tatos-dark stroke-[2]" />
                      <Star size={12} fill="currentColor" className="stroke-tatos-dark stroke-[2]" />
                      <Star size={12} fill="currentColor" className="stroke-tatos-dark stroke-[2]" />
                      <Star size={12} fill="currentColor" className="stroke-tatos-dark stroke-[2]" />
                      <Star size={12} fill="currentColor" className="stroke-tatos-dark stroke-[2]" />
                    </div>
                  </div>
                  <p className="text-on-surface-variant text-[11px] font-sans font-medium leading-relaxed whitespace-normal line-clamp-3">
                    "{member.quote}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
