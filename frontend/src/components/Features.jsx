import React from 'react';
import { Mic, Radio, FileText, Share2 } from 'lucide-react';

const coreFeatures = [
  {
    icon: Mic,
    title: "Voice Cloning Pipeline",
    desc: "Uses targeted MFCC features and frequency deviation architectures via Librosa data models to pinpoint cloned voices or synthetic synthesis.",
    color: "text-indigo-400"
  },
  {
    icon: Radio,
    title: "Audio Spoof Mitigation",
    desc: "Scans environmental background metrics and synthetic codec patterns based on ASVspoof standards to intercept spoofing playbacks.",
    color: "text-emerald-400"
  },
  {
    icon: FileText,
    title: "Transformer Text Validation",
    desc: "Fine-tuned DistilBERT models analyze perplexity, linguistic drift, and token probabilities via the HC3 dataset configuration.",
    color: "text-rose-400"
  },
  {
    icon: Share2,
    title: "RandomForest Fusion",
    desc: "Aggregates independent probability vectors into a consolidated multi-modal certainty assessment using mathematical ensemble models.",
    color: "text-amber-400"
  }
];

export default function Features() {
  return (
    <section id="features-section" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Engineered Multi-Layer Verification
        </h2>

        <p className="mt-4 text-gray-400">
          Isolated singular modalities fail against blended vector modern threats.
          EchoProof monitors three dynamic vectors concurrently.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {coreFeatures.map((feat, idx) => {
          const IconComp = feat.icon;

          return (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl border border-cyber-border hover:border-indigo-500/40 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-xl bg-slate-900/80 flex items-center justify-center mb-6 border border-gray-800 ${feat.color}`}
                >
                  <IconComp className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {feat.title}
                </h3>

                <p className="text-sm text-gray-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}