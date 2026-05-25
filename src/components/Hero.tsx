import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Flame, Heart, Star } from 'lucide-react';

export default function Hero() {
  const handleScrollToFlavors = () => {
    const section = document.getElementById('flavors');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header id="hero" className="relative min-h-[90vh] bg-surface flex flex-col items-center justify-center pt-12 pb-20 overflow-hidden">
      {/* Absolute Decorative Floating Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-[8%] opacity-30 text-primary-container"
        >
          <Star size={44} fill="currentColor" className="stroke-tatos-dark stroke-[2]" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -18, 0], rotate: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/3 right-[10%] opacity-40 text-flamin-orange"
        >
          <Flame size={38} fill="currentColor" className="stroke-tatos-dark stroke-[2]" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
          className="absolute bottom-1/4 left-[15%] opacity-20 text-[#6D4C41]"
        >
          <span className="material-symbols-outlined text-6xl">bakery_dining</span>
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-1/3 right-[20%] text-[#00defd]"
        >
          <Heart size={28} fill="currentColor" className="stroke-tatos-dark stroke-[2]" />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center space-y-8">
        {/* Banner Announcement */}
        <div className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-white text-xs font-black uppercase tracking-wider border-2 border-tatos-dark animate-bounce shadow">
          🔥 NUEVOS MEZCLADOS JUST DROPPED!
        </div>

        {/* Jumbo Headline */}
        <h1 className="font-headline text-5xl sm:text-7xl md:text-[80px] font-black text-tatos-dark leading-none uppercase tracking-tight">
          Pop Till <br />
          <span className="text-flamin-orange relative inline-block">
            You Drop.
            <span className="absolute left-0 bottom-1 w-full h-3 bg-primary-container/40 -z-10 rounded" />
          </span>
        </h1>

        {/* Big Products presentation overlapping row */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-5xl mx-auto pt-8">
          {/* Caramel (Sweet!) */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: -3 }}
            className="relative w-64 md:w-72 flex-shrink-0 cursor-pointer"
            onClick={handleScrollToFlavors}
          >
            <img
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh8tm5YA-NxNcvGbTX3Z6wRUR0OEG3xvUfo2KInB7T6LvMQQfjCQOPUQQHAGMdgvX68uIq2ousQIxAVjqz3KC042WJjhULHWo65qzBqMDY7FUiYfE6A7oxPgBX-4s2uUMIDlsPmFrczXg3x114_-PE8WjLcGb4_hratwjWfzre-Ur_2jpQwxvgGvvXAulCqtDlhnR8EdOUet-AnOgSUUeP0EqWWd6Lm-WG74BRiQ56vibWR2sgd5OQwjuZAa1YdxU_jLGPG7imRpFf"
              alt="Caramel Palomitas"
              className="w-full h-auto drop-shadow-2xl"
            />
            {/* Tag Sticker */}
            <div className="absolute -top-3 -right-3 bg-primary-container text-on-primary-container text-xs font-black px-4 py-1.5 rounded-xl border-2 border-tatos-dark shadow-md rotate-12 select-none uppercase tracking-wider">
              SWEET!
            </div>
          </motion.div>

          {/* Flamin Hot (Spicy as Hell!) */}
          <motion.div
            whileHover={{ scale: 1.08, y: -10 }}
            className="relative w-72 md:w-80 flex-shrink-0 z-10 cursor-pointer"
            onClick={handleScrollToFlavors}
          >
            <img
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzrLsJ9taU8rK2ldyQgUuJJNpDJ0jJHrxqYwMMoSLDcai8AzxIcH0LgPhkEMvPu70ogaAAF49U4Ggmq-87P-df33w9CMOMWaNyfUFiP1C2lRLTXxkbsJ1jdo432PPlHP8WGP2KFWVM3XaXkW0ZkH8vQX_SVnDDWnWms6KlnP8OuAeoPvzS71EtBhVgNPx42RHa3Enc_EUGEMvOC5SJDbZ37iD5VFEZnSJn2tKqYXbb4ajzkClddZzpx0u4faygcDLv7BsjTt_-_dRR"
              alt="Flamin Hot Palomitas"
              className="w-full h-auto drop-shadow-[0_20px_35px_rgba(255,87,34,0.45)]"
            />
            {/* Trigger Central Tag */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-flamin-orange text-white text-xs font-black px-6 py-2 rounded-full border-2 border-tatos-dark shadow-lg -rotate-2 select-none uppercase tracking-widest whitespace-nowrap">
              SPICY AS HELL
            </div>
          </motion.div>

          {/* Butter (Classic) */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            className="relative w-64 md:w-72 flex-shrink-0 cursor-pointer"
            onClick={handleScrollToFlavors}
          >
            <img
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJUyzRKGn64DG7cJ-5ZPsGcnNTZERyykTcMZdcLE11qrGVw1xlYDUuAHkPu5xNmuQAazYtG6AjsXzflOb1qxwr_58zLdwQYgS75Az-5U2cVeZI7lATNU4dvNMnXxNyfHmxQkgARvIDLclhrWqRnLJAjKoY1-YCxkSdcAm1VcBZAtOOaOvDVsO5myhP9XCFfg2DGQ-eJx19Fn34yVeDo_S5xjUstaKNoAvOoeNwWufZSATn3Sduh5YEglOpogTPCfNOuBGQ7VC9ErKJ"
              alt="Butter Palomitas"
              className="w-full h-auto drop-shadow-2xl"
            />
            {/* Tag Sticker */}
            <div className="absolute -top-3 -left-3 bg-butter-cream text-primary text-xs font-black px-4 py-1.5 rounded-xl border-2 border-tatos-dark shadow-md -rotate-12 select-none uppercase tracking-wider">
              CLASSIC
            </div>
          </motion.div>
        </div>

        {/* Call to action Explore Button */}
        <div className="pt-10 flex justify-center">
          <button
            onClick={handleScrollToFlavors}
            className="group bg-[#2b1b17] hover:bg-secondary text-white font-headline text-sm md:text-base font-black px-10 py-5 rounded-2xl tatos-btn-shadow flex items-center gap-3 uppercase tracking-wider cursor-pointer"
          >
            EXPLORE FLAVORS
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-2 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </header>
  );
}
