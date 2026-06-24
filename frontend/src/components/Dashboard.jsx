import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { ShieldCheck, ShieldAlert, History, BarChart3, Download } from 'lucide-react';

// Unified mock telemetry dataset reflecting multi-modal verification timelines
const mockHistoryData = [
  { date: '06/18', score: 92 },
  { date: '06/19', score: 85 },
  { date: '06/20', score: 41 },
  { date: '06/21', score: 78 },
  { date: '06/22', score: 14 },
  { date: '06/23', score: 95 },
  { date: '06/24', score: 88 },
];

const mockLatestRadar = [
  { subject: 'Voice Integrity', A: 90, fullMark: 100 },
  { subject: 'Audio Codec', A: 82, fullMark: 100 },
  { subject: 'Text Perplexity', A: 95, fullMark: 100 },
  { subject: 'Linguistic Drift', A: 88, fullMark: 100 },
  { subject: 'Spectral Sync', A: 91, fullMark: 100 },
];

const pastScans = [
  { id: '1', name: 'audio_intercept_01.wav', score: 88, risk: 'Authentic', type: 'Audio' },
  { id: '2', name: 'ceo_voice_cloned.mp3', score: 14, risk: 'High Risk Deepfake', type: 'Voice' },
  { id: '3', name: 'press_release_draft.txt', score: 41, risk: 'Suspicious', type: 'Text' },
];

export default function Dashboard({ history = pastScans, triggerMockPdf }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl flex items-center space-x-4 border border-cyber-border">
          <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">System Integrity Health</p>
            <p className="text-2xl font-bold text-white mt-1">99.4% Operational</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex items-center space-x-4 border border-cyber-border">
          <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center border border-indigo-500/20">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Validations Conducted</p>
            <p className="text-2xl font-bold text-white mt-1">1,248 Analyses</p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex items-center space-x-4 border border-cyber-border">
          <div className="w-12 h-12 bg-rose-500/10 text-rose-400 rounded-xl flex items-center justify-center border border-rose-500/20">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Deepfake Threats Intercepted</p>
            <p className="text-2xl font-bold text-white mt-1">142 Mutated Elements</p>
          </div>
        </div>
      </div>

      {/* Charts Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-cyber-border lg:col-span-2">
          <h3 className="text-base font-bold text-white mb-6 tracking-wide">Historical Analysis Integrity Drift</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockHistoryData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }} />
                <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-cyber-border">
          <h3 className="text-base font-bold text-white mb-6 tracking-wide">Latest Matrix Fingerprint</h3>
          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" r="80%" data={mockLatestRadar}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="subject" stroke="#9ca3af" fontSize={10} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255,255,255,0.2)" fontSize={8} />
                <Radar name="Authenticity Metric" dataKey="A" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* History Log Panel */}
      <div className="glass-panel p-6 rounded-2xl border border-cyber-border">
        <div className="flex items-center space-x-2 mb-6">
          <History className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white tracking-wide">Recent Validation Sequences</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-slate-900/40 text-xs font-semibold tracking-wider uppercase text-gray-400 border-b border-gray-800">
              <tr>
                <th className="py-3 px-4">Target Artifact Identifier</th>
                <th className="py-3 px-4">Vector Classification</th>
                <th className="py-3 px-4">Confidence Factor</th>
                <th className="py-3 px-4">Risk Evaluation Status</th>
                <th className="py-3 px-4 text-right">Data Exfiltration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {history.map((scan) => (
                <tr key={scan.id} className="hover:bg-slate-800/20 transition">
                  <td className="py-4 px-4 font-medium text-white">{scan.name}</td>
                  <td className="py-4 px-4">{scan.type}</td>
                  <td className="py-4 px-4">
                    <span className={`font-semibold ${scan.score >= 75 ? 'text-emerald-400' : scan.score >= 40 ? 'text-amber-400' : 'text-rose-400'}`}>
                      {scan.score}% Secure
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
                      scan.risk === 'Authentic' ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/40' :
                      scan.risk === 'Suspicious' ? 'bg-amber-950/40 text-amber-400 border-amber-800/40' :
                      'bg-rose-950/40 text-rose-400 border-rose-800/40'
                    }`}>
                      {scan.risk}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button 
                      onClick={() => triggerMockPdf(scan)}
                      className="p-1 text-gray-500 hover:text-white transition"
                      title="Download PDF Report"
                    >
                      <Download className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}