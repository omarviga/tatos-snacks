import React from 'react';
import { motion } from 'motion/react';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import { Sparkles, ShoppingCart, Plus, ArrowRight } from 'lucide-react';

interface CrossSellingProps {
  onAddToCart: (product: Product) => void;
}

export default function CrossSelling({ onAddToCart }: CrossSellingProps) {
  // We can show premium smart cross-sell options
  const crossSellMocks = [
    {
      productId: 'caramel',
      title: '¿Te queda espacio para algo dulce? 🍬',
      flavorQuote: 'Gourmet Caramel',
      badge: 'PROBAR DULCE',
      badgeBg: 'bg-[#fff5e6] text-[#785900] border-[#fcd292]',
      teaser: 'Nuestro Caramel artesanal cocinado en cazo de cobre equilibra el fuego con un crunch majestuoso.'
    },
    {
      productId: 'flamin',
      title: '¿Te atreves con fuego y cítricos? 🌶️',
      flavorQuote: 'Flamin Hot Explosiva',
      badge: 'PROBAR PICANTE',
      badgeBg: 'bg-[#fff0f0] text-[#c21815] border-[#fca5a5]',
      teaser: 'Balance sublime de chiles ahumados molidos y bruma de limón real para despertar tus sentidos.'
    },
    {
      productId: 'butter',
      title: '¿Buscas la nostalgia de la gran pantalla? 🍿',
      flavorQuote: 'Mantequilla de Rancho',
      badge: 'PROBAR CLÁSICA',
      badgeBg: 'bg-[#fefeeb] text-[#826200] border-[#fef08a]',
      teaser: 'Hecha con pura mantequilla clarificada premium Ghee para una textura mullida y salada legendaria.'
    }
  ];

  const handleQuickAdd = (id: string) => {
    const match = PRODUCTS.find((p) => p.id === id);
    if (match) {
      onAddToCart(match);
    }
  };

  return (
    <section className="py-20 bg-[#fbf5ee] border-t-2 border-b-2 border-tatos-dark relative overflow-hidden">
      {/* Structural subtle grids */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#2b1b17_1.2px,transparent_1.2px)] [background-size:20px_20px]" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Banner header layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-secondary font-headline text-[10px] font-black uppercase tracking-widest bg-white border-2 border-tatos-dark px-3 py-1 rounded-full shadow-sm">
              ⚡ CROSS-SELLING GOURMET
            </span>
            <h2 className="font-headline text-3xl md:text-4xl font-black text-tatos-dark uppercase mt-3 leading-none">
              Completa Tu <span className="text-secondary">Combo Perfecto</span>
            </h2>
            <p className="font-sans text-xs text-tatos-dark/70 leading-relaxed mt-1.5 max-w-lg">
              Los verdaderos conocedores de snacks no compran un solo sabor. Mezcla dulce, picante y salado para un carrusel sensorial de antojos.
            </p>
          </div>
          
          <button
            onClick={() => {
              const b = document.getElementById('bundles-interactive');
              if (b) b.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs font-black uppercase tracking-widest text-[#2b1b17] hover:text-[#bd6443] transition-colors flex items-center gap-1.5 font-headline underline focus:outline-none shrink-0 cursor-pointer"
          >
            Diseñar Multipack a medida <ArrowRight size={13} />
          </button>
        </div>

        {/* Dynamic horizontal card grid shelf */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {crossSellMocks.map((card) => {
            const productMatch = PRODUCTS.find((p) => p.id === card.productId);
            if (!productMatch) return null;

            return (
              <motion.div
                key={card.productId}
                id={`cross-sell-${card.productId}`}
                whileHover={{ y: -4 }}
                className="bg-white border-4 border-tatos-dark rounded-[32px] p-6 flex flex-col justify-between shadow-[6px_6px_0_0_#2b1b17] hover:shadow-[10px_10px_0_0_#2b1b17] transition-all relative group"
              >
                {/* Floating Bag Micro Thumbnail overlap top corner */}
                <div className="absolute top-4 right-4 w-16 h-16 pointer-events-none select-none drop-shadow-md group-hover:scale-110 group-hover:-rotate-6 transition-all">
                  <img
                    referrerPolicy="no-referrer"
                    src={productMatch.image}
                    alt={productMatch.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="space-y-3 pr-12">
                  <span className={`text-[9px] font-black uppercase tracking-wider border px-2.5 py-0.5 rounded-lg inline-block ${card.badgeBg}`}>
                    {card.badge}
                  </span>
                  
                  <h3 className="font-headline text-base font-black text-tatos-dark leading-snug">
                    {card.title}
                  </h3>
                  
                  <p className="font-sans text-[11px] text-tatos-dark/75 leading-relaxed">
                    {card.teaser}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-dashed border-tatos-dark/15 flex items-center justify-between gap-2.5">
                  <div className="font-mono text-xs font-bold text-tatos-dark/80 bg-neutral-100 px-2 py-1 rounded-lg">
                    ${productMatch.price.toFixed(2)} USD
                  </div>

                  <button
                    id={`btn-cross-sell-${card.productId}`}
                    onClick={() => handleQuickAdd(card.productId)}
                    className="bg-[#2b1b17] hover:bg-secondary text-white font-headline text-[10px] font-black uppercase px-4 py-2.5 rounded-xl border border-tatos-dark flex items-center gap-1.5 focus:outline-none cursor-pointer transition-colors"
                  >
                    <Plus size={11} className="stroke-[3]" />
                    Agregar Al Paso
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
