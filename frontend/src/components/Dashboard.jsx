import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  
} from 'recharts';

import {
  ShieldCheck,
  ShieldAlert,
  History,
  BarChart3,
} from 'lucide-react';

export default function Dashboard({ history = [] }) {

  // Dynamic dashboard statistics
  const totalAnalyses = history.length;

  const latestScan = history.length > 0 ? history[0] : null;

  const latestScore = latestScan
  ? Number(latestScan.score ?? latestScan.confidence).toFixed(2)
  : "0";

  const aiGeneratedCount = history.filter(
  (scan) => scan.status === "AI Generated"
  ).length;

  // Dynamic graph
  const chartData = history.map((scan, index) => ({
    date: `#${history.length - index}`,
    score: Number(scan.score ?? scan.confidence)
  }));

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="glass-panel p-6 rounded-2xl flex items-center space-x-4 border border-cyber-border">
          <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Detection Confidence
            </p>

            <p className="text-2xl font-bold text-white mt-1">
              {latestScore}% Operational
            </p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex items-center space-x-4 border border-cyber-border">
          <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center border border-indigo-500/20">
            <BarChart3 className="w-6 h-6" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Total Analyses
            </p>

            <p className="text-2xl font-bold text-white mt-1">
              {totalAnalyses} Analyses
            </p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex items-center space-x-4 border border-cyber-border">
          <div className="w-12 h-12 bg-rose-500/10 text-rose-400 rounded-xl flex items-center justify-center border border-rose-500/20">
            <ShieldAlert className="w-6 h-6" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              AI Detections
            </p>

            <p className="text-2xl font-bold text-white mt-1">
              {aiGeneratedCount} Detections
            </p>
          </div>
        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="glass-panel p-6 rounded-2xl border border-cyber-border lg:col-span-2">

          <h3 className="text-base font-bold text-white mb-6 tracking-wide">
            Detection Confidence Trend
          </h3>

          <div className="h-72">

            <ResponsiveContainer width="100%" height="100%">

              <AreaChart data={chartData}>

                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                />

                <XAxis
                  dataKey="date"
                  stroke="#6b7280"
                  fontSize={12}
                />

                <YAxis
                  stroke="#6b7280"
                  fontSize={12}
                  domain={[0,100]}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor:"#111827",
                    borderColor:"rgba(255,255,255,0.1)",
                    color:"#fff"
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fill="url(#colorScore)"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div className="glass-panel p-6 rounded-2xl border border-cyber-border">

  <h3 className="text-base font-bold text-white mb-6 tracking-wide">
    Latest Detection Summary
  </h3>

  {latestScan ? (
    <div className="space-y-5">

      <div>
        <p className="text-xs uppercase text-gray-400">File</p>
        <p className="text-white font-semibold">
          {latestScan.name || latestScan.file_name}
        </p>
      </div>

      <div>
        <p className="text-xs uppercase text-gray-400">Type</p>
        <p className="text-white">
          {latestScan.type || latestScan.content_type}
        </p>
      </div>

      <div>
        <p className="text-xs uppercase text-gray-400">Confidence</p>
        <p className="text-emerald-400 font-semibold">
          {Number(latestScan.score ?? latestScan.confidence).toFixed(2)}%
        </p>
      </div>

      <div>
        <p className="text-xs uppercase text-gray-400">Detection</p>

        <span
          className={`px-3 py-1 rounded-full text-xs ${
            (latestScan.risk || latestScan.status) === "Human"
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-rose-500/20 text-rose-400"
          }`}
        >
          {latestScan.risk || latestScan.status}
        </span>
      </div>

      <div>
        <p className="text-xs uppercase text-gray-400">Source</p>
        <p className="text-indigo-300">
          {latestScan.provider || latestScan.source || "-"}
        </p>
      </div>

    </div>
  ) : (
    <div className="h-72 flex items-center justify-center text-gray-500">
      No scans yet
    </div>
  )}
        </div>

      </div>

      {/* History */}
      <div className="glass-panel p-6 rounded-2xl border border-cyber-border">

        <div className="flex items-center space-x-2 mb-6">
          <History className="w-5 h-5 text-indigo-400"/>
          <h3 className="text-base font-bold text-white">
            Recent Analysis
          </h3>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-left text-sm text-gray-400">

            <thead className="bg-slate-900/40 text-xs uppercase border-b border-gray-800">

              <tr>
                <th className="py-3 px-4">File</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4">Detection</th>
                <th className="py-3 px-4">Source</th>
              </tr>

            </thead>

            <tbody className="divide-y divide-gray-800/60">

              {history.map((scan) => (

                <tr
                  key={scan.id}
                  className="hover:bg-slate-800/20 transition"
                >

                  <td className="py-4 px-4 font-medium text-white">
                    {scan.name || scan.file_name}
                  </td>

                  <td className="py-4 px-4">
                    {scan.type || scan.content_type}
                  </td>

                  <td className="py-4 px-4">

                    <span
                      className={`font-semibold ${
                        (scan.score ?? scan.confidence) >= 75
                          ? "text-emerald-400"
                          : (scan.score ?? scan.confidence) >= 40
                          ? "text-amber-400"
                          : "text-rose-400"
                      }`}
                    >
                     {Number(scan.score ?? scan.confidence).toFixed(2)}%
                    </span>

                  </td>

                  <td className="py-4 px-4">

                    <span
                      className={`px-2.5 py-1 text-xs rounded-full border ${
                        (scan.risk || scan.status) === "Authentic"
                          ? "bg-emerald-950/40 text-emerald-400 border-emerald-800/40"
                          : (scan.risk || scan.status) === "Suspicious"
                          ? "bg-amber-950/40 text-amber-400 border-amber-800/40"
                          : "bg-rose-950/40 text-rose-400 border-rose-800/40"
                      }`}
                    >
                      {scan.risk || scan.status}
                    </span>

                  </td>

                  <td className="py-4 px-4">

                    <span className="text-indigo-300 font-medium">
                      {scan.provider || scan.source || "-"}
                    </span>

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