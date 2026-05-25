import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ShieldCheck, Flame, Send, CheckCircle2, FileText, Heart, Sparkles } from 'lucide-react';

export default function B2BStory() {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    location: '',
    volume: '100-500',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [leadCode, setLeadCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.businessName) {
      alert('Por favor, completa los campos requeridos.');
      return;
    }

    // Generate a beautiful randomized lead code reference for high-fidelity realism
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    setLeadCode(`TATO-B2B-${randomNum}`);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      businessName: '',
      email: '',
      phone: '',
      location: '',
      volume: '100-500',
      message: ''
    });
    setIsSubmitted(false);
  };

  return (
    <section id="b2b-story" className="py-24 bg-surface border-t-2 border-b-2 border-tatos-dark relative overflow-hidden">
      {/* Decorative background grids */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#2b1b17_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT 7-COLUMNS: "Nuestra Historia" & Processes */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <span className="text-primary font-headline text-xs font-black uppercase tracking-widest bg-white border border-tatos-dark/35 px-3 py-1 rounded-full inline-block">
                NUESTRA ALMA
              </span>
              <h2 className="font-headline text-4xl md:text-5xl font-black text-tatos-dark uppercase mt-3 leading-none">
                El Arte Detrás Del <span className="text-secondary">Crujido Perfecto</span>
              </h2>
              <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed mt-4 max-w-xl text-tatos-dark/80">
                Tatos nació de una obsesión familiar: redefinir los momentos de antojo. Nos rehusamos a aceptar palomitas industriales llenas de saborizantes químicos pesados y granos aplastados que no capturan el sabor.
              </p>
            </div>

            {/* Step-by-step Quality pillars */}
            <div className="space-y-6">
              <div className="flex gap-4 items-start bg-white p-5 rounded-3xl border-2 border-tatos-dark/15 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary-container border-2 border-tatos-dark flex items-center justify-center shrink-0 font-headline text-sm font-black">
                  01
                </div>
                <div>
                  <h4 className="font-headline text-xs font-black text-tatos-dark uppercase tracking-wider flex items-center gap-1.5">
                    Grano Esférico Mandinga No-OGM
                  </h4>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed mt-1 text-tatos-dark/70">
                    Importamos únicamente variedades de maíz tipo hongo ("mushroom kernel"). Al estallar, forman esferas perfectas en 3D que absorben salsas y caramelos uniformemente en 360 grados sin quebrarse.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-white p-5 rounded-3xl border-2 border-tatos-dark/15 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-secondary-container text-white border-2 border-tatos-dark flex items-center justify-center shrink-0 font-headline text-sm font-black">
                  02
                </div>
                <div>
                  <h4 className="font-headline text-xs font-black text-tatos-dark uppercase tracking-wider flex items-center gap-1.5">
                    Estallado por Aire Puro (Cero Grasas)
                  </h4>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed mt-1 text-tatos-dark/70">
                    A diferencia de los cines comerciales, no freímos el maíz en aceites quemados. Nuestro sistema estalla los granos con un flujo controlado de aire caliente, logrando una palomita sumamente ligera, saludable y libre de grasas saturadas.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-white p-5 rounded-3xl border-2 border-tatos-dark/15 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-butter-cream text-primary border-2 border-tatos-dark flex items-center justify-center shrink-0 font-headline text-sm font-black">
                  03
                </div>
                <div>
                  <h4 className="font-headline text-xs font-black text-tatos-dark uppercase tracking-wider flex items-center gap-1.5">
                    Glaseado en Cazos de Cobre a Mano
                  </h4>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed mt-1 text-tatos-dark/70">
                    El caramelo no sale de una máquina automatizada. Se cocina por lotes pequeños en tradicionales cazos de cobre, revolviendo a mano con paletas de madera para asegurar un glaseado crujiente tipo espejo que no se ablanda.
                  </p>
                </div>
              </div>
            </div>

            {/* Social network simulated Instagram feed section */}
            <div className="bg-surface-container-low border-2 border-tatos-dark p-6 rounded-[32px] space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📸</span>
                  <span className="text-[10px] font-headline font-black uppercase text-tatos-dark/60 tracking-wider">COMUNIDAD EN INSTAGRAM</span>
                </div>
                <span className="text-[10px] font-mono font-black text-secondary">@TatosSnacksOficial</span>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="aspect-square bg-neutral-200 rounded-2xl overflow-hidden relative group border border-tatos-dark/10">
                  <img
                    referrerPolicy="no-referrer"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDb086pVV5U7W5a-Ipc-NNXouhAXlYRdVyhwNq5tspHDuzsUlErR_BoY_KnUSeob9NDuttbrFXxp9Lt9kql7Cw7qcmipBZ1gNTRevUbTz7t2HfNi9_U2D8X-z-n--OVjJcHh7EvF0f1oYE90eWWFKjPiTwPkFJWagr6pUeImVFLljS3d7kw_-CkX_rUZPrCalOXP2n-XW8_g0SRVS8mGSRJKSGLiJ-PPmHHmL9Yy4P41AR_1VGQ1HQqxJkIafJZw8bn1prBrlsq033"
                    alt="Maíz artesanal"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-headline font-black">❤️ 242</div>
                </div>
                <div className="aspect-square bg-neutral-200 rounded-2xl overflow-hidden relative group border border-tatos-dark/10">
                  <img
                    referrerPolicy="no-referrer"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDZatJQ56Zikl_mGa07LMQs78gETNDpZbKO_4beskkFaM1wUw2BIsjzfGBxN2mImb0GxSdjIV_gsoe0VtMJRO5BYgpdSkpphoWBi2_f3WSRd0q-6A4jzqSgoJszmoc9FL5_xS50GQ2uyJkgsFGdpKwU6pKtFsFFOtrVesrjGPd1DQjvL4W_NZQbfLo8oWT5agtOXjKNC3q_wUiROrOsz53blSbjR0X5T8XSpCNR0d-ddx9ZnZ9SQc9HVeZ6YfimmsV9yi8EDwbmtvX"
                    alt="Movie Night"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-headline font-black">❤️ 418</div>
                </div>
                <div className="aspect-square bg-neutral-200 rounded-2xl overflow-hidden relative group border border-tatos-dark/10">
                  <img
                    referrerPolicy="no-referrer"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGEkrxlGmXzvrOZr4YzaXRTfKpN7yzljIyIfRijohIi6oGXQeAB-Zs0B11xJT8I68FNQlEs5qGp2oBZV45x5nUR8WlIH9APzyvFngH57m9_nByaA-VLTTafh28UKurXEPpFKZ2rSKGuxCj4X_ifUxyKHJFj2Qn9zaf7xh2-UP0nIM7jBiqYP6seC5mbNSQhOflmhZi1bGPZzxz4KZUOXB3mDssJ7keAEAMepN1mVk4ECucOX3cQzCGVqLqhuVdeasbm00eS7hoaWQV"
                    alt="Crunch Tatos"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-headline font-black">❤️ 389</div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT 5-COLUMNS: "Canal de Mayoreo" lead capture form */}
          <div id="mayoreo" className="lg:col-span-5 w-full">
            <div className="bg-white border-4 border-tatos-dark p-6 sm:p-8 rounded-[40px] shadow-[12px_12px_0_0_#2b1b17] relative">
              <span className="text-secondary font-headline text-[9px] font-black uppercase tracking-widest bg-secondary-fixed text-secondary px-2.5 py-1 rounded-full border border-tatos-dark inline-block mb-3">
                B2B & NEGOCIOS
              </span>
              
              <h3 className="font-headline text-2xl sm:text-3xl font-black text-tatos-dark uppercase leading-tight">
                Canal de <span className="text-primary">Mayoristas</span>
              </h3>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed mt-2 text-tatos-dark/70">
                ¿Tienes una tiendita, distribuidora, tienda de conveniencia, boutique o evento y quieres ofrecer Tatos Snacks? Solicita cotización por volumen.
              </p>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="b2b-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4 mt-6"
                  >
                    <div>
                      <label className="text-[10px] uppercase font-black text-tatos-dark/60 tracking-wider font-headline">Nombre Completo *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Juan Pérez"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full mt-1 bg-neutral-50 border-2 border-tatos-dark rounded-xl px-4 py-2.5 text-xs font-sans focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-tatos-dark transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase font-black text-tatos-dark/60 tracking-wider font-headline">Tu Negocio / Tienda *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Tienda El Estallido"
                          value={formData.businessName}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                          className="w-full mt-1 bg-neutral-50 border-2 border-tatos-dark rounded-xl px-4 py-2.5 text-xs font-sans focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-tatos-dark transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-black text-tatos-dark/60 tracking-wider font-headline font-headline">Ubicación (Ciudad/Estado)</label>
                        <input
                          type="text"
                          placeholder="Ej. Monterrey, NL"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full mt-1 bg-neutral-50 border-2 border-tatos-dark rounded-xl px-4 py-2.5 text-xs font-sans focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-tatos-dark transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase font-black text-tatos-dark/60 tracking-wider font-headline">Correo Corporativo *</label>
                        <input
                          type="email"
                          required
                          placeholder="juan@minegocio.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full mt-1 bg-neutral-50 border-2 border-tatos-dark rounded-xl px-4 py-2.5 text-xs font-sans focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-tatos-dark transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-black text-tatos-dark/60 tracking-wider font-headline font-headline">WhatsApp / Teléfono</label>
                        <input
                          type="tel"
                          placeholder="Ej. 55-1234-5678"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full mt-1 bg-neutral-50 border-2 border-tatos-dark rounded-xl px-4 py-2.5 text-xs font-sans focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-tatos-dark transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-black text-tatos-dark/60 tracking-wider font-headline">Volumen de Compra Estimado (Mensual)</label>
                      <select
                        value={formData.volume}
                        onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                        className="w-full mt-1 bg-neutral-50 border-2 border-tatos-dark rounded-xl px-4 py-2.5 text-xs font-headline hover:bg-neutral-100 transition-colors focus:bg-white cursor-pointer focus:outline-none"
                      >
                        <option value="100-500">100 - 500 Bolsas</option>
                        <option value="500-2000">500 - 2,000 Bolsas</option>
                        <option value="2000+">Más de 2,000 Bolsas</option>
                        <option value="event">Lotes personalizados para Eventos / Bodas</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-black text-tatos-dark/60 tracking-wider font-headline">Cuéntanos sobre tu Negocio</label>
                      <textarea
                        rows={2}
                        placeholder="Mensaje o dudas adicionales..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full mt-1 bg-neutral-50 border-2 border-tatos-dark rounded-xl px-4 py-2 text-xs font-sans focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-tatos-dark resize-none transition-colors"
                      />
                    </div>

                    <p className="text-[9px] text-tatos-dark/50 leading-relaxed font-sans">
                      * Al enviar, un asesor regional te contactará directamente vía correo o WhatsApp en menos de 3 horas hábiles con nuestro catálogo de precios mayoristas.
                    </p>

                    <button
                      id="submit-wholesale-b2b"
                      type="submit"
                      className="w-full bg-[#2b1b17] hover:bg-secondary text-white font-headline text-xs font-black uppercase py-4 rounded-xl border-2 border-tatos-dark tatos-btn-shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send size={13} />
                      Enviar Solicitud Mayorista
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="b2b-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center p-6 bg-primary-container/30 rounded-3xl border-2 border-dashed border-primary mt-8 space-y-4"
                  >
                    <div className="w-14 h-14 bg-primary text-white flex items-center justify-center rounded-full mx-auto border-2 border-tatos-dark shadow text-xl">
                      🎉
                    </div>
                    
                    <div>
                      <h4 className="font-headline text-lg font-black text-tatos-dark uppercase">¡SOLICITUD INTEGRADA!</h4>
                      <p className="font-sans text-xs text-tatos-dark/80 mt-1 leading-relaxed">
                        Hola <strong className="text-secondary">{formData.name}</strong>, tu registro de mayoreo para <strong className="text-secondary">{formData.businessName}</strong> se ha procesado con éxito en nuestro sistema de asignación de distribuidores.
                      </p>
                    </div>

                    <div className="bg-white border-2 border-tatos-dark p-3.5 rounded-2xl max-w-xs mx-auto space-y-1">
                      <div className="text-[9px] text-outline uppercase font-black tracking-wider">Ref. de Lead Mayorista:</div>
                      <code className="text-secondary font-mono text-sm font-black uppercase tracking-widest">{leadCode}</code>
                    </div>

                    <div className="text-left bg-white p-4 rounded-2xl border border-tatos-dark/15 space-y-1 text-xs text-tatos-dark/75">
                      <p>✅ <strong>Región:</strong> {formData.location ? formData.location : 'Por asignar'}</p>
                      <p>✅ <strong>Volumen solicitado:</strong> {formData.volume === '100-500' ? '100-500 Bolsas/mes' : formData.volume === '500-2000' ? '500-2000 Bolsas/mes' : formData.volume === '2000+' ? 'Más de 2000 Bolsas/mes' : 'Lotes personalizados para Eventos'}</p>
                      <p>✅ <strong>Contacto prioritario:</strong> {formData.email}</p>
                    </div>

                    <p className="text-[10px] text-tatos-dark/60 font-sans leading-relaxed">
                      Se ha despachado un folleto informativo de precios y márgenes de ganancia (hasta un 45%). Un asesor regional de Tatos Snacks te conectará vía WhatsApp en un plazo menor a 3 horas hábiles.
                    </p>

                    <button
                      onClick={handleReset}
                      className="text-[10px] font-black uppercase text-secondary hover:text-primary transition-colors inline-block underline focus:outline-none cursor-pointer mt-2"
                    >
                      Registrar otro negocio dócil
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
