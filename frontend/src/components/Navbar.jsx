import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdVideoCall, MdLogout, MdAccountCircle } from 'react-icons/md';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
        window.location.reload();
    };

    return (
        <nav className="w-full bg-slate-800/90 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo: Icon always shows, Text only shows on Desktop (md+) */}
                    <Link to="/" className="flex items-center gap-2 group shrink-0">
                        <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">
                            <MdVideoCall className="text-white text-2xl" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight hidden md:block">
                            V-Connect
                        </span>
                    </Link>

                    {/* Auth Section */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        {user ? (
                            <div className="flex items-center gap-3 sm:gap-4">
                                {/* User Info - Text hidden on mobile, Icon shown on mobile */}
                                <div className="flex items-center gap-2">
                                    <div className="hidden sm:flex flex-col items-end leading-tight">
                                        <span className="text-sm font-medium text-white max-w-[100px] truncate">
                                            {user.username}
                                        </span>
                                        <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                            Online
                                        </span>
                                    </div>
                                    <MdAccountCircle className="text-slate-400 text-2xl sm:hidden" />
                                </div>

                                {/* Logout Button - Icon only on mobile, Text + Icon on Desktop */}
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 bg-slate-700 hover:bg-rose-600/20 hover:text-rose-400 text-slate-300 p-2 sm:px-4 sm:py-2 rounded-full border border-slate-600 transition-all text-sm group"
                                    title="Logout"
                                >
                                    <MdLogout className="text-lg group-hover:rotate-12 transition-transform" />
                                    <span className="hidden md:block">Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/login"
                                    className="text-slate-300 hover:text-white px-3 py-2 text-sm transition-colors font-medium"
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;