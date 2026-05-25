import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FlavorCard from './components/FlavorCard';
import InteractiveShowcase from './components/InteractiveShowcase';
import PopcornEngine from './components/PopcornEngine';
import Quiz from './components/Quiz';
import Bundler from './components/Bundler';
import SocialProof from './components/SocialProof';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { Sparkles, ShoppingBag, ArrowRight, ChevronDown } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  // Persistence loaded on first mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('tatos_cart');
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('LocalStorage error reading cart:', e);
    }
  }, []);

  // Update storage on cart modification
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem('tatos_cart', JSON.stringify(newCart));
    } catch (e) {
      console.warn('LocalStorage error saving cart:', e);
    }
  };

  const handleAddToCart = (product: Product) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    let updatedCart: CartItem[] = [];

    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart = [...cart, { product, quantity: 1 }];
    }

    saveCart(updatedCart);
    showToast(`¡Añadido ${product.name} a tu compra! 🍿`);
  };

  const handleAddCustomBundle = (
    bundleName: string,
    price: number,
    selections: { [key: string]: number },
    image: string
  ) => {
    // Generate specialized bundle item container
    const selectionSummary = Object.entries(selections)
      .map(([id, count]) => `${count}x ${id === 'caramel' ? 'Caramel' : id === 'flamin' ? 'Flamin Hot' : 'Butter'}`)
      .join(', ');

    const customProduct: Product = {
      id: `custom-bundle-${Date.now()}`,
      name: bundleName,
      price: price,
      description: `Multipack Especial Tatos: ${selectionSummary}.`,
      image: image,
      category: 'bundle',
      bgColorClass: 'bg-surface-container',
      borderHoverClass: 'hover:border-primary'
    };

    handleAddToCart(customProduct);
    setIsCartOpen(true); // Open drawer so user sees their master creation
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    const updatedCart = cart.map((item) => {
      if (item.product.id === productId) {
        return { ...item, quantity };
      }
      return item;
    });
    saveCart(updatedCart);
  };

  const handleRemoveItem = (productId: string) => {
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    saveCart(updatedCart);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  const showToast = (message: string) => {
    setToast({ message, visible: true });
  };

  // Dismiss toast after 3 seconds
  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const [sortBy, setSortBy] = useState<string>('default');

  // Separate collections for high visual precision on individual and bundle lines
  const individualFlavors = React.useMemo(() => {
    const raw = PRODUCTS.filter((p) => p.category === 'individual');
    if (sortBy === 'price-asc') {
      return [...raw].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      return [...raw].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      return [...raw].sort((a, b) => a.name.localeCompare(b.name));
    }
    return raw;
  }, [sortBy]);

  const bundlePacks = PRODUCTS.filter((p) => p.category === 'bundle');

  return (
    <div className="min-h-screen bg-surface text-tatos-dark font-sans selection:bg-primary-container relative">
      {/* Dynamic Popcorn Notification Toast */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-tatos-dark text-white border-2 border-primary px-6 py-3 rounded-2xl shadow-2xl z-50 flex items-center gap-3 font-headline text-xs font-black uppercase tracking-wider tatos-popup-shadow"
          >
            <span className="text-xl animate-bounce">🍿</span>
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Layout */}
      <Navbar onCartOpen={() => setIsCartOpen(true)} cartCount={totalCartCount} />

      {/* Main billboard sections */}
      <main className="space-y-0">
        
        {/* Landing header Section */}
        <Hero />

        {/* Individual Flavors Grid Section */}
        <section id="flavors" className="py-24 bg-surface-container border-t-2 border-b-2 border-tatos-dark relative">
          <div className="container mx-auto px-6 max-w-6xl">
            
            {/* Context headings split */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="text-primary font-headline text-xs font-black uppercase tracking-widest bg-white border border-tatos-dark/35 px-3 py-1 rounded-full inline-block">
                  EL CATÁLOGO
                </span>
                <h2 className="font-headline text-4xl md:text-5xl font-black text-tatos-dark uppercase mt-3 leading-none">
                  Elige Tu <span className="text-secondary">Crunch</span> Preferido
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 max-w-2xl w-full md:w-auto">
                <p className="max-w-sm text-on-surface-variant font-sans text-xs md:text-sm leading-relaxed">
                  Desde las llamaradas adictivas de Flamin' Hot hasta los ricos toques sutiles glaseados de Mantequilla y Caramelo artesanal, hemos perfeccionado el estallido.
                </p>
                <div className="flex flex-col gap-1.5 w-full sm:w-52 shrink-0">
                  <span className="text-[10px] uppercase font-black tracking-wider text-tatos-dark/60 font-headline">
                    Ordenar Por
                  </span>
                  <div className="relative">
                    <select
                      id="product-sort"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full bg-white border-2 border-tatos-dark px-4 py-2 text-xs font-headline font-black uppercase tracking-wider rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary appearance-none pr-10 hover:bg-neutral-50 transition-colors"
                    >
                      <option value="default">Destacados</option>
                      <option value="price-asc">Precio: Menor a Mayor</option>
                      <option value="price-desc">Precio: Mayor a Menor</option>
                      <option value="name-asc">Nombre: A - Z</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-tatos-dark">
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Render 3D Products Column rows */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pb-16">
              {individualFlavors.map((flavor, idx) => (
                <FlavorCard
                  key={flavor.id}
                  product={flavor}
                  onAddToCart={handleAddToCart}
                  index={idx}
                />
              ))}
            </div>

          </div>
        </section>

        {/* Narrative storytelling experience */}
        <InteractiveShowcase />

        {/* Gamified popping engine simulator */}
        <PopcornEngine />

        {/* Social Proof tribal row */}
        <SocialProof />

        {/* Specialized Multi-Pack Offers */}
        <section id="bundles" className="py-24 bg-surface relative">
          <div className="container mx-auto px-6 max-w-6xl">
            
            <div className="text-center mb-16">
              <span className="text-flamin-orange font-headline text-xs font-black uppercase tracking-widest bg-secondary-fixed text-secondary px-3 py-1 rounded-full border border-tatos-dark">
                OFERTAS ESPECIALES
              </span>
              <h2 className="font-headline text-4xl md:text-5xl font-black text-tatos-dark uppercase mt-3 leading-none">
                Nuestras Cajas <span className="text-secondary">Premium Pack</span>
              </h2>
              <p className="max-w-xl mx-auto text-on-surface-variant font-sans text-xs md:text-sm leading-relaxed mt-2">
                Combinaciones previamente estructuradas y seleccionadas de nuestros sabores favoritos, listas para ser despachadas a tu mesa con descuentos garantizados.
              </p>
            </div>

            {/* Grid display bundle options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {bundlePacks.map((pack) => {
                // Individualized custom composite mockup overlap images
                const isParty = pack.id === 'party-pack';
                const isHeat = pack.id === 'heat-seeker';
                const isSalty = pack.id === 'sweet-salty';

                return (
                  <div
                    key={pack.id}
                    className="bg-surface-container rounded-[40px] p-6 md:p-8 border-4 border-tatos-dark hover:border-primary transition-all group flex flex-col justify-between text-center relative hover:scale-[1.01]"
                  >
                    {/* Multi-bag overlapping graphics panel */}
                    <div className="relative h-48 w-full mb-6 flex justify-center items-center overflow-hidden bg-white/40 border border-tatos-dark/15 rounded-3xl p-4 select-none">
                      {isParty && (
                        <>
                          <img
                            referrerPolicy="no-referrer"
                            alt="Caramel"
                            className="w-24 absolute -left-2 top-4 rotate-[-15deg] drop-shadow-lg group-hover:translate-x-[-10px] transition-transform"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh8tm5YA-NxNcvGbTX3Z6wRUR0OEG3xvUfo2KInB7T6LvMQQfjCQOPUQQHAGMdgvX68uIq2ousQIxAVjqz3KC042WJjhULHWo65qzBqMDY7FUiYfE6A7oxPgBX-4s2uUMIDlsPmFrczXg3x114_-PE8WjLcGb4_hratwjWfzre-Ur_2jpQwxvgGvvXAulCqtDlhnR8EdOUet-AnOgSUUeP0EqWWd6Lm-WG74BRiQ56vibWR2sgd5OQwjuZAa1YdxU_jLGPG7imRpFf"
                          />
                          <img
                            referrerPolicy="no-referrer"
                            alt="Butter"
                            className="w-24 absolute -right-2 top-4 rotate-[15deg] drop-shadow-lg group-hover:translate-x-[10px] transition-transform"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJUyzRKGn64DG7cJ-5ZPsGcnNTZERyykTcMZdcLE11qrGVw1xlYDUuAHkPu5xNmuQAazYtG6AjsXzflOb1qxwr_58zLdwQYgS75Az-5U2cVeZI7lATNU4dvNMnXxNyfHmxQkgARvIDLclhrWqRnLJAjKoY1-YCxkSdcAm1VcBZAtOOaOvDVsO5myhP9XCFfg2DGQ-eJx19Fn34yVeDo_S5xjUstaKNoAvOoeNwWufZSATn3Sduh5YEglOpogTPCfNOuBGQ7VC9ErKJ"
                          />
                          <img
                            referrerPolicy="no-referrer"
                            alt="Flamin Hot"
                            className="w-32 z-10 drop-shadow-2xl group-hover:scale-110 transition-transform"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzrLsJ9taU8rK2ldyQgUuJJNpDJ0jJHrxqYwMMoSLDcai8AzxIcH0LgPhkEMvPu70ogaAAF49U4Ggmq-87P-df33w9CMOMWaNyfUFiP1C2lRLTXxkbsJ1jdo432PPlHP8WGP2KFWVM3XaXkW0ZkH8vQX_SVnDDWnWms6KlnP8OuAeoPvzS71EtBhVgNPx42RHa3Enc_EUGEMvOC5SJDbZ37iD5VFEZnSJn2tKqYXbb4ajzkClddZzpx0u4faygcDLv7BsjTt_-_dRR"
                          />
                        </>
                      )}

                      {isHeat && (
                        <>
                          <img
                            referrerPolicy="no-referrer"
                            alt="Heat side 1"
                            className="w-24 absolute left-2 top-4 rotate-[-12deg] opacity-60 drop-shadow-md group-hover:rotate-[-16deg] transition-transform"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzrLsJ9taU8rK2ldyQgUuJJNpDJ0jJHrxqYwMMoSLDcai8AzxIcH0LgPhkEMvPu70ogaAAF49U4Ggmq-87P-df33w9CMOMWaNyfUFiP1C2lRLTXxkbsJ1jdo432PPlHP8WGP2KFWVM3XaXkW0ZkH8vQX_SVnDDWnWms6KlnP8OuAeoPvzS71EtBhVgNPx42RHa3Enc_EUGEMvOC5SJDbZ37iD5VFEZnSJn2tKqYXbb4ajzkClddZzpx0u4faygcDLv7BsjTt_-_dRR"
                          />
                          <img
                            referrerPolicy="no-referrer"
                            alt="Heat central"
                            className="w-32 z-10 drop-shadow-2xl group-hover:scale-110 transition-transform"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzrLsJ9taU8rK2ldyQgUuJJNpDJ0jJHrxqYwMMoSLDcai8AzxIcH0LgPhkEMvPu70ogaAAF49U4Ggmq-87P-df33w9CMOMWaNyfUFiP1C2lRLTXxkbsJ1jdo432PPlHP8WGP2KFWVM3XaXkW0ZkH8vQX_SVnDDWnWms6KlnP8OuAeoPvzS71EtBhVgNPx42RHa3Enc_EUGEMvOC5SJDbZ37iD5VFEZnSJn2tKqYXbb4ajzkClddZzpx0u4faygcDLv7BsjTt_-_dRR"
                          />
                          <img
                            referrerPolicy="no-referrer"
                            alt="Heat side 2"
                            className="w-24 absolute right-2 top-4 rotate-[12deg] opacity-60 drop-shadow-md group-hover:rotate-[16deg] transition-transform"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzrLsJ9taU8rK2ldyQgUuJJNpDJ0jJHrxqYwMMoSLDcai8AzxIcH0LgPhkEMvPu70ogaAAF49U4Ggmq-87P-df33w9CMOMWaNyfUFiP1C2lRLTXxkbsJ1jdo432PPlHP8WGP2KFWVM3XaXkW0ZkH8vQX_SVnDDWnWms6KlnP8OuAeoPvzS71EtBhVgNPx42RHa3Enc_EUGEMvOC5SJDbZ37iD5VFEZnSJn2tKqYXbb4ajzkClddZzpx0u4faygcDLv7BsjTt_-_dRR"
                          />
                        </>
                      )}

                      {isSalty && (
                        <>
                          <img
                            referrerPolicy="no-referrer"
                            alt="Caramel center"
                            className="w-28 absolute left-4 top-4 rotate-[-6deg] z-10 drop-shadow-2xl group-hover:-translate-x-2 transition-transform"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh8tm5YA-NxNcvGbTX3Z6wRUR0OEG3xvUfo2KInB7T6LvMQQfjCQOPUQQHAGMdgvX68uIq2ousQIxAVjqz3KC042WJjhULHWo65qzBqMDY7FUiYfE6A7oxPgBX-4s2uUMIDlsPmFrczXg3x114_-PE8WjLcGb4_hratwjWfzre-Ur_2jpQwxvgGvvXAulCqtDlhnR8EdOUet-AnOgSUUeP0EqWWd6Lm-WG74BRiQ56vibWR2sgd5OQwjuZAa1YdxU_jLGPG7imRpFf"
                          />
                          <img
                            referrerPolicy="no-referrer"
                            alt="Butter side"
                            className="w-28 absolute right-4 top-4 rotate-[6deg] z-0 drop-shadow-xl group-hover:translate-x-2 transition-transform"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJUyzRKGn64DG7cJ-5ZPsGcnNTZERyykTcMZdcLE11qrGVw1xlYDUuAHkPu5xNmuQAazYtG6AjsXzflOb1qxwr_58zLdwQYgS75Az-5U2cVeZI7lATNU4dvNMnXxNyfHmxQkgARvIDLclhrWqRnLJAjKoY1-YCxkSdcAm1VcBZAtOOaOvDVsO5myhP9XCFfg2DGQ-eJx19Fn34yVeDo_S5xjUstaKNoAvOoeNwWufZSATn3Sduh5YEglOpogTPCfNOuBGQ7VC9ErKJ"
                          />
                        </>
                      )}
                    </div>

                    {/* Meta descriptions */}
                    <div className="flex-grow flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className="font-headline text-xl font-black text-tatos-dark mb-1 leading-tight">{pack.name}</h3>
                        <p className="text-on-surface-variant font-sans text-xs leading-relaxed">{pack.description}</p>
                      </div>

                      <div>
                        <div className="text-2xl font-black text-secondary leading-none font-mono mb-4">${pack.price.toFixed(2)}</div>
                        <button
                          onClick={() => handleAddToCart(pack)}
                          className="w-full bg-[#2b1b17] hover:bg-secondary text-white py-3.5 rounded-2xl font-headline text-xs font-black uppercase border-2 border-tatos-dark tatos-btn-shadow flex items-center justify-center gap-2 cursor-pointer transition-colors"
                        >
                          <ShoppingBag size={14} />
                          COMPRAR BUNDLE
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* Dynamic customized multipack mixer box builder */}
        <Bundler onAddCustomBundle={handleAddCustomBundle} />

        {/* Matches quiz soulmate finder */}
        <Quiz onAddProductToCart={handleAddToCart} />

        {/* Stock visual CTA callout block */}
        <section className="py-20 relative overflow-hidden bg-surface">
          <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <div className="bg-primary-container rounded-[60px] p-10 md:p-20 text-center border-4 border-tatos-dark shadow-[16px_16px_0_0_#2b1b17] relative overflow-hidden">
              
              {/* Floating aesthetic overlay design */}
              <img
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzrLsJ9taU8rK2ldyQgUuJJNpDJ0jJHrxqYwMMoSLDcai8AzxIcH0LgPhkEMvPu70ogaAAF49U4Ggmq-87P-df33w9CMOMWaNyfUFiP1C2lRLTXxkbsJ1jdo432PPlHP8WGP2KFWVM3XaXkW0ZkH8vQX_SVnDDWnWms6KlnP8OuAeoPvzS71EtBhVgNPx42RHa3Enc_EUGEMvOC5SJDbZ37iD5VFEZnSJn2tKqYXbb4ajzkClddZzpx0u4faygcDLv7BsjTt_-_dRR"
                alt=""
                className="absolute -right-20 -top-24 w-72 opacity-25 -rotate-12 hidden md:block"
              />

              <h2 className="font-headline text-4xl md:text-6xl font-black text-tatos-dark uppercase leading-none tracking-tight">
                Abastece tu <br />
                <span className="text-secondary relative inline-block">
                  Pantry de Crunch.
                  <span className="absolute left-0 bottom-1 w-full h-2 bg-white/40 -z-10 rounded" />
                </span>
              </h2>

              <p className="text-on-primary-container font-sans text-xs md:text-sm max-w-md mx-auto mt-6">
                No esperes a que el antojo golpee desprevenido. Diseña tu paquete a tu ritmo y obtén despacho gratis en envíos sobre $35 dólares.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => document.getElementById('bundles-interactive')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-tatos-dark text-white px-10 py-4 rounded-2xl font-headline text-xs font-black uppercase border-2 border-tatos-dark tatos-btn-shadow hover:bg-secondary w-full sm:w-auto"
                >
                  SHOP BUNDLES
                </button>
                <button
                  onClick={() => document.getElementById('flavors')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-tatos-dark border-2 border-tatos-dark px-10 py-4 rounded-2xl font-headline text-xs font-black uppercase hover:bg-butter-cream transition-all w-full sm:w-auto"
                >
                  FIND A STORE & FLAVORS
                </button>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Brand Footer ending info banner */}
      <Footer />

      {/* Slide out Cart Drawer sidebar overlay */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
