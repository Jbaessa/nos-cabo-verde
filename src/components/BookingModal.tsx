"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Experience = {
  id: string;
  title: string;
  island: string;
  price: number;
  priceUnit: string;
  image: string;
  duration: string;
};

type Props = {
  experience: Experience;
  onClose: () => void;
};

type FormData = {
  checkIn: string;
  checkOut: string;
  people: number;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const STORAGE_KEY = "ncv_bookings";

export function BookingModal({ experience, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({
    checkIn: "",
    checkOut: "",
    people: 1,
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const update = (key: keyof FormData, value: string | number) =>
    setForm((f) => ({ ...f, [key]: value }));

  const canProceedStep1 = form.checkIn && form.people >= 1;
  const canProceedStep2 = form.name.trim() && form.email.trim().includes("@");

  function handleConfirm() {
    const booking = {
      id: `${experience.id}-${Date.now()}`,
      experienceId: experience.id,
      experienceTitle: experience.title,
      island: experience.island,
      ...form,
      total: experience.price * form.people,
      createdAt: new Date().toISOString(),
    };
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, booking]));
    } catch {}
    setStep(3);
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-full max-w-lg bg-ncv-night border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <img src={experience.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
              <div>
                <h2 className="font-serif text-lg text-white leading-tight">{experience.title}</h2>
                <p className="text-white/50 text-xs font-sans">{experience.island} · {experience.price}€ {experience.priceUnit}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/8 text-white/60 hover:bg-white/15 hover:text-white transition-all"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Step indicator */}
          {step < 3 && (
            <div className="flex items-center px-6 pt-5 pb-1 gap-2">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-sans font-semibold transition-all ${
                      step >= s ? "bg-ncv-gold text-ncv-night" : "bg-white/10 text-white/40"
                    }`}
                  >
                    {s}
                  </div>
                  <span className={`text-xs font-sans ${step === s ? "text-white" : "text-white/30"}`}>
                    {s === 1 ? "Data e grupo" : "Dados de contacto"}
                  </span>
                  {s < 2 && <div className="flex-1 h-px bg-white/10 mx-1 w-8" />}
                </div>
              ))}
            </div>
          )}

          {/* Body */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/60 text-xs font-sans mb-1.5">Data de início</label>
                      <input
                        type="date"
                        value={form.checkIn}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => update("checkIn", e.target.value)}
                        className="w-full bg-white/8 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm font-sans focus:outline-none focus:border-ncv-gold/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-xs font-sans mb-1.5">Data de fim <span className="text-white/30">(opcional)</span></label>
                      <input
                        type="date"
                        value={form.checkOut}
                        min={form.checkIn || new Date().toISOString().split("T")[0]}
                        onChange={(e) => update("checkOut", e.target.value)}
                        className="w-full bg-white/8 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm font-sans focus:outline-none focus:border-ncv-gold/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/60 text-xs font-sans mb-1.5">Número de pessoas</label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => update("people", Math.max(1, form.people - 1))}
                        className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 text-white flex items-center justify-center transition-all"
                      >
                        −
                      </button>
                      <span className="text-white font-sans font-semibold text-lg w-8 text-center">{form.people}</span>
                      <button
                        onClick={() => update("people", Math.min(20, form.people + 1))}
                        className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 text-white flex items-center justify-center transition-all"
                      >
                        +
                      </button>
                      <span className="text-white/40 text-sm font-sans ml-2">
                        Total: <span className="text-ncv-gold font-semibold">{experience.price * form.people}€</span>
                      </span>
                    </div>
                  </div>

                  <button
                    disabled={!canProceedStep1}
                    onClick={() => setStep(2)}
                    className="btn btn-gold w-full py-3 text-base disabled:opacity-40 disabled:cursor-not-allowed mt-2"
                  >
                    Continuar
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-white/60 text-xs font-sans mb-1.5">Nome completo</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="O teu nome"
                      className="w-full bg-white/8 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm font-sans placeholder-white/30 focus:outline-none focus:border-ncv-gold/50 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/60 text-xs font-sans mb-1.5">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="email@exemplo.com"
                        className="w-full bg-white/8 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm font-sans placeholder-white/30 focus:outline-none focus:border-ncv-gold/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-xs font-sans mb-1.5">Telefone <span className="text-white/30">(opcional)</span></label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="+238 ..."
                        className="w-full bg-white/8 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm font-sans placeholder-white/30 focus:outline-none focus:border-ncv-gold/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/60 text-xs font-sans mb-1.5">Notas adicionais <span className="text-white/30">(opcional)</span></label>
                    <textarea
                      rows={2}
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      placeholder="Alergias, necessidades especiais, pedidos..."
                      className="w-full bg-white/8 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm font-sans placeholder-white/30 focus:outline-none focus:border-ncv-gold/50 transition-colors resize-none"
                    />
                  </div>

                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => setStep(1)}
                      className="btn btn-glass flex-1 py-3"
                    >
                      Voltar
                    </button>
                    <button
                      disabled={!canProceedStep2}
                      onClick={handleConfirm}
                      className="btn btn-gold flex-1 py-3 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Confirmar pedido
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center text-center py-6 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-white mb-2">Pedido enviado!</h3>
                    <p className="text-white/60 font-sans text-sm leading-relaxed">
                      O teu pedido de reserva para <strong className="text-white">{experience.title}</strong> foi recebido.
                      Responderemos a <strong className="text-white">{form.email}</strong> em menos de 24 horas.
                    </p>
                  </div>
                  <div className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-left space-y-2">
                    <div className="flex justify-between text-sm font-sans">
                      <span className="text-white/50">Data</span>
                      <span className="text-white">{form.checkIn}</span>
                    </div>
                    <div className="flex justify-between text-sm font-sans">
                      <span className="text-white/50">Pessoas</span>
                      <span className="text-white">{form.people}</span>
                    </div>
                    <div className="flex justify-between text-sm font-sans border-t border-white/10 pt-2 mt-2">
                      <span className="text-white/50">Total estimado</span>
                      <span className="text-ncv-gold font-semibold">{experience.price * form.people}€</span>
                    </div>
                  </div>
                  <button onClick={onClose} className="btn btn-gold w-full py-3 text-base">
                    Fechar
                  </button>
                  <p className="text-white/30 text-xs font-sans">
                    Cancelamento gratuito até 48h antes da experiência
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
