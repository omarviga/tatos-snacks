import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MousePointerClick, Zap, Eye, RotateCcw } from 'lucide-react';

export default function InteractiveShowcase() {
  const [activeStory, setActiveStory] = useState<'attention' | 'kinetic'>('attention');

  return (
    <section className="py-20 bg-surface overflow-hidden border-t-2 border-tatos-dark">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          
          {/* Left Exploding Micrographic Image Column */}
          <div className="w-full md:w-1/2 relative">
            <div className="bg-primary-container/20 w-full aspect-square rounded-[60px] rotate-3 absolute -z-10 translate-x-4 border-2 border-tatos-dark" />
            
            <motion.div
              whileHover={{ scale: 1.02, rotate: -1 }}
              className="relative overflow-hidden rounded-[50px] border-4 border-tatos-dark shadow-xl"
            >
              <img
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM-aqtQVDVG9pM4jc0N8LqMQiBl0BeUwm4cg7cUIyXRvPYLS4e-US5RbF0_Zyj5kjDKL6ajVgJrDHpzrWUdt-HuOk1Encob5EJJDKtWrUX1T2B_cp_54DJKXg2VkYMkzR37fkw6jfcJHxYiwmMhjR46KcLfdCa9QKfb_XjaMSMX-zn2EkpLS6IKPbMxj6Z8kpnRsqyyJGKNoz6-rZG25JzWuEgp4YHTaNnMctKAFnnBMsmMnIRnE1mBhuUDOmNT6k5HzrMxAwYPBlQ"
                alt="Exploding Popcorn Detail"
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer object-cover aspect-square"
              />
            </motion.div>

            {/* Bottom Floating Badge Frame */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -right-6 bg-tatos-dark text-white p-5 rounded-3xl max-w-[200px] border-4 border-primary shadow-2xl"
            >
              <p className="font-headline text-3xl font-black text-primary-container leading-none">100%</p>
              <p className="font-headline text-xs font-bold leading-tight mt-1">Responsive Flavor Profile</p>
            </motion.div>
          </div>

          {/* Right Copywriting narrative Column */}
          <div className="w-full md:w-1/2 space-y-6">
            <div>
              <span className="text-flamin-orange font-headline text-xs font-black uppercase tracking-widest bg-secondary-fixed text-secondary px-3 py-1 rounded-full border border-tatos-dark">
                NUESTRO SECRETO
              </span>
              <h2 className="font-headline text-3xl md:text-5xl font-black text-tatos-dark uppercase mt-4 leading-none">
                MÁS QUE UN SIMPLE SNACK, ES UN <span className="italic underline decoration-primary decoration-4">EXPERIENCIAL.</span>
              </h2>
            </div>

            {/* Interactive Selector Tabs items */}
            <div className="space-y-4 pt-4">
              {/* Feature 1: Attention */}
              <button
                onClick={() => setActiveStory('attention')}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-4 items-start ${
                  activeStory === 'attention'
                    ? 'bg-butter-cream border-primary shadow-sm scale-[1.01] ring-2 ring-primary'
                    : 'bg-white border-tatos-dark/30 hover:border-tatos-dark'
                }`}
              >
                <div className="p-2.5 bg-primary-container text-on-primary-container border border-tatos-dark rounded-xl flex-shrink-0">
                  <Eye size={20} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-headline font-black text-sm text-tatos-dark">Captura la Atención</h4>
                  <p className="text-on-surface-variant font-sans text-xs mt-1 leading-relaxed">
                    Nuestros empaques y la intensidad del glaseado detienen el scroll diario. Cada grano es una declaración visual que grita sabor premium genuino.
                  </p>
                </div>
              </button>

              {/* Feature 2: Kinetic */}
              <button
                onClick={() => setActiveStory('kinetic')}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex gap-4 items-start ${
                  activeStory === 'kinetic'
                    ? 'bg-secondary-fixed border-flamin-orange shadow-sm scale-[1.01] ring-2 ring-flamin-orange'
                    : 'bg-white border-tatos-dark/30 hover:border-tatos-dark'
                }`}
              >
                <div className="p-2.5 bg-secondary-container text-white border border-tatos-dark rounded-xl flex-shrink-0">
                  <Zap size={20} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-headline font-black text-sm text-tatos-dark">Energía Cinética & Compromiso</h4>
                  <p className="text-on-surface-variant font-sans text-xs mt-1 leading-relaxed">
                    Recreamos la experiencia física y sonora del bocado crujiente. Desde la chispa de la apertura hasta la explosión del sabor, Tatos Snacks te mantiene en constante movimiento.
                  </p>
                </div>
              </button>
            </div>
            
            {/* Learn More link scrolling to simulator */}
            <div className="pt-4">
              <button
                onClick={() => {
                  const simulatorEl = document.getElementById('simulator');
                  if (simulatorEl) simulatorEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group flex items-center gap-2 font-headline text-xs font-black uppercase text-tatos-dark hover:text-flamin-orange transition-colors cursor-pointer"
              >
                CONOCE NUESTRO PROCESO DE POPPED 
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">trending_flat</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
