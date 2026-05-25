import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import { Sparkles, ShoppingBag, Check, CheckCircle, ChevronDown, Award, ShieldCheck, Zap, HelpCircle } from 'lucide-react';

interface HeroProps {
  onAddToCart: (product: Product) => void;
}

const FLAVOR_STYLES = {
  caramel: {
    bgClass: 'bg-[#fcf7ee]',
    accentTextClass: 'text-[#845305]',
    accentBgClass: 'bg-primary-container text-on-primary-container',
    btnBgClass: 'bg-[#785900] hover:bg-[#634900] text-white',
    borderHoverClass: 'hover:border-primary-container',
    accentHex: '#785900',
    dotBg: 'bg-[#e28a07]',
    badgeBg: 'bg-[#fff5e6] text-[#785900] border-[#fcd292]',
    glowColor: 'rgba(235, 146, 17, 0.15)',
    floatingElements: [
      { id: 'c1', emoji: '🍬', name: 'Caramelo' },
      { id: 'c2', emoji: '🍿', name: 'Mándinga' },
      { id: 'c3', emoji: '✨', name: 'Gourmet' },
      { id: 'c4', emoji: '🧈', name: 'Glaseado' },
      { id: 'c5', emoji: '🥃', name: 'Caña' }
    ]
  },
  flamin: {
    bgClass: 'bg-[#fff2f2]',
    accentTextClass: 'text-[#c21815]',
    accentBgClass: 'bg-secondary-container text-white',
    btnBgClass: 'bg-secondary hover:bg-[#9c1218] text-white',
    borderHoverClass: 'hover:border-flamin-orange',
    accentHex: '#b6171e',
    dotBg: 'bg-[#ff2222]',
    badgeBg: 'bg-[#fff0f0] text-[#c21815] border-[#fca5a5]',
    glowColor: 'rgba(255, 34, 34, 0.15)',
    floatingElements: [
      { id: 'f1', emoji: '🌶️', name: 'Chile cobán' },
      { id: 'f2', emoji: '🍋', name: 'Limón real' },
      { id: 'f3', emoji: '🔥', name: 'Fuego' },
      { id: 'f4', emoji: '🍿', name: 'Soplada' },
      { id: 'f5', emoji: '🌿', name: 'Natural' }
    ]
  },
  butter: {
    bgClass: 'bg-[#fefce8]',
    accentTextClass: 'text-[#826200]',
    accentBgClass: 'bg-butter-cream text-primary',
    btnBgClass: 'bg-[#826200] hover:bg-[#6c5100] text-white',
    borderHoverClass: 'hover:border-tertiary',
    accentHex: '#826200',
    dotBg: 'bg-[#eccd06]',
    badgeBg: 'bg-[#fefeeb] text-[#826200] border-[#fef08a]',
    glowColor: 'rgba(236, 205, 6, 0.18)',
    floatingElements: [
      { id: 'b1', emoji: '🧈', name: 'Mantequilla' },
      { id: 'b2', emoji: '🧂', name: 'Sal mina' },
      { id: 'b3', emoji: '🍿', name: 'Cine' },
      { id: 'b4', emoji: '🌾', name: 'Maíz' },
      { id: 'b5', emoji: '🥛', name: 'Crema' }
    ]
  }
};

const SIZE_OPTIONS = [
  { id: 'individual', name: 'Bolsita Individual', sizeText: '30g', price: 4.50 },
  { id: 'familiar', name: 'Bolsa Familiar', sizeText: '90g', price: 8.50 },
  { id: 'combo', name: 'Caja Regalo (3 Bolsas)', sizeText: '3x30g', price: 12.99 }
];

const floatingPositions = [
  { x: '-110%', y: '-35%', delay: 0.1, rotate: -15, scale: 1 },
  { x: '115%', y: '-30%', delay: 0.6, rotate: 20, scale: 0.95 },
  { x: '-115%', y: '40%', delay: 1.2, rotate: 12, scale: 1.1 },
  { x: '110%', y: '45%', delay: 0.4, rotate: -25, scale: 0.85 },
  { x: '0%', y: '-105%', delay: 0.9, rotate: 5, scale: 1 }
];

