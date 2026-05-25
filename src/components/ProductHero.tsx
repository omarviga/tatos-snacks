import { useState } from 'react';
import { Product } from '../types';
import { ShoppingCart } from 'lucide-react';

interface Flavor {
  id: string;
  name: string;
  tagline: string;
  description: string;
  bgColor: string;      // Clase de fondo de Tailwind
  accentColor: string;  // Clase de texto/botón de Tailwind
  btnColor: string;     // Clase de hover del botón
  image: string;        // Ruta de tu render/foto del empaque
  badges: string[];
}

const FLAVORS: Flavor[] = [
  {
    id: 'flamin-hot',
    name: 'Flamin Hot',
    tagline: 'Un crujido adictivo y picante',
    description: 'Para los amantes de la intensidad. Palomitas gourmet con nuestra mezcla especial de chiles que te dejará con ganas de una bolsa más.',
    bgColor: 'bg-[#fff2f2]', // bg-red-50 aligned to branding
    accentColor: 'text-red-600',
    btnColor: 'bg-red-600 hover:bg-red-700',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzrLsJ9taU8rK2ldyQgUuJJNpDJ0jJHrxqYwMMoSLDcai8AzxIcH0LgPhkEMvPu70ogaAAF49U4Ggmq-87P-df33w9CMOMWaNyfUFiP1C2lRLTXxkbsJ1jdo432PPlHP8WGP2KFWVM3XaXkW0ZkH8vQX_SVnDDWnWms6KlnP8OuAeoPvzS71EtBhVgNPx42RHa3Enc_EUGEMvOC5SJDbZ37iD5VFEZnSJn2tKqYXbb4ajzkClddZzpx0u4faygcDLv7BsjTt_-_dRR',
    badges: ['🔥 Picante Intenso', '🍿 Explotado con Aire', '🌿 Sin Conservadores']
  },
  {
    id: 'caramelo',
    name: 'Caramelo Glaseado',
    tagline: 'El balance dulce y artesanal',
    description: 'Glaseadas a mano en lotes pequeños. Una capa crujiente de caramelo premium con un sutil toque de sal marina para el maridaje perfecto.',
    bgColor: 'bg-[#fcf7ee]', // bg-amber-50
    accentColor: 'text-amber-700',
    btnColor: 'bg-[#785900] hover:bg-[#634900]',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCh8tm5YA-NxNcvGbTX3Z6wRUR0OEG3xvUfo2KInB7T6LvMQQfjCQOPUQQHAGMdgvX68uIq2ousQIxAVjqz3KC042WJjhULHWo65qzBqMDY7FUiYfE6A7oxPgBX-4s2uUMIDlsPmFrczXg3x114_-PE8WjLcGb4_hratwjWfzre-Ur_2jpQwxvgGvvXAulCqtDlhnR8EdOUet-AnOgSUUeP0EqWWd6Lm-WG74BRiQ56vibWR2sgd5OQwjuZAa1YdxU_jLGPG7imRpFf',
    badges: ['🍯 Caramelo Real', '✨ Toque de Sal Marina', '👨‍🍳 Hecho a Mano']
  },
  {
    id: 'mantequilla',
    name: 'Mantequilla Clásica',
    tagline: 'La tradición de la sala de cine, mejorada',
    description: 'El clásico infaltable elevado a la máxima potencia. Mantequilla cremosa de alta calidad distribuida uniformemente para un sabor constante en cada bocado.',
    bgColor: 'bg-[#fefce8]', // bg-yellow-50
    accentColor: 'text-yellow-600',
    btnColor: 'bg-[#826200] hover:bg-[#6c5100]',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJUyzRKGn64DG7cJ-5ZPsGcnNTZERyykTcMZdcLE11qrGVw1xlYDUuAHkPu5xNmuQAazYtG6AjsXzflOb1qxwr_58zLdwQYgS75Az-5U2cVeZI7lATNU4dvNMnXxNyfHmxQkgARvIDLclhrWqRnLJAjKoY1-YCxkSdcAm1VcBZAtOOaOvDVsO5myhP9XCFfg2DGQ-eJx19Fn34yVeDo_S5xjUstaKNoAvOoeNwWufZSATn3Sduh5YEglOpogTPCfNOuBGQ7VC9ErKJ',
    badges: ['🧈 Mantequilla Premium', '🎬 Sabor de Cine', '🍿 Grano Seleccionado']
  }
];

interface ProductHeroProps {
  onAddToCart?: (product: Product) => void;
}

