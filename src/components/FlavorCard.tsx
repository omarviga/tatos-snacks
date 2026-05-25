import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { Sparkles, ShoppingCart } from 'lucide-react';

interface FlavorCardProps {
  key?: React.Key;
  product: Product;
  onAddToCart: (product: Product) => void;
  index: number;
}

export default function FlavorCard({ product, onAddToCart, index }: FlavorCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

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
      </div>

      {/* Info context layer */}
      <div className="flex-grow flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-headline text-2xl font-black text-tatos-dark leading-tight">
            {product.name.split(' ')[0]}
          </h3>
          <p className="text-on-surface-variant font-sans text-xs md:text-sm leading-relaxed mt-1.5 flex-grow">
            {product.description}
          </p>
        </div>

        {/* Pricing & Add row */}
        <div className="space-y-4 pt-2">
          <div className="flex justify-between items-center bg-surface-container-low border border-tatos-dark/25 p-2 px-3 rounded-2xl">
            <span className="text-[10px] text-outline font-black uppercase">Precio individual:</span>
            <span className="font-mono text-base font-black text-secondary">${product.price.toFixed(2)} USD</span>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-butter-cream text-primary py-3.5 rounded-xl font-headline text-xs font-black uppercase border-2 border-primary group-hover:bg-primary group-hover:text-white group-hover:border-tatos-dark active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <ShoppingCart size={14} />
            ADD TO CART
          </button>
        </div>
      </div>
      </div>
    </motion.div>
  );
}
