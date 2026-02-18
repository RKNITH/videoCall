import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdVideoCall, MdLogout, MdAccountCircle } from 'react-icons/md';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    return (
        <nav className="w-full bg-slate-800/80 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition-colors">
                        <MdVideoCall className="text-white text-2xl" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">V-Connect</span>
                </Link>

                {/* Auth Buttons */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex flex-col items-end">
                                <span className="text-sm font-medium text-white">{user.username}</span>
                                <span className="text-xs text-emerald-400 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Online
                                </span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 bg-slate-700 hover:bg-rose-600/20 hover:text-rose-400 text-slate-300 px-4 py-2 rounded-full border border-slate-600 transition-all text-sm"
                            >
                                <MdLogout /> <span className="hidden md:block">Logout</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to="/login" className="text-slate-300 hover:text-white px-4 py-2 text-sm transition-colors font-medium">
                                Log In
                            </Link>
                            <Link to="/register" className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;