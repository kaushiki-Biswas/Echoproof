import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import UploadCenter from './components/UploadCenter';
import { detectionService } from './services/api';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'auth' | 'dashboard' | 'upload'
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);

  const loadHistory = async () => {
  try {
    const data = await detectionService.getHistory();

    setHistory(data);
  } catch (err) {
    console.error(err);
  }
};
  const handleAuthSuccess = async (userData) => {
    setUser(userData);

    await loadHistory();

    setView("dashboard");
};

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setView('landing');
  };

  const handleAnalysisComplete = (result) => {

  const providerMap = {
    human: "Human",

    gpt: "GPT",
    ada: "GPT",
    babbage: "GPT",
    curie: "GPT",
    davinci: "GPT",

    claude: "Claude",

    llama: "Llama",

    mistral: "Mistral",

    palm: "Palm",

    falcon: "Falcon",

    cohere: "Cohere"
  };
  console.log(result);
  console.log(result.detected_model);
  const formattedResult = {

    ...result,

    score: result.confidence,

    provider:
      result.provider ||
      providerMap[result.detected_model?.toLowerCase()] ||
      "Unknown",

    detected_model:
      result.detected_model
        ? (result.detected_model.toLowerCase() === "human"
        ? "Human"
        : "AI Generated")
    : result.status,

  };

  setHistory((prev) => [formattedResult, ...prev]);

  setView("dashboard");

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
          <Dashboard history={history} />
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