export default function Hero({ onAddToCart }: HeroProps) {
  const [flavorId, setFlavorId] = useState<'caramel' | 'flamin' | 'butter'>('flamin');
  const [sizeId, setSizeId] = useState<'individual' | 'familiar' | 'combo'>('individual');
  const [accordion, setAccordion] = useState<'ingredients' | 'nutrition' | 'shipping' | null>(null);

  // Retrieve matching products in catalog
  const currentProduct = PRODUCTS.find(p => p.id === flavorId) || PRODUCTS[0];
  const styles = FLAVOR_STYLES[flavorId];
  const activeSize = SIZE_OPTIONS.find(s => s.id === sizeId) || SIZE_OPTIONS[0];

  const handleBuy = () => {
    // Construct customized variant of product based on user selections
    const dynamicProduct: Product = {
      ...currentProduct,
      id: `${currentProduct.id}-${sizeId}`,
      name: `${currentProduct.name} (${activeSize.name})`,
      price: activeSize.price,
      description: `${currentProduct.description} - Presentación en tamaño ${activeSize.sizeText}.`
    };
    onAddToCart(dynamicProduct);
  };

  const toggleAccordion = (section: 'ingredients' | 'nutrition' | 'shipping') => {
    setAccordion(accordion === section ? null : section);
  };

  return (
    <header
      id="hero"
      className={`relative min-h-[95vh] flex items-center justify-center pt-24 pb-20 px-6 overflow-hidden transition-all duration-1000 ${styles.bgClass} border-b-4 border-tatos-dark`}
    >
      {/* Dynamic Ambient Color Orbit Glow behind the main package */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        <motion.div
          key={`glow-${flavorId}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1.2 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 1 }}
          className="w-[380px] md:w-[500px] aspect-square rounded-full blur-[100px]"
          style={{ backgroundColor: styles.glowColor }}
        />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#2b1b17_1.2px,transparent_1.2px)] [background-size:24px_24px]" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT 5 COLUMNS: Floating Protagonist Emphasized Packaging */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative select-none">
            
            {/* Main Package Container with interactive subtle mouse look */}
            <div className="relative w-72 sm:w-80 md:w-96 aspect-square flex items-center justify-center">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={`package-${flavorId}`}
                  initial={{ opacity: 0, scale: 0.85, y: 15, rotate: -3 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -15, rotate: 3 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                  className="relative z-10 cursor-pointer filter drop-shadow-[0_25px_45px_rgba(43,27,23,0.22)]"
                  whileHover={{ y: -6, rotate: 1.5, scale: 1.02 }}
                >
                  <img
                    referrerPolicy="no-referrer"
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    className="w-full h-auto object-contain pointer-events-none"
                  />
                  
                  {/* Glowing Spotlight element orbiting */}
                  <div className="absolute inset-0 pointer-events-none rounded-full bg-gradient-to-tr from-white/0 via-white/10 to-white/0 mix-blend-overlay" />
                </motion.div>
              </AnimatePresence>

              {/* Floating Dynamic Ingredients evokations wrapping the package */}
              <AnimatePresence mode="popLayout">
                {styles.floatingElements.map((el, index) => {
                  const pos = floatingPositions[index];
                  return (
                    <motion.div
                      key={`floating-${flavorId}-${el.id}`}
                      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      animate={{ 
                        opacity: 1, 
                        scale: pos.scale,
                        x: pos.x,
                        y: pos.y,
                        translateY: [0, -14, 0],
                        rotate: [pos.rotate, pos.rotate + 6, pos.rotate]
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{
                        initial: { duration: 0.3 },
                        animate: {
                          scale: { duration: 0.4 },
                          x: { duration: 0.5 },
                          y: { duration: 0.5 },
                          translateY: {
                            duration: 3 + index,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: pos.delay
                          },
                          rotate: {
                            duration: 4 + index,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }
                        }
                      }}
                      className="absolute z-20 bg-white/95 border-2 border-tatos-dark px-2.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 focus:outline-none"
                    >
                      <span className="text-sm md:text-base leading-none">{el.emoji}</span>
                      <span className="text-[9px] font-black uppercase tracking-wider text-tatos-dark/85 font-sans leading-none">
                        {el.name}
                      </span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Special micro-badge at center bottom */}
            <div className="mt-4 bg-tatos-dark text-[#fffcf9] border-2 border-white px-4 py-1.5 rounded-2xl text-[10px] uppercase font-black tracking-widest flex items-center gap-2 shadow z-10">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-ping" />
              🍿 ESTALLADO CON AIRE CALIENTE - CERO GRASAS
            </div>

          </div>

          {/* RIGHT 7 COLUMNS: Smart Modular Configurator Above The Fold */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Segment Flag Heading */}
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-secondary font-headline text-[10px] font-black uppercase tracking-widest bg-white border-2 border-tatos-dark px-3 py-1 rounded-full shadow-sm">
                  ⭐ SNACK EXCLUSIVO TATOS
                </span>
                
                <span className={`text-[9.5px] font-black uppercase tracking-wider border px-2.5 py-0.5 rounded-lg transition-colors duration-500 ${styles.badgeBg}`}>
                  {currentProduct.flavorNote}
                </span>
              </div>

              {/* Title & Slogan */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`titles-${flavorId}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="font-headline text-3xl sm:text-5xl md:text-[54px] font-black text-tatos-dark uppercase leading-none tracking-tight">
                    Tatos <span className="text-secondary">{currentProduct.name.split(' ')[0]}</span> <br />
                    <span className={`transition-colors duration-500 ${styles.accentTextClass}`}>Gourmet Popcorn</span>
                  </h1>
                  <p className="font-sans text-xs md:text-sm text-tatos-dark/80 leading-relaxed mt-3 max-w-xl">
                    {currentProduct.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* SEGMENT 3: Matriz de Atributos Clave (Iconografía limpia) */}
            <div className="bg-white/80 border-2 border-tatos-dark p-4 rounded-3xl grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-バター-cream bg-amber-100 flex items-center justify-center shrink-0 border border-tatos-dark/25 text-base">🍿</div>
                <div>
                  <h4 className="font-headline text-[10.5px] font-black uppercase text-tatos-dark leading-tight">Crujido Intacto</h4>
                  <p className="text-[8.5px] text-tatos-dark/60 font-medium font-sans">Envasado en Nitrógeno</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 border border-tatos-dark/25 text-base">🌿</div>
                <div>
                  <h4 className="font-headline text-[10.5px] font-black uppercase text-tatos-dark leading-tight">100% Natural</h4>
                  <p className="text-[8.5px] text-tatos-dark/60 font-medium font-sans">Sin Conservadores</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center shrink-0 border border-tatos-dark/25 text-base">🌬️</div>
                <div>
                  <h4 className="font-headline text-[10.5px] font-black uppercase text-tatos-dark leading-tight">Aire Caliente</h4>
                  <p className="text-[8.5px] text-tatos-dark/60 font-medium font-sans">Ligero y cero frituras</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0 border border-tatos-dark/25 text-base">🇲🇽</div>
                <div>
                  <h4 className="font-headline text-[10.5px] font-black uppercase text-tatos-dark leading-tight">Sabor Local</h4>
                  <p className="text-[8.5px] text-tatos-dark/60 font-medium font-sans">Hecho en México</p>
                </div>
              </div>
            </div>

            {/* SEGMENT 4: Selector de Presentación y Compra Fluida */}
            <div className="bg-white border-4 border-tatos-dark p-5 rounded-[32px] shadow-[8px_8px_0_0_#2b1b17] space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Variety state dots selector */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-black text-tatos-dark/60 tracking-wider font-headline block">
                    1. Variedad de Sabor:
                  </span>
                  
                  <div className="flex items-center gap-3 bg-[#2b1b17]/5 p-1.5 rounded-2xl border border-tatos-dark/10">
                    <button
                      id="hero-flavor-caramel"
                      onClick={() => setFlavorId('caramel')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 transition-all cursor-pointer ${
                        flavorId === 'caramel'
                          ? 'bg-white border-primary text-primary font-black scale-[1.01] shadow-sm'
                          : 'bg-transparent border-transparent text-tatos-dark/70 hover:text-tatos-dark font-bold'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-[#d97706]" />
                      <span className="text-[10px] uppercase font-headline">Caramel</span>
                    </button>

                    <button
                      id="hero-flavor-flamin"
                      onClick={() => setFlavorId('flamin')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 transition-all cursor-pointer ${
                        flavorId === 'flamin'
                          ? 'bg-white border-[#b6171e] text-[#b6171e] font-black scale-[1.01] shadow-sm'
                          : 'bg-transparent border-transparent text-tatos-dark/70 hover:text-tatos-dark font-bold'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                      <span className="text-[10px] uppercase font-headline">Flamin Hot</span>
                    </button>

                    <button
                      id="hero-flavor-butter"
                      onClick={() => setFlavorId('butter')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 transition-all cursor-pointer ${
                        flavorId === 'butter'
                          ? 'bg-white border-[#826200] text-[#826200] font-black scale-[1.01] shadow-sm'
                          : 'bg-transparent border-transparent text-tatos-dark/70 hover:text-tatos-dark font-bold'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-primary-container" />
                      <span className="text-[10px] uppercase font-headline">Butter</span>
                    </button>
                  </div>
                </div>

                {/* Size/Format option buttons */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-black text-tatos-dark/60 tracking-wider font-headline block">
                    2. Formato de Venta:
                  </span>

                  <div className="grid grid-cols-3 gap-1.5 bg-[#2b1b17]/5 p-1 rounded-xl border border-tatos-dark/10">
                    {SIZE_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        id={`hero-size-${opt.id}`}
                        onClick={() => setSizeId(opt.id as any)}
                        className={`py-2 rounded-lg border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center leading-none ${
                          sizeId === opt.id
                            ? 'bg-white border-tatos-dark text-tatos-dark font-black scale-[1.02] shadow-sm'
                            : 'bg-transparent border-transparent text-tatos-dark/60 hover:text-tatos-dark font-bold'
                        }`}
                      >
                        <span className="text-[9.5px] uppercase font-headline">{opt.name.split(' ')[0]}</span>
                        <span className="text-[7.5px] font-mono font-medium text-outline mt-0.5">{opt.sizeText}</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Purchase price breakdown & magnetic action CTA */}
              <div className="pt-3 border-t border-dashed border-tatos-dark/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                
                <div className="text-center sm:text-left">
                  <span className="text-[8px] sm:text-[9px] uppercase font-black text-tatos-dark/50 tracking-wider">PRECIO TRANSPARENTE CON ENVÍO REGULADO</span>
                  <div className="flex items-baseline gap-1 bg-neutral-50 border border-tatos-dark/10 rounded-xl px-3 py-1 mt-0.5">
                    <span className="text-[10px] text-tatos-dark/60 font-sans uppercase font-bold">Total:</span>
                    <strong className="text-lg md:text-xl font-mono font-black text-secondary">${activeSize.price.toFixed(2)} USD</strong>
                    <span className="text-[9px] text-tatos-dark/40 font-sans">/ {activeSize.sizeText}</span>
                  </div>
                </div>

                <motion.button
                  id="hero-buy-cta"
                  onClick={handleBuy}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className={`w-full sm:w-auto px-8 py-4.5 rounded-2xl font-headline text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 tatos-btn-shadow transition-all duration-500 ease-out cursor-pointer ${styles.btnBgClass}`}
                >
                  <ShoppingBag size={14} className="stroke-[2.5]" />
                  AÑADIR AL CARRITO · ${(activeSize.price).toFixed(2)} USD
                </motion.button>

              </div>

            </div>

            {/* SEGMENT 5: Acordeones Desplegables para Información Técnica */}
            <div className="border bg-white/60 border-tatos-dark/25 rounded-3xl overflow-hidden divide-y divide-tatos-dark/15">
              
              {/* Accordion 1: Ingredients */}
              <div className="transition-colors">
                <button
                  id="accordion-ingredients"
                  onClick={() => toggleAccordion('ingredients')}
                  className="w-full flex items-center justify-between px-5 py-3.5 text-left font-headline text-xs font-black uppercase text-tatos-dark hover:bg-white/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">🌱 INGREDIENTES 100% SELECCIONADOS</span>
                  <motion.div animate={{ rotate: accordion === 'ingredients' ? 180 : 0 }}>
                    <ChevronDown size={14} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {accordion === 'ingredients' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-white/90"
                    >
                      <div className="p-5 font-sans text-xs text-tatos-dark/80 tracking-normal space-y-2">
                        <p className="leading-relaxed">
                          Nuestra receta no esconde nada. Descartamos saborizantes artificiales industriales de baja fidelidad y seleccionamos materias primas de grado de origen:
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {currentProduct.ingredients?.map((ing, i) => (
                            <span key={i} className="bg-neutral-100 border border-tatos-dark/10 px-2.5 py-1 rounded-full text-[10px] text-tatos-dark font-medium leading-none">
                              🌽 {ing}
                            </span>
                          ))}
                        </div>
                        <p className="text-[9.5px] text-primary italic pt-1 leading-snug">
                          ✔️ Certificado Libre de Gluten, Sin organismos modificados genéticamente (No-OGM), y apto para toda la familia.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion 2: Nutrition table */}
              <div className="transition-colors">
                <button
                  id="accordion-nutrition"
                  onClick={() => toggleAccordion('nutrition')}
                  className="w-full flex items-center justify-between px-5 py-3.5 text-left font-headline text-xs font-black uppercase text-tatos-dark hover:bg-white/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">📊 FICHA NUTRIMENTAL POR PORCIÓN</span>
                  <motion.div animate={{ rotate: accordion === 'nutrition' ? 180 : 0 }}>
                    <ChevronDown size={14} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {accordion === 'nutrition' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-white/90"
                    >
                      <div className="p-5 font-headline space-y-3 text-xs">
                        <div className="border-4 border-tatos-dark rounded-2xl p-4 bg-yellow-50/20">
                          <h4 className="font-extrabold text-[11px] border-b-2 border-tatos-dark pb-1 text-center font-black uppercase select-none">Fórmula Nutrimental Clara</h4>
                          
                          <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-3 text-[11px] font-sans">
                            {currentProduct.nutrition && Object.entries(currentProduct.nutrition).map(([key, value]) => (
                              <div key={key} className="flex justify-between border-b border-tatos-dark/15 py-1">
                                <span className="text-tatos-dark/60 font-bold uppercase text-[9px]">{key}:</span>
                                <strong className="text-tatos-dark font-black font-mono">{value}</strong>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion 3: Logistics notes */}
              <div className="transition-colors">
                <button
                  id="accordion-shipping"
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full flex items-center justify-between px-5 py-3.5 text-left font-headline text-xs font-black uppercase text-tatos-dark hover:bg-white/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">🚚 ENVÍOS, DESPACHOS Y DEVOLUCIONES</span>
                  <motion.div animate={{ rotate: accordion === 'shipping' ? 180 : 0 }}>
                    <ChevronDown size={14} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {accordion === 'shipping' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-white/90"
                    >
                      <div className="p-5 font-sans text-xs text-tatos-dark/80 leading-relaxed space-y-3">
                        <p>
                          📦 <strong>Tiempos de Entrega:</strong> Despachamos tu pedido en menos de 24 horas después de validada tu transacción. Recibe cómodamente vía Estafeta, FedEx o DHL en tu domicilio en un plazo de <strong>24 a 72 horas hábiles</strong>.
                        </p>
                        <p>
                          ✨ <strong>Envío Gratis:</strong> Todas las compras que superen un monto total de <strong>$35.00 USD</strong> obtienen envío exprés completamente gratis aplicable de forma automática al checkout.
                        </p>
                        <p>
                          ♻️ <strong>Garantía de Satisfacción:</strong> Si notas algún desperfecto en los empaques de nitrógeno o el crujido no es majestuoso, contáctanos antes de 5 días hábiles y te reintegramos el dinero o despachamos una caja de repuesto sin costo extra.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
