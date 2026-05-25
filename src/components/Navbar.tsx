import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface NavbarProps {
  onCartOpen: () => void;
  cartCount: number;
}

export default function Navbar({ onCartOpen, cartCount }: NavbarProps) {
  const handleScrollToSegment = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="sticky top-0 z-40 flex justify-between items-center px-6 py-4 w-full bg-surface/90 backdrop-blur-md border-b-2 border-tatos-dark">
      {/* Brand logo & title */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={(e) => handleScrollToSegment('hero', e)}>
        <img
          referrerPolicy="no-referrer"
          alt="Tatos Snacks Logo"
          className="h-10 w-auto animate-float duration-1000"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3OdXGqrmC4T3jatwDi4F5j2-X4xDA-JDwc9MuhTzloz7rHPZrozIh-a-r27sdsZyEV8ETiHEx_xUw5s74kFIYH6DaUgp8aDqkbgHY7j1Bvir6BTYZombFJk0flfpEOgpTtRTSFgXKd2F9uXTABq8dHZuYnU1Pgdi7-MiUW_7dKFmhlGdbTB4-RFI0ucjzpQMCszZNOzB22kQtbw2CYiwHNLQ3j97wey3gZOcpcDpVP3A8i5ugji-L7_kvnJf93owRDE8nkVo6t8o1"
        />
        <span className="font-headline text-lg md:text-2xl font-black uppercase tracking-tighter text-secondary">
          Tatos Snacks
        </span>
      </div>

      {/* Desktop navigation tabs */}
      <div className="hidden md:flex gap-8 items-center">
        <a
          onClick={(e) => handleScrollToSegment('flavors', e)}
          href="#flavors"
          className="text-tatos-dark font-headline text-xs font-black uppercase tracking-wider hover:text-flamin-orange transition-colors"
        >
          Flavors
        </a>
        <a
          onClick={(e) => handleScrollToSegment('bundles-interactive', e)}
          href="#bundles-interactive"
          className="text-tatos-dark font-headline text-xs font-black uppercase tracking-wider hover:text-flamin-orange transition-colors"
        >
          Custom Bundle
        </a>
        <a
          onClick={(e) => handleScrollToSegment('soulmate-finder', e)}
          href="#soulmate-finder"
          className="text-tatos-dark font-headline text-xs font-black uppercase tracking-wider hover:text-flamin-orange transition-colors"
        >
          Match Maker
        </a>
        <a
          onClick={(e) => handleScrollToSegment('simulator', e)}
          href="#simulator"
          className="text-tatos-dark font-headline text-xs font-black uppercase tracking-wider hover:text-flamin-orange transition-colors"
        >
          Simulator
        </a>
      </div>

      {/* Cart & action controls */}
      <div className="flex items-center gap-4">
        {/* Shopping basket trigger */}
        <button
          onClick={onCartOpen}
          className="relative w-11 h-11 border-2 border-tatos-dark bg-white hover:bg-butter-cream rounded-full flex items-center justify-center active:translate-y-0.5 transition-all shadow-sm"
          title="Abrir bolsa de compra"
        >
          <ShoppingBag size={18} className="text-tatos-dark stroke-[2.5]" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-secondary text-white font-headline text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-tatos-dark animate-pulse">
              {cartCount}
            </span>
          )}
        </button>

        {/* CTA */}
        <button
          onClick={(e) => handleScrollToSegment('flavors', e)}
          className="bg-primary text-white border-2 border-tatos-dark px-5 py-2.5 rounded-full font-headline text-xs font-black uppercase tatos-btn-shadow hover:bg-primary-container hover:text-on-primary-container transition-all"
        >
          Shop Now
        </button>
      </div>
    </nav>
  );
}
