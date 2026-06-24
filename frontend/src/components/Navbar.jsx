import React from 'react';
import {
  ShieldAlert,
  LayoutDashboard,
  UploadCloud,
  LogOut,
  LogIn
} from 'lucide-react';

export default function Navbar({
  currentView,
  setView,
  user,
  onLogout
}) {
  return (
    <nav className="glass-panel sticky top-0 z-50 w-full px-6 py-4 flex items-center justify-between border-b border-cyber-border">

      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => setView('landing')}
      >
        <ShieldAlert className="w-8 h-8 text-indigo-500 animate-pulse" />

        <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-white via-indigo-200 to-rose-400 bg-clip-text text-transparent">
          ECHOPROOF
        </span>
      </div>

      <div className="flex items-center space-x-6">
        {user ? (
          <>
            <button
              onClick={() => setView('dashboard')}
              className={`flex items-center space-x-2 text-sm font-medium transition ${
                currentView === 'dashboard'
                  ? 'text-indigo-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setView('upload')}
              className={`flex items-center space-x-2 text-sm font-medium transition ${
                currentView === 'upload'
                  ? 'text-indigo-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload Center</span>
            </button>

            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-sm font-medium text-rose-400 hover:text-rose-300 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => setView('auth')}
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 px-4 py-2 rounded-lg text-sm font-medium transition shadow-lg shadow-indigo-900/30 border border-indigo-400/20"
          >
            <LogIn className="w-4 h-4" />
            <span>Portal Access</span>
          </button>
        )}
      </div>
    </nav>
  );
}