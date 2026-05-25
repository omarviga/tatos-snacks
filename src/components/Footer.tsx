import React from 'react';
import { Share2, Rss, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-16 px-6 bg-tatos-dark text-butter-cream border-t-4 border-tatos-dark">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        
        {/* Brand layout */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
          <div className="font-headline text-3xl font-black text-primary-container uppercase tracking-tight">
            Tatos Snacks
          </div>
          <p className="font-sans text-xs text-white/70 max-w-xs leading-relaxed">
            © {currentYear} Tatos Snacks. Pop till you drop. Cada grano es una obra de arte glaseada.
          </p>
        </div>

        {/* Links Column */}
        <div className="flex flex-wrap justify-center gap-8 text-xs font-headline font-black uppercase tracking-wider select-none">
          <a href="#" className="hover:text-flamin-orange transition-colors">
            Privacidad
          </a>
          <a href="#" className="hover:text-flamin-orange transition-colors">
            Términos
          </a>
          <a href="#" className="hover:text-flamin-orange transition-colors">
            Contacto
          </a>
          <a href="#" className="hover:text-flamin-orange transition-colors">
            Wholesale
          </a>
        </div>

        {/* Social interactions */}
        <div className="flex gap-4">
          <button
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-container hover:text-tatos-dark transition-all duration-300 border border-white/10 active:translate-y-0.5 cursor-pointer"
            title="Compartir marca"
          >
            <Share2 size={16} />
          </button>
          
          <button
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-container hover:text-tatos-dark transition-all duration-300 border border-white/10 active:translate-y-0.5 cursor-pointer"
            title="Sindicatos rss"
          >
            <Rss size={16} />
          </button>

          <button
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-container hover:text-tatos-dark transition-all duration-300 border border-white/10 active:translate-y-0.5 cursor-pointer"
            title="Correo"
          >
            <Mail size={16} />
          </button>
        </div>

      </div>
    </footer>
  );
}
