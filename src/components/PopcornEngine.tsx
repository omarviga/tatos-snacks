import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Zap, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { PopcornParticle } from '../types';

export default function PopcornEngine() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [flavor, setFlavor] = useState<'caramel' | 'flamin' | 'butter'>('butter');
  const [isPoppingActive, setIsPoppingActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [stats, setStats] = useState({ poppedCount: 0, unpoppedCount: 20 });
  
  const particlesRef = useRef<PopcornParticle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Sound generator
  const triggerPopSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!ctxRef.current) {
        ctxRef.current = new AudioCtx();
      }
      const ctx = ctxRef.current;
      
      // Tiny randomized pitch drop representing high pressure steam releasing
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      const startFreq = 700 + Math.random() * 500;
      osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80 + Math.random() * 40, ctx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch (e) {
      // Ignored if user hasn't interacted yet
    }
  };

  const ctxRef = useRef<AudioContext | null>(null);

  // Initialize unpopped kernels at the bottom
  const initKernels = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width;
    const height = canvas.height;
    const newParticles: PopcornParticle[] = [];

    // Create 20 unpopped kernels at the bottom
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: `kernel-${i}-${Date.now()}`,
        x: 40 + Math.random() * (width - 80),
        y: height - 15 - Math.random() * 10,
        vx: (Math.random() - 0.5) * 1.5,
        vy: 0,
        rotation: Math.random() * Math.PI * 2,
        scale: 0.8 + Math.random() * 0.4,
        type: 'kernel'
      });
    }

    particlesRef.current = newParticles;
    setStats({ poppedCount: 0, unpoppedCount: 20 });
  };

  // Add more unpopped kernels
  const addKernels = (count = 15) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width;
    const height = canvas.height;

    const currentParticles = [...particlesRef.current];
    for (let i = 0; i < count; i++) {
      currentParticles.push({
        id: `kernel-extra-${i}-${Date.now()}`,
        x: 40 + Math.random() * (width - 80),
        y: height - 15 - Math.random() * 10,
        vx: (Math.random() - 0.5) * 1.5,
        vy: 0,
        rotation: Math.random() * Math.PI * 2,
        scale: 0.7 + Math.random() * 0.4,
        type: 'kernel'
      });
    }

    particlesRef.current = currentParticles;
    recalculateStats(currentParticles);
  };

  const recalculateStats = (particles: PopcornParticle[]) => {
    const popped = particles.filter(p => p.type !== 'kernel').length;
    const unpopped = particles.filter(p => p.type === 'kernel').length;
    setStats({ poppedCount: popped, unpoppedCount: unpopped });
  };

  // Action trigger to pop random kernel
  const popOneKernel = () => {
    const particles = [...particlesRef.current];
    const unpoppedIndex = particles.findIndex(p => p.type === 'kernel');
    if (unpoppedIndex === -1) {
      // Auto register a new batch if we popped all
      addKernels(10);
      return;
    }

    // Pop the kernel!
    const target = particles[unpoppedIndex];
    target.type = flavor === 'caramel' ? 'popped_caramel' : flavor === 'flamin' ? 'popped_red' : 'popped_white';
    
    // Physical explosion force!
    target.vx = (Math.random() - 0.5) * 12;
    target.vy = -14 - Math.random() * 8; // Burst up
    target.rotation = Math.random() * Math.PI * 2;
    target.scale = 1.3 + Math.random() * 0.5; // Larger size puffed

    triggerPopSound();
    particlesRef.current = particles;
    recalculateStats(particles);
  };

  // Run physical update loops
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fluid resize observer matching the framework constraints
    const handleResize = () => {
      const container = containerRef.current;
      if (container && canvas) {
        canvas.width = container.clientWidth;
        canvas.height = 360; // Stable custom responsive height
        initKernels();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Physics Engine Loop
    const runPhysics = () => {
      if (!canvas || !ctx) return;
      const width = canvas.width;
      const height = canvas.height;

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Draw active background tint based on flavor selected
      ctx.fillStyle = flavor === 'caramel' 
        ? 'rgba(109, 76, 65, 0.03)' 
        : flavor === 'flamin'
        ? 'rgba(255, 87, 34, 0.03)'
        : 'rgba(255, 249, 196, 0.03)';
      ctx.fillRect(0, 0, width, height);

      // Draw microwave grill background lines
      ctx.strokeStyle = 'rgba(43, 27, 23, 0.04)';
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      for (let j = 0; j < height; j += 30) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(width, j);
        ctx.stroke();
      }

      const gravity = 0.5;
      const friction = 0.98;
      const bounce = -0.4;

      particlesRef.current = particlesRef.current.map((p) => {
        let { x, y, vx, vy, rotation, scale, type, id } = p;

        if (type !== 'kernel') {
          // Dynamic physics only on popped kernels
          vy += gravity;
          vx *= friction;
          vy *= friction;

          x += vx;
          y += vy;

          // Rotation momentum
          rotation += vx * 0.02;

          // Collision boundaries: floor
          if (y > height - 20) {
            y = height - 20;
            vy *= bounce;
            vx *= 0.8; // Floor friction
          }

          // Left/right walls
          if (x < 15) {
            x = 15;
            vx *= bounce;
          } else if (x > width - 15) {
            x = width - 15;
            vx *= bounce;
          }
        } else {
          // Slowly settle down unpopped ones
          if (y < height - 15) {
            y += 0.5;
          }
        }

        // Draw individual particle
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);

        if (type === 'kernel') {
          // Small yellow gold kernel seed
          ctx.fillStyle = '#fabd00';
          ctx.strokeStyle = '#2b1b17';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.ellipse(0, 0, 5 * scale, 8 * scale, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          
          // Little root highlight
          ctx.fillStyle = '#fff8f2';
          ctx.beginPath();
          ctx.arc(0, 5 * scale, 2 * scale, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw fluffy product puffs with corresponding custom colored crumbs
          ctx.strokeStyle = '#2b1b17';
          ctx.lineWidth = 2;

          // Multi-blob puff core
          const size = 10 * scale;
          ctx.fillStyle = type === 'popped_caramel' 
            ? '#FFD54F' 
            : type === 'popped_red' 
            ? '#FF8A65' 
            : '#FFFFFF';

          // Inner cream core
          ctx.beginPath();
          ctx.arc(0, 0, size, 0, Math.PI * 2);
          ctx.arc(-size * 0.4, -size * 0.4, size * 0.8, 0, Math.PI * 2);
          ctx.arc(size * 0.4, -size * 0.4, size * 0.8, 0, Math.PI * 2);
          ctx.arc(0, size * 0.4, size * 0.7, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Glaze / Spice spray layering overlay
          ctx.fillStyle = type === 'popped_caramel' 
            ? '#D84315' // dark orange caramel glaze 
            : type === 'popped_red' 
            ? '#B6171E' // deep red flamin spices
            : '#FFF59D'; // light butter yellow cream dots
          
          ctx.beginPath();
          ctx.arc(-size * 0.3, -size * 0.1, size * 0.3, 0, Math.PI * 2);
          ctx.arc(size * 0.2, -size * 0.3, size * 0.25, 0, Math.PI * 2);
          ctx.arc(0, size * 0.1, size * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        return { ...p, x, y, vx, vy, rotation };
      });

      animationFrameRef.current = requestAnimationFrame(runPhysics);
    };

    runPhysics();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [flavor]);

  // Microwave simulation hold action trigger
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPoppingActive) {
      interval = setInterval(() => {
        // Pop kernels fast!
        popOneKernel();
      }, 250);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPoppingActive, flavor]);

  return (
    <section id="simulator" className="py-20 bg-surface-container-low border-y-4 border-tatos-dark relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-white border border-tatos-dark text-xs font-black uppercase tracking-wider mb-3">
            <Zap size={14} className="animate-pulse" />
            TATOS LABS
          </div>
          <h2 className="font-headline text-3xl md:text-5xl font-black text-tatos-dark uppercase">
            Simulador de Popping 3D
          </h2>
          <p className="max-w-xl mx-auto text-on-surface-variant font-sans text-xs md:text-sm mt-1">
            Experimenta la física detrás del crujido perfecto. Presiona el gatillo para calentar la máquina y ver explotar las palomitas gigantes de sabores.
          </p>
        </div>

        <div className="bg-[#2b1b17] rounded-[40px] p-6 border-4 border-tatos-dark shadow-[16px_16px_0_0_#785900] overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6 relative">
          
          {/* Main Visual Screen (Simulator View) */}
          <div className="md:col-span-8 flex flex-col space-y-4">
            <div className="flex justify-between items-center bg-[#201b11] border border-outline/30 px-4 py-2.5 rounded-2xl">
              <span className="flex items-center gap-1.5 font-mono text-xs font-bold text-primary-container animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-container inline-block" />
                MICROWAVE_ACTIVE_VIEW
              </span>
              <div className="flex items-center gap-4">
                <div className="text-right text-xs font-mono text-white/50">
                  <span className="block text-[9px] uppercase">Fluffy:</span>
                  <strong className="text-white font-black">{stats.poppedCount}</strong>
                </div>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="text-white hover:text-primary-container p-1 rounded-lg"
                  title="Activar sonoridad"
                >
                  {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
              </div>
            </div>

            {/* Container for React Canvas resize */}
            <div
              ref={containerRef}
              className="bg-[#201b11] rounded-3xl border-2 border-[#2b1b17] overflow-hidden h-[360px] relative cursor-crosshair group flex items-stretch"
              onClick={popOneKernel}
            >
              <canvas ref={canvasRef} className="w-full h-full block" />
              
              {/* Overlay tutorial tip */}
              <div className="absolute inset-x-0 bottom-4 text-center pointer-events-none select-none">
                <span className="text-[10px] bg-tatos-dark/80 text-white/80 px-2.5 py-1 rounded-lg font-mono border border-outline/20">
                  Haz clic directo para reventar palomitas individuales
                </span>
              </div>
            </div>
          </div>

          {/* Configuration Right Sidebar Controls */}
          <div className="md:col-span-4 bg-surface rounded-3xl border-2 border-tatos-dark p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h4 className="font-headline font-black uppercase text-tatos-dark text-sm border-b-2 border-tatos-dark pb-2">
                Controles de Cabina
              </h4>

              {/* Flavor switches */}
              <div className="space-y-2">
                <label className="text-[10px] text-outline font-black uppercase">Sabor de Grano:</label>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => setFlavor('butter')}
                    className={`p-2.5 border-2 rounded-xl text-left font-headline text-xs font-bold flex items-center justify-between transition-all ${
                      flavor === 'butter'
                        ? 'bg-butter-cream border-primary scale-[1.02] shadow-sm'
                        : 'border-outline hover:border-tatos-dark'
                    }`}
                  >
                    Mantequilla Clásica
                    <span className="w-4 h-4 bg-white border border-tatos-dark rounded-full flex items-center justify-center text-[10px]">🍿</span>
                  </button>

                  <button
                    onClick={() => setFlavor('caramel')}
                    className={`p-2.5 border-2 rounded-xl text-left font-headline text-xs font-bold flex items-center justify-between transition-all ${
                      flavor === 'caramel'
                        ? 'bg-surface-container-high border-primary scale-[1.02] shadow-sm'
                        : 'border-outline hover:border-tatos-dark'
                    }`}
                  >
                    Caramelo Dorado
                    <span className="w-4 h-4 bg-white border border-tatos-dark rounded-full flex items-center justify-center text-[10px]">🍯</span>
                  </button>

                  <button
                    onClick={() => setFlavor('flamin')}
                    className={`p-2.5 border-2 rounded-xl text-left font-headline text-xs font-bold flex items-center justify-between transition-all ${
                      flavor === 'flamin'
                        ? 'bg-secondary-fixed border-flamin-orange scale-[1.02] shadow-sm'
                        : 'border-outline hover:border-tatos-dark'
                    }`}
                  >
                    Spicy Flamin Hot
                    <span className="w-4 h-4 bg-white border border-tatos-dark rounded-full flex items-center justify-center text-[10px]">🔥</span>
                  </button>
                </div>
              </div>

              {/* Status parameters visual bar */}
              <div className="bg-surface-container p-3.5 rounded-2xl border border-tatos-dark/30 space-y-2 text-xs">
                <span className="text-[10px] text-outline font-black uppercase block">Sensores de Temperatura:</span>
                <div className="flex justify-between items-center text-[11px] font-mono leading-none">
                  <span>Granos sin abrir:</span>
                  <strong className="text-secondary font-bold">{stats.unpoppedCount}</strong>
                </div>
                <div className="flex justify-between items-center text-[11px] font-mono leading-none">
                  <span>Rendimiento Pop:</span>
                  <strong className="text-primary font-bold">{stats.poppedCount} bolsas</strong>
                </div>
              </div>
            </div>

            {/* Quick-heat hold button/triggers */}
            <div className="space-y-2">
              <button
                onMouseDown={() => setIsPoppingActive(true)}
                onMouseUp={() => setIsPoppingActive(false)}
                onMouseLeave={() => setIsPoppingActive(false)}
                onTouchStart={() => setIsPoppingActive(true)}
                onTouchEnd={() => setIsPoppingActive(false)}
                className="w-full bg-[#da3433] hover:bg-[#b6171e] text-white py-4 rounded-xl border-2 border-tatos-dark tatos-btn-shadow font-headline font-black text-xs uppercase text-center flex items-center justify-center gap-1.5 cursor-pointer user-select-none"
              >
                <Zap size={14} className="stroke-[3]" />
                {isPoppingActive ? '¡CALENTANDO RÁPIDO!' : 'MANTENER PULSADO CALOR'}
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => addKernels(15)}
                  className="bg-white border-2 border-tatos-dark py-2.5 rounded-xl font-headline font-bold text-[10px] text-center hover:bg-surface-container"
                >
                  MÁS GRANOS
                </button>
                <button
                  onClick={initKernels}
                  className="bg-white border-2 border-tatos-dark py-2.5 rounded-xl font-headline font-semibold text-[10px] text-center hover:bg-surface-container flex items-center justify-center gap-1"
                >
                  <RotateCcw size={10} /> REINICIAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