export default function ProductHero({ onAddToCart }: ProductHeroProps) {
  const [currentFlavor, setCurrentFlavor] = useState<Flavor>(FLAVORS[0]);

  const handleBuy = () => {
    if (onAddToCart) {
      // Map user selection back to catalog models
      const mappedId = currentFlavor.id === 'flamin-hot' ? 'flamin' : currentFlavor.id === 'caramelo' ? 'caramel' : 'butter';
      const mockProduct: Product = {
        id: mappedId,
        name: `Tatos Snacks ${currentFlavor.name}`,
        price: 4.50,
        description: currentFlavor.description,
        image: currentFlavor.image,
        category: 'individual',
        flavorNote: currentFlavor.tagline,
        bgColorClass: currentFlavor.id === 'flamin-hot' ? 'bg-secondary-fixed' : currentFlavor.id === 'caramelo' ? 'bg-surface-container-low' : 'bg-surface-container-highest',
        borderHoverClass: currentFlavor.id === 'flamin-hot' ? 'hover:border-flamin-orange' : currentFlavor.id === 'caramelo' ? 'hover:border-primary-container' : 'hover:border-tertiary',
        ingredients: [currentFlavor.badges.join(', ')]
      };
      onAddToCart(mockProduct);
    }
  };

  return (
    <section 
      id="product-dynamic-hero"
      className={`min-h-screen ${currentFlavor.bgColor} transition-colors duration-500 ease-in-out flex items-center px-6 py-12 border-b-4 border-tatos-dark relative overflow-hidden`}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-tatos-dark/10 to-transparent" />
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Lado Izquierdo: Galería del Empaque (El protagonista) */}
        <div className="flex flex-col items-center justify-center relative min-h-[400px]">
          {/* Círculo de fondo decorativo que cambia de color */}
          <div className={`absolute w-72 h-72 md:w-96 md:h-96 rounded-full opacity-25 blur-3xl transition-all duration-700 ${
            currentFlavor.id === 'flamin-hot' ? 'bg-red-500/20' : currentFlavor.id === 'caramelo' ? 'bg-amber-500/20' : 'bg-yellow-500/20'
          }`} />
          
          <img
            referrerPolicy="no-referrer"
            src={currentFlavor.image}
            alt={`Empaque Tatos Snacks - ${currentFlavor.name}`}
            className="w-full max-w-sm z-10 object-contain drop-shadow-[0_35px_35px_rgba(43,27,23,0.22)] transform hover:scale-105 transition-transform duration-300 pointer-events-none select-none"
            onError={(e) => {
              // Imagen temporal mientras subes tus renders reales
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x500?text=Tatos+Snacks';
            }}
          />
        </div>

        {/* Lado Derecho: Contenido Dinámico */}
        <div className="space-y-6">
          {/* Selector de Sabores minimalista */}
          <div className="flex flex-wrap gap-2.5">
            {FLAVORS.map((flavor) => (
              <button
                key={flavor.id}
                id={`btn-product-hero-${flavor.id}`}
                onClick={() => setCurrentFlavor(flavor)}
                className={`px-5 py-2.5 rounded-full font-headline text-xs font-black uppercase tracking-wider transition-all duration-300 border-2 border-tatos-dark cursor-pointer ${
                  currentFlavor.id === flavor.id
                    ? `${flavor.btnColor} text-white shadow-[4px_4px_0_0_#2b1b17] -translate-y-0.5`
                    : 'bg-white text-stone-600 hover:bg-stone-50 hover:text-stone-850'
                }`}
              >
                {flavor.name}
              </button>
            ))}
          </div>

          {/* Textos Informativos */}
          <div className="space-y-2">
            <h2 className={`text-4xl md:text-5xl font-headline font-black uppercase tracking-tight ${currentFlavor.id === 'caramelo' ? 'text-[#785900]' : currentFlavor.id === 'mantequilla' ? 'text-[#826200]' : 'text-red-650'}`}>
              Tatos {currentFlavor.name}
            </h2>
            <p className="text-lg font-headline font-black text-secondary italic">
              "{currentFlavor.tagline}"
            </p>
          </div>

          <p className="text-tatos-dark/80 text-sm leading-relaxed max-w-lg font-sans">
            {currentFlavor.description}
          </p>

          {/* Matriz de Atributos Clave (Badges) */}
          <div className="flex flex-wrap gap-2 pt-2">
            {currentFlavor.badges.map((badge, index) => (
              <span
                key={index}
                className="bg-white/95 border-2 border-tatos-dark text-tatos-dark text-[10px] font-headline font-black uppercase tracking-wider px-3.5 py-1.5 rounded-xl shadow-sm"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Botón de Acción Principal */}
          <div className="pt-4">
            <button 
              id={`btn-product-add-${currentFlavor.id}`}
              onClick={handleBuy}
              className={`w-full sm:w-auto text-white font-headline text-xs font-black uppercase tracking-wide py-4.5 px-10 rounded-2xl border-2 border-tatos-dark tatos-btn-shadow cursor-pointer ${currentFlavor.btnColor} transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2`}
            >
              <ShoppingCart size={14} className="stroke-[2.5]" />
              Añadir al Carrito - $4.50 USD
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
