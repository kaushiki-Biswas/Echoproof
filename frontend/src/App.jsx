import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import UploadCenter from './components/UploadCenter';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'auth' | 'dashboard' | 'upload'
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([
    { id: '1', name: 'audio_intercept_01.wav', score: 91, risk: 'Authentic', type: 'Audio' },
    { id: '2', name: 'ceo_voice_cloned.mp3', score: 12, risk: 'High Risk Deepfake', type: 'Voice' },
    { id: '3', name: 'press_release_draft.txt', score: 48, risk: 'Suspicious', type: 'Text' },
  ]);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setView('landing');
  };

  const handleAnalysisComplete = (newScan) => {
    setHistory((prev) => [newScan, ...prev]);
    setView('dashboard');
  };

  const triggerMockPdfDownload = (scan) => {
    // Phase 9 placeholder simulation mechanism explicitly declared without system disruptions
    alert(`[EchoProof Security Matrix Service]\n\nGenerating cryptographic validation receipt for target payload identity profile:\nFile: ${scan.name}\nAuthenticity Integrity Index Factor: ${scan.score}%\nRisk Profile Assessment Classification: [${scan.risk}]\n\nPDF Report initialization trace triggered successfully.`);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-500/30 selection:text-white">
      <Navbar currentView={view} setView={setView} user={user} onLogout={handleLogout} />
      
      <main className="flex-grow">
        {view === 'landing' && (
          <>
            <Hero setView={setView} />
            <Features />
          </>
        )}
        
        {view === 'auth' && (
          <Auth onAuthSuccess={handleAuthSuccess} />
        )}
        
        {view === 'dashboard' && (
          <Dashboard history={history} triggerMockPdf={triggerMockPdfDownload} />
        )}
        
        {view === 'upload' && (
          <UploadCenter onAnalysisComplete={handleAnalysisComplete} />
        )}
      </main>

      <footer className="glass-panel mt-auto py-6 px-6 text-center text-xs text-gray-500 border-t border-cyber-border">
        &copy; 2026 EchoProof Framework Lab Matrix Inc. Unified Deep Neural Artifact Authentication Systems. All protection layers active.
      </footer>
    </div>
  );
}