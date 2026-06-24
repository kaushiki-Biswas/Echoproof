import React from 'react';
import { motion } from 'framer-motion';

export default function Hero({ setView }) {
  return (
    <div className="relative py-20 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl z-10"
      >
        <span className="px-3 py-1 text-xs font-semibold tracking-widest text-indigo-400 uppercase bg-indigo-950/50 rounded-full border border-indigo-800/40">
          Next-Gen Multimodal AI Integrity Engine
        </span>

        <h1 className="mt-6 text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
          Unified Deepfake Detection Across <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400 bg-clip-text text-transparent">
            Voice, Audio, &amp; Text
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          EchoProof isolates, analyzes, and cross-references synthesized artifacts
          using deep neural extraction layers to generate unified authenticity
          validation scores.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setView('auth')}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl font-semibold shadow-lg shadow-indigo-500/20 transition transform hover:-translate-y-0.5 border border-indigo-400/30"
          >
            Initialize Analysis Framework
          </button>

          <button
            onClick={() =>
              document
                .getElementById('features-section')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="px-8 py-4 glass-panel hover:bg-slate-800/60 rounded-xl font-semibold transition border border-gray-700/50 text-gray-300 hover:text-white"
          >
            Technical Overview
          </button>
        </div>
      </motion.div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-600/5 rounded-full blur-3xl -z-10 pointer-events-none" />
    </div>
  );
}