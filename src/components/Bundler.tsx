import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import { Sparkles, ShoppingCart, Plus, Minus, Info } from 'lucide-react';

interface BundlerProps {
  onAddCustomBundle: (bundleName: string, price: number, selections: { [key: string]: number }, image: string) => void;
}

export default function Bundler({ onAddCustomBundle }: BundlerProps) {
  const [packSize, setPackSize] = useState<4 | 6>(4);
  const [selections, setSelections] = useState<Record<string, number>>({
    caramel: 2,
    flamin: 1,
    butter: 1
  });

  const individualFlavors = PRODUCTS.filter(p => p.category === 'individual');

  const totalBagsSelected = (Object.values(selections) as number[]).reduce((acc: number, val: number) => acc + val, 0);
  const currentPrice = packSize === 4 ? 14.99 : 19.99;
  const isComplete = totalBagsSelected === packSize;

  const handleAdjust = (flavorId: string, delta: number) => {
    const currentCount = selections[flavorId] || 0;
    const newCount = currentCount + delta;

    if (newCount < 0) return;
    
    // Check if adding exceeds the planned pack size
    if (delta > 0 && totalBagsSelected >= packSize) {
      // Automatic subtraction from another flavor if we want to auto-swap, or just block
      return;
    }

    setSelections(prev => ({
      ...prev,
      [flavorId]: newCount
    }));
  };

  const handlePackSizeChange = (newSize: 4 | 6) => {
    setPackSize(newSize);
    
    // Auto reset to standard balanced distributions
    if (newSize === 4) {
      setSelections({ caramel: 2, flamin: 1, butter: 1 });
    } else {
      setSelections({ caramel: 2, flamin: 2, butter: 2 });
    }
  };

  const handleAddBundleToCart = () => {
    if (!isComplete) return;

    // Build description selection summary
    const selectionSummary = (Object.entries(selections) as [string, number][])
      .filter(([_, count]) => count > 0)
      .map(([id, count]) => {
        const flavor = individualFlavors.find(f => f.id === id);
        return `${count}x ${flavor?.name.split(' ')[0]}`;
      })
      .join(', ');

    const bundleName = `Caja Personalizada de ${packSize} Bolsas (${selectionSummary})`;
    
    // Anchor pack image based on dominant flavor or first flavor
    const dominantFlavorId = (Object.entries(selections) as [string, number][]).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
    const dominantFlavor = individualFlavors.find(f => f.id === dominantFlavorId);
    const bundleImage = dominantFlavor ? dominantFlavor.image : PRODUCTS[3].image;

    onAddCustomBundle(bundleName, currentPrice, selections, bundleImage);
  };

  return (
    <section id="bundles-interactive" className="py-20 bg-surface-container relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary-container border border-tatos-dark text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles size={12} />
            MÉTODO CREATIVO
          </div>
          <h2 className="font-headline text-4xl md:text-5xl font-black text-tatos-dark uppercase leading-none">
            Crea tu Propio <span className="text-secondary">Crunch Pack</span>
          </h2>
          <p className="max-w-xl mx-auto text-on-surface-variant font-sans text-sm md:text-base mt-2">
            Mezcla a tu antojo. Combina tus sabores favoritos de Tatos Snacks y ahorra en grande en tu caja especial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Left Config Panel */}
          <div className="md:col-span-7 bg-white border-4 border-tatos-dark rounded-3xl p-6 md:p-8 shadow-lg flex flex-col justify-between">
            <div>
              {/* Step 1: Select Pack Size */}
              <div className="space-y-3 mb-8">
                <span className="font-headline text-xs font-black uppercase text-outline flex items-center gap-1.5">
                  <span className="w-5 h-5 bg-tatos-dark text-white rounded-full flex items-center justify-center font-bold">1</span>
                  Selecciona el tamaño de tu caja:
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handlePackSizeChange(4)}
                    className={`p-4 border-2 rounded-2xl flex flex-col justify-center items-center text-center transition-all ${
                      packSize === 4
                        ? 'bg-butter-cream border-primary scale-[1.03] shadow-md ring-2 ring-primary'
                        : 'border-outline hover:border-tatos-dark hover:bg-surface'
                    }`}
                  >
                    <span className="font-headline text-xl font-black text-tatos-dark">4 Pack</span>
                    <span className="font-sans text-xs text-on-surface-variant mt-0.5">4 bolsas gigantes</span>
                    <span className="font-mono text-sm font-bold text-secondary mt-1.5">$14.99 USD</span>
                  </button>

                  <button
                    onClick={() => handlePackSizeChange(6)}
                    className={`p-4 border-2 rounded-2xl flex flex-col justify-center items-center text-center transition-all ${
                      packSize === 6
                        ? 'bg-butter-cream border-primary scale-[1.03] shadow-md ring-2 ring-primary'
                        : 'border-outline hover:border-tatos-dark hover:bg-surface'
                    }`}
                  >
                    <span className="font-headline text-xl font-black text-tatos-dark">6 Pack</span>
                    <span className="font-sans text-xs text-on-surface-variant mt-0.5">6 bolsas gigantes</span>
                    <span className="font-mono text-sm font-bold text-secondary mt-1.5">$19.99 USD</span>
                  </button>
                </div>
              </div>

              {/* Step 2: Mix & Match */}
              <div className="space-y-4">
                <span className="font-headline text-xs font-black uppercase text-outline flex items-center gap-1.5">
                  <span className="w-5 h-5 bg-tatos-dark text-white rounded-full flex items-center justify-center font-bold">2</span>
                  Mezcla y combina los sabores:
                </span>

                <div className="space-y-3">
                  {individualFlavors.map((flavor) => {
                    const count = selections[flavor.id] || 0;
                    return (
                      <div
                        key={flavor.id}
                        className="flex items-center justify-between p-3 bg-surface-container rounded-2xl border border-tatos-dark/40"
                      >
                        {/* Flavor Badge info */}
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 ${flavor.bgColorClass} rounded-xl border border-tatos-dark overflow-hidden flex items-center justify-center p-1 flex-shrink-0`}>
                            <img
                              referrerPolicy="no-referrer"
                              src={flavor.image}
                              alt={flavor.name}
                              className="h-full w-auto object-contain drop-shadow"
                            />
                          </div>
                          <div>
                            <h4 className="font-headline font-bold text-sm text-tatos-dark">{flavor.name}</h4>
                            <span className="font-mono text-[10px] text-on-surface-variant font-bold leading-none bg-white border border-tatos-dark/30 px-1.5 py-0.5 rounded-full inline-block mt-0.5">
                              {flavor.id === 'caramel' ? 'Dulce Caramelo' : flavor.id === 'flamin' ? 'Fuego Explosivo' : 'Mantequilla Pura'}
                            </span>
                          </div>
                        </div>

                        {/* Adjusters */}
                        <div className="flex items-center gap-2.5">
                          <button
                            onClick={() => handleAdjust(flavor.id, -1)}
                            disabled={count === 0}
                            className={`w-8 h-8 rounded-full border border-tatos-dark flex items-center justify-center bg-white shadow-sm transition-opacity active:translate-y-0.5 ${
                              count === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-secondary-fixed'
                            }`}
                          >
                            <Minus size={14} className="text-tatos-dark stroke-[3]" />
                          </button>
                          <span className="font-mono text-base font-black w-6 text-center text-tatos-dark">
                            {count}
                          </span>
                          <button
                            onClick={() => handleAdjust(flavor.id, 1)}
                            disabled={totalBagsSelected >= packSize}
                            className={`w-8 h-8 rounded-full border border-tatos-dark flex items-center justify-center bg-white shadow-sm transition-opacity active:translate-y-0.5 ${
                              totalBagsSelected >= packSize ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#a5eeff]'
                            }`}
                          >
                            <Plus size={14} className="text-tatos-dark stroke-[3]" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Selection Info Footer */}
            <div className="mt-8 pt-4 border-t border-dashed border-outline flex items-center gap-3 bg-surface-container-low p-3.5 rounded-xl border border-tatos-dark">
              <Info size={18} className="text-primary flex-shrink-0" />
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Selecciona exactamente <strong className="text-tatos-dark">{packSize} bolsas</strong> en total. Tu caja actual tiene <strong className="text-tatos-dark">{totalBagsSelected} / {packSize} bolsas</strong> listadas.
              </p>
            </div>
          </div>

          {/* Right Product Preview Card */}
          <div className="md:col-span-5 bg-tatos-dark text-white border-4 border-tatos-dark rounded-3xl p-6 md:p-8 flex flex-col justify-between items-center text-center relative overflow-hidden shadow-2xl">
            {/* Visual background lines */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="w-full h-full" style={{ backgroundImage: "radial-gradient(ellipse at center, #ffc107 10%, transparent 80%)" }} />
            </div>

            <div className="relative z-10 w-full">
              <span className="text-[10px] text-primary-container font-black uppercase tracking-widest border border-primary bg-[#6d5100]/40 px-2.5 py-1 rounded-full">
                Vista de tu Multipack
              </span>
              <h3 className="font-headline text-3xl font-black uppercase text-white mt-4">Tatos Custom</h3>
              <p className="text-xs text-surface-variant/70 font-sans mt-1">
                Combinación lista para producción.
              </p>

              {/* Center bags mockup visual overlap */}
              <div className="relative h-44 w-full flex items-center justify-center my-6">
                {totalBagsSelected === 0 ? (
                  <div className="text-center p-4 border border-dashed border-outline-variant rounded-2xl w-full h-full flex flex-col items-center justify-center text-surface-variant/40">
                    <span className="material-symbols-outlined text-4xl">production_quantity_limits</span>
                    <p className="text-xs mt-2 font-headline uppercase font-bold">Sin elementos</p>
                  </div>
                ) : (
                  <div className="flex justify-center items-center -space-x-12">
                    {/* Render bags selected based on selections */}
                    {(Object.entries(selections) as [string, number][]).map(([flavorId, count]) => {
                      const flavor = PRODUCTS.find(f => f.id === flavorId);
                      if (!flavor || count === 0) return null;
                      return Array.from({ length: Math.min(count, 3) }).map((_, index) => {
                        // Spread rotation and scaling
                        const rotate = (index * 4) - 6 + (flavorId === 'flamin' ? 8 : flavorId === 'butter' ? -8 : 0);
                        return (
                          <motion.img
                            key={`${flavorId}-${index}`}
                            referrerPolicy="no-referrer"
                            src={flavor.image}
                            alt=""
                            className="w-24 h-auto drop-shadow-2xl flex-shrink-0"
                            animate={{ rotate, y: [0, -6, 0] }}
                            transition={{
                              duration: 5,
                              repeat: Infinity,
                              repeatType: 'reverse',
                              delay: index * 0.4
                            }}
                          />
                        );
                      });
                    })}
                  </div>
                )}
              </div>

              {/* Items badge grid breakdown */}
              <div className="space-y-1 bg-[#201b11]/80 border border-outline-variant/20 p-3 rounded-2xl text-left">
                <span className="text-[9px] text-outline font-black uppercase">Resumen:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {(Object.entries(selections) as [string, number][]).map(([flavorId, count]) => {
                    if (count === 0) return null;
                    const name = flavorId === 'caramel' ? 'Caramel' : flavorId === 'flamin' ? 'Flamin Hot' : 'Butter';
                    const color = flavorId === 'caramel' ? 'text-primary-container' : flavorId === 'flamin' ? 'text-flamin-orange' : 'text-[#fff9c4]';
                    return (
                      <span key={flavorId} className="text-xs font-mono font-bold bg-[#2B1B17] border border-outline/30 px-2 py-0.5 rounded-lg flex items-center gap-1">
                        <span className={color}>{count}x</span>
                        <span className="text-white/80">{name}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="w-full relative z-10 mt-8">
              <div className="flex justify-between items-center bg-[#201b11]/80 border border-outline-variant/10 p-3 rounded-2xl mb-4 text-left">
                <div>
                  <span className="text-[10px] text-outline font-black uppercase">Total:</span>
                  <p className="font-headline text-3xl font-bold text-primary-container leading-none font-mono mt-1">${currentPrice.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-outline font-black uppercase">Envío:</span>
                  <p className="text-xs font-headline font-bold text-[#00daf8] mt-1">¡APLICA A GRATIS! ($35+)</p>
                </div>
              </div>

              <button
                onClick={handleAddBundleToCart}
                disabled={!isComplete}
                className={`w-full py-4 rounded-2xl font-headline font-black text-center border-2 border-tatos-dark flex items-center justify-center gap-2 transition-all ${
                  isComplete
                    ? 'bg-primary-container text-on-primary-container hover:bg-white hover:text-tatos-dark cursor-pointer tatos-btn-shadow'
                    : 'bg-outline-variant text-outline cursor-not-allowed opacity-60'
                }`}
              >
                <ShoppingCart size={18} />
                {isComplete ? 'AÑADIR BUNDLE A COMPRA' : `AÑADE ${packSize - totalBagsSelected} BOLSAS MÁS`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
