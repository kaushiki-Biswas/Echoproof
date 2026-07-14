import React, { useState } from 'react';
import { Upload, FileAudio, AlertCircle, RefreshCw, Cpu } from 'lucide-react';
import { detectionService } from '../services/api';

export default function UploadCenter({ onAnalysisComplete }) {
  const [activeTab, setActiveTab] = useState('media');
  const [file, setFile] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleProcessMedia = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Execution halted: No audio file has been selected for analysis.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const type = file.name.endsWith(".txt") ? "Text" : "Audio";

      const result = await detectionService.analyzeFile(file, type);

      onAnalysisComplete(result);

      setFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProcessText = async (e) => {
    e.preventDefault();

    if (!textInput.trim()) {
      setError(
        "Execution halted: No text input has been provided for analysis."
      );
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const result = await detectionService.analyzeText(textInput);

      onAnalysisComplete(result);

      setTextInput("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Tabs */}
      <div className="flex space-x-2 bg-slate-900/60 p-1.5 rounded-xl border border-cyber-border mb-8 max-w-sm mx-auto">
        <button
          onClick={() => {
            setActiveTab("media");
            setError(null);
          }}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg tracking-wider uppercase transition ${
            activeTab === "media"
              ? "bg-indigo-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Audio Analysis
        </button>

        <button
          onClick={() => {
            setActiveTab("text");
            setError(null);
          }}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg tracking-wider uppercase transition ${
            activeTab === "text"
              ? "bg-indigo-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Text Analysis
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose-950/40 border border-rose-800/40 rounded-xl flex items-start space-x-3 text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {activeTab === "media" ? (
        <form onSubmit={handleProcessMedia} className="space-y-6">
          <div className="border-2 border-dashed border-slate-700 hover:border-indigo-500/50 rounded-3xl p-10 flex flex-col items-center justify-center transition bg-slate-900/20 relative group">
            <input
              type="file"
              accept=".mp3,.wav"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />

            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center border border-gray-800 text-gray-400 group-hover:text-indigo-400 transition mb-4">
              {file ? (
                <FileAudio className="w-8 h-8 text-indigo-400" />
              ) : (
                <Upload className="w-8 h-8" />
              )}
            </div>

            {file ? (
              <div className="text-center z-20">
                <p className="text-sm font-semibold text-white max-w-xs truncate">
                  {file.name}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB mount payload ready
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm font-semibold text-white">
                  Upload an audio file to analyze
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Accepts WAV and MP3 files up to 25MB
                </p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !file}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 disabled:from-gray-800 disabled:to-gray-800 disabled:text-gray-600 text-white font-semibold rounded-xl transition flex items-center justify-center space-x-2 border border-indigo-500/20 shadow-lg"
          >
            {loading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Cpu className="w-5 h-5" />
            )}

            <span>
              {loading
                ? "Analyzing.."
                : "Analyze Audio"}
            </span>
          </button>
        </form>
      ) : (
        <form onSubmit={handleProcessText} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase text-gray-400 mb-3">
              Paste Text for Analysis
            </label>

            <textarea
              rows={6}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Paste text here..."
              className="w-full p-5 rounded-2xl glass-input text-white text-sm leading-relaxed resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !textInput.trim()}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 disabled:from-gray-800 disabled:to-gray-800 disabled:text-gray-600 text-white font-semibold rounded-xl transition flex items-center justify-center space-x-2 border border-indigo-500/20 shadow-lg"
          >
            {loading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Cpu className="w-5 h-5" />
            )}

            <span>
              {loading
                ? "Analyzing..."
                : "Analyze Text"}
            </span>
          </button>
        </form>
      )}
    </div>
  );
}