import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ_QUESTIONS } from '../data';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import { HelpCircle, RefreshCw, ShoppingCart, Award, CheckCircle } from 'lucide-react';

interface QuizProps {
  onAddProductToCart: (product: Product) => void;
}

export default function Quiz({ onAddProductToCart }: QuizProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [scores, setScores] = useState<{ [key: string]: number }>({
    caramel: 0,
    flamin: 0,
    butter: 0
  });
  const [quizFinished, setQuizFinished] = useState(false);
  const [matchedProduct, setMatchedProduct] = useState<Product | null>(null);

  const handleAnswerSelect = (score: Record<string, number>) => {
    // Add up the scores
    const newScores = { ...scores };
    Object.entries(score).forEach(([flavorId, value]) => {
      newScores[flavorId] = (newScores[flavorId] || 0) + value;
    });
    setScores(newScores);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Finished! Calculate dominant flavor
      const matchedId = Object.entries(newScores).reduce((a, b) => b[1] > a[1] ? b : a)[0];
      const match = PRODUCTS.find(p => p.id === matchedId) || PRODUCTS[0];
      setMatchedProduct(match);
      setQuizFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setScores({ caramel: 0, flamin: 0, butter: 0 });
    setQuizFinished(false);
    setMatchedProduct(null);
  };

  return (
    <section id="soulmate-finder" className="py-20 bg-surface relative">
      <div className="container mx-auto px-6 max-w-xl">
        <div className="text-center mb-10">
          <span className="text-flamin-orange font-headline text-xs font-black uppercase tracking-widest bg-secondary-fixed text-secondary px-3 py-1 rounded-full border border-tatos-dark">
            TEST DE FLAVOR
          </span>
          <h2 className="font-headline text-3xl md:text-4xl font-black text-tatos-dark uppercase mt-3">
            ¿Cuál es tu Crunch Soulmate?
          </h2>
          <p className="text-on-surface-variant font-sans text-xs md:text-sm mt-1">
            Responde 3 preguntas rápidas y descubre qué sabor Tatos Snacks vibra con tu energía.
          </p>
        </div>

        <div className="bg-surface-container rounded-[40px] border-4 border-tatos-dark p-6 md:p-8 tatos-card-shadow relative overflow-hidden bg-opacity-70 backdrop-blur-md">
          {/* Decorative floating bits inside card */}
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary-container/20 rounded-full blur-xl pointer-events-none" />

          <AnimatePresence mode="wait">
            {!quizFinished ? (
              <motion.div
                key={`step-${currentStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Question tracker bar */}
                <div className="flex justify-between items-center text-xs font-black font-headline text-outline select-none">
                  <span className="flex items-center gap-1">
                    <HelpCircle size={14} className="text-primary" />
                    Pregunta {currentStep + 1} de {QUIZ_QUESTIONS.length}
                  </span>
                  <span>{Math.round(((currentStep) / QUIZ_QUESTIONS.length) * 100)}% Completado</span>
                </div>

                <div className="w-full bg-surface-container-highest border border-tatos-dark rounded-full h-2 overflow-hidden mb-8">
                  <div
                    className="bg-primary h-full transition-all duration-300"
                    style={{ width: `${((currentStep) / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>

                {/* Question Title */}
                <h3 className="font-headline text-xl md:text-2xl font-black text-tatos-dark leading-snug">
                  {QUIZ_QUESTIONS[currentStep].question}
                </h3>

                {/* Options List */}
                <div className="space-y-3">
                  {QUIZ_QUESTIONS[currentStep].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelect(option.score)}
                      className="w-full text-left p-4 bg-white border-2 border-tatos-dark rounded-2xl font-sans font-medium text-sm text-tatos-dark hover:bg-butter-cream hover:scale-[1.01] active:translate-y-0.5 shadow-sm hover:shadow transition-all group flex items-center justify-between"
                    >
                      <span className="leading-relaxed">{option.text}</span>
                      <span className="w-6 h-6 border-2 border-tatos-dark rounded-full bg-surface-container flex items-center justify-center font-bold text-xs font-mono group-hover:bg-primary group-hover:text-white transition-all">
                        {String.fromCharCode(65 + idx)}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 20 }}
                className="text-center space-y-6"
              >
                {/* Result graphic badge */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-container border-4 border-tatos-dark rounded-full text-tatos-dark mb-2 shadow animate-bounce">
                  <Award size={36} className="stroke-[2.5]" />
                </div>

                <h3 className="font-headline text-xs font-black uppercase text-outline tracking-wider leading-none">
                  ¡Veredicto de Crunch Encontrado!
                </h3>

                {matchedProduct && (
                  <div className="space-y-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-32 h-32 ${matchedProduct.bgColorClass} rounded-2xl border-2 border-tatos-dark flex items-center justify-center overflow-hidden shadow-md p-2 hover:rotate-6 transition-transform duration-300`}>
                        <img
                          referrerPolicy="no-referrer"
                          src={matchedProduct.image}
                          alt={matchedProduct.name}
                          className="h-full w-auto object-contain drop-shadow"
                        />
                      </div>
                      <h4 className="font-headline text-2xl font-black text-tatos-dark mt-4">
                        {matchedProduct.name}
                      </h4>
                      <p className="text-secondary text-xs font-mono font-bold uppercase tracking-widest mt-1 bg-white border border-tatos-dark px-3 py-1 rounded-full">
                        {matchedProduct.id === 'caramel'
                          ? 'DULCE & AMBICIOSO'
                          : matchedProduct.id === 'flamin'
                          ? 'EXPLOSIVO & AUDAZ'
                          : 'CLÁSICO & RELAJADO'}
                      </p>
                    </div>

                    <p className="text-on-surface-variant font-sans text-sm leading-relaxed max-w-sm mx-auto">
                      {matchedProduct.id === 'caramel'
                        ? 'Tienes un alma creativa, sofisticada y te atraen las capas ricas y profundas de la vida. ¡Tu paladar es refinado y busca el crujiente glaseado artesanal de Caramel!'
                        : matchedProduct.id === 'flamin'
                        ? 'Vives al límite, te apasiona la intensidad, la música fuerte y los desafíos. ¡Te encanta hacer una entrada explosiva, exactamente como las Flamin\' Hot!'
                        : 'Valoras la autenticidad, la comodidad hogareña, las noches de cine sinceras y la verdadera amistad sincera. ¡Tu match ideal es la cremosa mantequilla clásica!'}
                    </p>

                    <div className="flex flex-col md:flex-row gap-3 pt-4">
                      {/* Restart */}
                      <button
                        onClick={handleReset}
                        className="flex-grow md:flex-grow-0 border-2 border-tatos-dark bg-white hover:bg-surface-container py-3 px-4 rounded-xl font-headline text-xs font-bold flex items-center justify-center gap-1.5 active:translate-y-0.5"
                      >
                        <RefreshCw size={14} />
                        REPETIR TEST
                      </button>

                      {/* Add Soulmate */}
                      <button
                        onClick={() => onAddProductToCart(matchedProduct)}
                        className="flex-grow bg-secondary text-white hover:bg-[#930010] py-3 px-5 rounded-xl font-headline text-xs font-black flex items-center justify-center gap-1.5 tatos-btn-shadow border-2 border-tatos-dark"
                      >
                        <ShoppingCart size={14} />
                        LLÉVATE TU SOULMATE
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
