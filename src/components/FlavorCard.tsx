import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { Sparkles, ShoppingCart, FileText } from 'lucide-react';

interface FlavorCardProps {
  key?: React.Key;
  product: Product;
  onAddToCart: (product: Product) => void;
  index: number;
}

export default function FlavorCard({ product, onAddToCart, index }: FlavorCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [showSpecs, setShowSpecs] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Tilt calculations (-12deg to 12deg range)
    const rotateX = (centerY - y) / 12;
    const rotateY = (x - centerX) / 12;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Rhythm offset: second card translates slightly lower on desktop grids
  const isOffsetOffset = index === 1;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.08,
        layout: { type: 'spring', stiffness: 300, damping: 30 }
      }}
      className={`h-full ${isOffsetOffset ? 'md:translate-y-12' : ''}`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)'
        }}
        className={`relative bg-white border-4 border-tatos-dark p-6 md:p-8 rounded-[40px] shadow-md hover:shadow-xl hover:border-primary-container transition-shadow group flex flex-col justify-between h-full ${
          isOffsetOffset ? 'border-flamin-orange hover:border-flamin-orange' : ''
        }`}
      >
      {/* Visual illustration top frame wrapper */}
      <div className={`aspect-square ${product.bgColorClass} border-2 border-tatos-dark rounded-3xl overflow-hidden mb-6 flex items-center justify-center relative select-none p-4`}>
        <img
          referrerPolicy="no-referrer"
          src={product.image}
          alt={product.name}
          className="w-4/5 h-auto transition-transform duration-500 ease-out group-hover:scale-115 group-hover:rotate-6 drop-shadow-xl"
        />
        
        {/* Variety Symbol Badge */}
        {product.iconName && (
          <div className={`absolute top-4 right-4 ${product.iconColorClass}`}>
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              {product.iconName}
            </span>
          </div>
        )}

        {/* Sensory Tag Sticker floating at top left */}
        {product.flavorNote && (
          <div className="absolute top-4 left-4 bg-tatos-dark/95 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border border-white/20">
            {product.flavorNote}
          </div>
        )}
      </div>

      {/* Info context layer with smooth layout morph */}
      <div className="flex-grow flex flex-col justify-between min-h-[220px]">
        <AnimatePresence mode="wait">
          {showSpecs ? (
            <motion.div
              key="specs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-grow flex flex-col justify-between space-y-3 pt-1"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-secondary tracking-wider block mb-1">🌽 Ingredientes Reales:</span>
                <div className="flex flex-wrap gap-1">
                  {product.ingredients?.map((ing, i) => (
                    <span key={i} className="bg-[#2b1b17]/5 text-tatos-dark text-[9px] px-2.5 py-1 rounded-full border border-tatos-dark/15 font-sans leading-none font-medium">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-b border-dashed border-tatos-dark/20 py-2">
                <span className="text-[10px] uppercase font-bold text-secondary tracking-wider block mb-1">📋 Ficha Nutrimental (por 30g):</span>
                <div className="grid grid-cols-3 gap-1">
                  {product.nutrition && Object.entries(product.nutrition).map(([key, value]) => (
                    <div key={key} className="bg-white px-1.5 py-1 text-center rounded-xl border-2 border-tatos-dark/10">
                      <div className="text-secondary font-headline text-[10px] font-black leading-tight">{value}</div>
                      <div className="text-[7.5px] text-outline truncate font-sans uppercase font-bold text-tatos-dark/60">{key}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-primary tracking-wider block mb-0.5">✨ Sabor Sensorial:</span>
                <p className="italic text-[10.5px] text-tatos-dark/80 leading-snug font-serif">
                  "{product.sensoryDescription}"
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="desc"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-grow flex flex-col"
            >
              <h3 className="font-headline text-2xl font-black text-tatos-dark leading-tight">
                {product.name}
              </h3>
              <p className="text-on-surface-variant font-sans text-xs md:text-sm leading-relaxed mt-2 text-tatos-dark/80 flex-grow">
                {product.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pricing & Controls Area */}
        <div className="space-y-4 pt-4 border-t border-tatos-dark/10">
          
          <div className="flex justify-between items-center bg-surface-container-low border border-tatos-dark/25 p-2 px-3 rounded-2xl">
            {/* Specs Toggle Selector */}
            <button
              id={`specs-toggle-${product.id}`}
              onClick={(e) => {
                e.stopPropagation();
                setShowSpecs(!showSpecs);
              }}
              className="text-[9px] font-black uppercase text-secondary hover:text-primary transition-colors flex items-center gap-1 cursor-pointer focus:outline-none bg-white py-1 px-2.5 border border-tatos-dark/20 hover:border-secondary rounded-lg"
            >
              📊 {showSpecs ? 'Descripción' : 'Ingredientes / Nutrición'}
            </button>
            <span className="font-mono text-xs md:text-sm font-black text-secondary bg-white px-2.5 py-1 border border-tatos-dark/20 rounded-lg">${product.price.toFixed(2)} USD</span>
          </div>

          <button
            id={`add-to-cart-${product.id}`}
            onClick={() => onAddToCart(product)}
            className="w-full bg-butter-cream text-primary py-3 rounded-xl font-headline text-xs font-black uppercase border-2 border-primary hover:bg-primary hover:text-white hover:border-tatos-dark active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm hover:shadow"
          >
            <ShoppingCart size={13} />
            AGREGAR BOLSITA
          </button>
        </div>
      </div>
      </div>
    </motion.div>
  );
}
