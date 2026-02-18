import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

        try {
            // Correctly using the VITE_BACKEND_URL from your .env
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`, formData);

            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.data));
                window.location.href = '/call'; // Force refresh to initialize socket with new user
            }
        } catch (err) {
            setError(err.response?.data?.message || "Authentication failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
            <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700 animate-in fade-in zoom-in duration-300">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>

                {error && (
                    <p className="bg-rose-500/10 text-rose-400 p-3 rounded-lg mb-4 text-sm border border-rose-500/20">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white focus:border-indigo-500 outline-none transition-all"
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white focus:border-indigo-500 outline-none transition-all"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white focus:border-indigo-500 outline-none transition-all"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
                        {isLogin ? 'Sign In' : 'Register'}
                    </button>
                </form>

                <p className="text-slate-400 mt-6 text-center text-sm">
                    {isLogin ? "New to V-Connect?" : "Already have an account?"}
                    <button
                        className="text-indigo-400 ml-2 font-semibold hover:underline"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? 'Create Account' : 'Log In'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Auth;