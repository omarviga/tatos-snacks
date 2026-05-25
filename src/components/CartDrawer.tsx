import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, Product } from '../types';
import { ShoppingBag, X, Trash2, Tag, Gift, Check, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onAddCustomBundleToCart?: (bundleItems: { [key: string]: number }) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [activeCode, setActiveCode] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // Free shipping threshold
  const FREE_SHIPPING_THRESHOLD = 35;
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 4.99;
  const progressToFreeShipping = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const neededForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

  // Discount calculation
  let discount = 0;
  if (activeCode === 'KINETICCRUNCH') {
    discount = subtotal * 0.15; // 15% off
  } else if (activeCode === 'TATOSTRIBE') {
    discount = subtotal * 0.20; // 20% off
  }

  const grandTotal = Math.max(subtotal - discount + shippingCost, 0);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const upperCode = promoCode.toUpperCase().trim();
    if (upperCode === 'KINETICCRUNCH' || upperCode === 'TATOSTRIBE') {
      setActiveCode(upperCode);
      setPromoError(null);
      setPromoCode('');
    } else {
      setPromoError('Código inválido. ¡Intenta KINETICCRUNCH!');
    }
  };

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
      onClearCart();
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-tatos-dark z-50 cursor-pointer"
          />

          {/* Drawer container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-surface text-tatos-dark shadow-2xl z-50 flex flex-col border-l-4 border-tatos-dark"
          >
            {/* Header */}
            <div className="p-6 border-b-2 border-tatos-dark flex justify-between items-center bg-surface-container">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-secondary stroke-2" />
                <h2 className="font-headline text-2xl font-black uppercase tracking-tight">Tu Compra</h2>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 border-2 border-tatos-dark rounded-full flex items-center justify-center hover:bg-secondary-fixed active:translate-y-1 transition-all"
              >
                <X size={18} className="font-bold text-tatos-dark" />
              </button>
            </div>

            {/* Main content body */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {checkoutSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-primary-container border-4 border-tatos-dark rounded-full flex items-center justify-center text-tatos-dark font-black text-4xl animate-bounce">
                    🍿
                  </div>
                  <h3 className="font-headline text-3xl font-black uppercase text-secondary">¡Hecho!</h3>
                  <p className="text-on-surface-variant font-medium font-sans">
                    Tu pedido de crunch ha sido procesado. Prepárate para el mejor pop de tu vida.
                  </p>
                  <p className="text-xs text-primary font-mono font-bold">Iniciando despachos en caliente...</p>
                </div>
              ) : cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <span className="material-symbols-outlined text-6xl text-outline mb-2">production_quantity_limits</span>
                  <h3 className="font-headline text-2xl font-bold uppercase text-tatos-dark">Pantry Vacío</h3>
                  <p className="text-on-surface-variant max-w-xs font-sans text-sm">
                    No dejes que el antojo te agarre desprevenido. ¡Añade algunas palomitas crujientes!
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-primary text-white font-headline text-sm font-bold tracking-tight px-6 py-3 rounded-xl border-2 border-tatos-dark tatos-btn-shadow"
                  >
                    EXPLORAR FLAVORS
                  </button>
                </div>
              ) : (
                <>
                  {/* Free shipping bar */}
                  <div className="bg-surface-container-low border-2 border-tatos-dark rounded-2xl p-4 shadow-sm space-y-2">
                    <div className="flex justify-between items-center text-sm font-bold">
                      <span className="flex items-center gap-1.5 font-headline">
                        <Gift size={16} className="text-secondary" />
                        {subtotal >= FREE_SHIPPING_THRESHOLD 
                          ? '¡Enhorabuena! Tienes Envío Gratis' 
                          : 'Envío Gratis'}
                      </span>
                      <span className="font-mono text-xs">
                        {subtotal >= FREE_SHIPPING_THRESHOLD 
                          ? '¡Listo!' 
                          : `$${neededForFreeShipping.toFixed(2)} más`}
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-highest border border-tatos-dark rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-primary-container h-full transition-all duration-300"
                        style={{ width: `${progressToFreeShipping}%` }}
                      />
                    </div>
                    {subtotal < FREE_SHIPPING_THRESHOLD && (
                      <p className="text-[11px] text-on-surface-variant font-medium">
                        Agrega palomitas individuales o packs para ahorrarte el envío.
                      </p>
                    )}
                  </div>

                  {/* Product items cart list */}
                  <div className="space-y-4">
                    {cart.map((item) => {
                      const isPack = item.product.category === 'bundle';
                      return (
                        <div
                          key={item.product.id}
                          className="flex gap-4 p-3 bg-white border-2 border-tatos-dark rounded-2xl shadow-sm relative hover:scale-[1.02] transition-transform"
                        >
                          {/* Image */}
                          <div className="w-20 h-20 bg-surface-container-low rounded-xl border border-tatos-dark flex-shrink-0 flex items-center justify-center p-1.5 overflow-hidden">
                            <img
                              referrerPolicy="no-referrer"
                              src={item.product.image}
                              alt={item.product.name}
                              className="h-full w-auto object-contain drop-shadow"
                            />
                          </div>

                          {/* Info panel */}
                          <div className="flex-grow flex flex-col justify-between py-0.5">
                            <div>
                              <span className="text-[9px] font-bold tracking-wider font-headline uppercase bg-surface-container-highest border border-tatos-dark px-1.5 py-0.5 rounded-full text-primary mr-1 bg-opacity-70">
                                {isPack ? 'Bundle' : 'Flavor'}
                              </span>
                              <h4 className="font-headline font-bold text-sm text-tatos-dark leading-tight mt-1">
                                {item.product.name}
                              </h4>
                              <p className="text-xs text-secondary font-mono font-bold mt-0.5">
                                ${item.product.price.toFixed(2)} c/u
                              </p>
                            </div>

                            {/* Quantity buttons */}
                            <div className="flex items-center gap-1.5 mt-2">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                className="w-6 h-6 border border-tatos-dark rounded-full flex items-center justify-center hover:bg-surface-container font-black text-xs active:translate-y-0.5"
                              >
                                -
                              </button>
                              <span className="font-mono text-xs font-bold w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="w-6 h-6 border border-tatos-dark rounded-full flex items-center justify-center hover:bg-surface-container font-black text-xs active:translate-y-0.5"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Right totals & remove button */}
                          <div className="flex flex-col justify-between items-end">
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-on-surface-variant hover:text-secondary p-1 rounded-lg hover:bg-secondary-fixed transition-colors"
                              title="Remover snack"
                            >
                              <Trash2 size={16} />
                            </button>
                            <span className="font-mono text-sm font-black text-tatos-dark">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Promo section */}
                  <form onSubmit={handleApplyPromo} className="border-t-2 border-dashed border-outline pt-4">
                    <div className="flex gap-2">
                      <div className="relative flex-grow">
                        <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                        <input
                          type="text"
                          placeholder="Código Promocional"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 text-sm border-2 border-tatos-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white font-headline"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-tatos-dark hover:bg-primary text-white border-2 border-tatos-dark px-4 py-2 rounded-xl text-xs font-bold font-headline transition-all hover:scale-105"
                      >
                        Aplicar
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-xs text-secondary mt-1 font-semibold ml-1">{promoError}</p>
                    )}
                    {activeCode && (
                      <div className="flex justify-between items-center mt-2 p-2 bg-butter-cream border border-primary rounded-xl text-xs">
                        <span className="flex items-center gap-1 font-bold text-primary">
                          <Check size={12} />
                          CÓDIGO: {activeCode} ({activeCode === 'KINETICCRUNCH' ? '15%' : '20%'})
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveCode(null)}
                          className="text-[10px] text-secondary underline hover:no-underline font-bold"
                        >
                          Eliminar
                        </button>
                      </div>
                    )}
                  </form>
                </>
              )}
            </div>

            {/* Footer Summary Container */}
            {cart.length > 0 && !checkoutSuccess && (
              <div className="p-6 border-t-2 border-tatos-dark bg-surface-container space-y-4">
                <div className="space-y-1.5 font-sans font-medium text-sm">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant font-headline font-semibold">Subtotal:</span>
                    <span className="font-mono text-tatos-dark font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-secondary">
                      <span className="font-headline font-semibold">Descuento:</span>
                      <span className="font-mono font-bold">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant font-headline font-semibold">Envío:</span>
                    <span className="font-mono text-tatos-dark font-bold">
                      {shippingCost === 0 ? <span className="text-[#006877] font-semibold text-xs border border-[#00defd] bg-[#a5eeff] px-2 py-0.5 rounded-full uppercase">Gratuito</span> : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-outline text-lg font-black font-headline">
                    <span>Total de la Orden:</span>
                    <span className="font-mono text-secondary">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout click */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-secondary hover:bg-[#930010] text-white py-4 px-6 rounded-2xl font-headline font-black text-center border-2 border-tatos-dark tatos-btn-shadow flex items-center justify-center gap-2"
                >
                  PROCEDER AL PAGO
                  <ArrowRight size={18} />
                </button>
                <p className="text-[10px] text-center text-on-surface-variant font-medium">
                  💳 Transacciones encriptadas de máxima seguridad palomitera.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
