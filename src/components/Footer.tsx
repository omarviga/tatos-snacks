import React from 'react';
import { Share2, Rss, Mail, Truck, ShieldCheck, CreditCard } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full pt-16 pb-12 px-6 bg-[#1a1310] text-[#fffcf9] border-t-4 border-tatos-dark">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Top Trust Ribbon Info Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-white/10 pb-10">
          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-white/10 rounded-xl border border-white/10 text-secondary">
              <Truck size={20} />
            </div>
            <div>
              <h4 className="font-headline text-xs font-black uppercase text-white tracking-wider">ENVÍOS VELOCES NACIONALES</h4>
              <p className="font-sans text-[11px] text-white/70 leading-relaxed mt-1">
                Recibe tus palomitas en la puerta de tu hogar en un lapso de 24 a 72 horas hábiles. ¡Envío gratis sobre $35.00 USD!
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-white/10 rounded-xl border border-white/10 text-primary-container">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="font-headline text-xs font-black uppercase text-white tracking-wider">COMPRA SEGURA GARANTIZADA</h4>
              <p className="font-sans text-[11px] text-white/70 leading-relaxed mt-1">
                Todas tus transacciones están encriptadas de extremo a extremo con seguridad SSL de nivel bancario.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-white/10 rounded-xl border border-white/10 text-butter-cream">
              <CreditCard size={20} />
            </div>
            <div>
              <h4 className="font-headline text-xs font-black uppercase text-white tracking-wider">MÉTODOS DE PAGO POPULARES</h4>
              <p className="font-sans text-[11px] text-white/70 leading-relaxed mt-1">
                Aceptamos tarjetas de débito/crédito, transferencias electrónicas por SPEI, PayPal y pagos en tiendas OXXO.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Areas */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          
          {/* Brand layout */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <div className="font-headline text-3xl font-black text-secondary uppercase tracking-tight">
              Tatos Snacks
            </div>
            <p className="font-sans text-xs text-white/70 max-w-sm leading-relaxed">
              © {currentYear} Tatos Snacks. Cada grano de maíz es una obra de arte glaseada. Creado con pasión para elevar tus antojos.
            </p>
          </div>

          {/* Links Column */}
          <div className="flex flex-wrap justify-center gap-6 text-xs font-headline font-black uppercase tracking-wider select-none">
            <a href="#flavors" className="hover:text-secondary transition-colors text-white/80">
              Sabores
            </a>
            <a href="#bundles" className="hover:text-secondary transition-colors text-white/80">
              Cajas Especiales
            </a>
            <button 
              onClick={() => {
                const modal = document.getElementById('wholesale-link');
                if (modal) modal.click();
              }}
              className="hover:text-secondary transition-colors text-white/80 cursor-pointer"
            >
              Mayoreo / Distribuidores
            </button>
            <a href="#hero" className="hover:text-secondary transition-colors text-white/80">
              Contacto
            </a>
            <a href="#" className="hover:text-secondary transition-colors text-white/80">
              Aviso de Privacidad
            </a>
          </div>

          {/* Social interactions */}
          <div className="flex gap-4">
            <button
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-tatos-dark transition-all duration-300 border border-white/10 active:translate-y-0.5 cursor-pointer text-white"
              title="Compartir marca"
            >
              <Share2 size={16} />
            </button>
            
            <button
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-tatos-dark transition-all duration-300 border border-white/10 active:translate-y-0.5 cursor-pointer text-white"
              title="Contacto Directo"
            >
              <Mail size={16} />
            </button>
          </div>

        </div>

        {/* Payment Partner Logos Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-white/10 pt-8 text-[10px] text-white/40 uppercase font-headline select-none">
          <span>Tatos Snacks S.A. de C.V. - Producto 100% Mexicano</span>
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-white/5 border border-white/10 px-2 py-1 rounded">VISA</span>
            <span className="bg-white/5 border border-white/10 px-2 py-1 rounded">MASTERCARD</span>
            <span className="bg-white/5 border border-white/10 px-2 py-1 rounded">PAYPAL</span>
            <span className="bg-white/5 border border-white/10 px-2 py-1 rounded">SPEI</span>
            <span className="bg-white/5 border border-white/10 px-2 py-1 rounded">OXXO</span>
            <span className="bg-white/5 border border-white/10 px-2 py-1 rounded">EFECTIVO</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
