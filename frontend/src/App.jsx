import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Auth from './pages/Auth'; // Make sure Auth handles both modes
import VideoPlayer from './components/VideoPlayer';
import Options from './components/Options';
import Notifications from './components/Notifications';

const App = () => {
  const token = localStorage.getItem('token');

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <Routes>
          {/* Landing/Home Route */}
          <Route path="/" element={
            token ? (
              <div className="w-full max-w-6xl space-y-8 animate-in fade-in duration-500">
                <VideoPlayer />
                <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 shadow-2xl max-w-2xl mx-auto w-full">
                  <Options><Notifications /></Options>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6 max-w-2xl">
                <h1 className="text-5xl md:text-7xl font-extrabold text-white">
                  Real-time video <span className="text-indigo-500">Simplified.</span>
                </h1>
                <p className="text-slate-400 text-lg">
                  Secure, encrypted peer-to-peer video calls. Log in to start connecting with your friends.
                </p>
                <div className="pt-4">
                  {/* This button shows only if not logged in */}
                  <a href="/register" className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-xl hover:bg-indigo-500 transition-all">Start Calling Now</a>
                </div>
              </div>
            )
          } />

          {/* Auth Routes */}
          <Route path="/login" element={<Auth mode="login" />} />
          <Route path="/register" element={<Auth mode="register" />} />
        </Routes>
      </main>

      <footer className="py-6 text-center text-slate-600 text-xs uppercase tracking-widest border-t border-slate-800">
        &copy; 2026 V-Connect Protocol • Built with MERN
      </footer>
    </div>
  );
};

export default App;