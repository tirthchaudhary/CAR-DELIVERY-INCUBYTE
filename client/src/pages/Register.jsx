import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Car, Lock, Mail, User, Shield, AlertCircle } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await register(name, email, password, role);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="inline-flex p-3 bg-sky-500/10 border border-sky-500/20 rounded-2xl text-sky-400 mb-3">
                        <Car className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Create Account</h2>
                    <p className="text-slate-400 text-sm mt-1">Join Car Dealership Inventory System</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm flex items-center space-x-2">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                            Full Name
                        </label>
                        <div className="relative">
                            <User className="w-5 h-5 absolute left-3 top-3 text-slate-500" />
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-sky-500 transition-colors"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="w-5 h-5 absolute left-3 top-3 text-slate-500" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="john@example.com"
                                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-sky-500 transition-colors"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="w-5 h-5 absolute left-3 top-3 text-slate-500" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-sky-500 transition-colors"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                            Account Type (Role)
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setRole('user')}
                                className={`py-2.5 px-4 rounded-xl border flex items-center justify-center space-x-2 text-sm font-medium transition-all ${role === 'user'
                                    ? 'bg-sky-500/20 border-sky-500 text-sky-300'
                                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600'
                                    }`}
                            >
                                <User className="w-4 h-4" />
                                <span>Customer</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setRole('admin')}
                                className={`py-2.5 px-4 rounded-xl border flex items-center justify-center space-x-2 text-sm font-medium transition-all ${role === 'admin'
                                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600'
                                    }`}
                            >
                                <Shield className="w-4 h-4" />
                                <span>Admin</span>
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold py-3 rounded-xl transition-all shadow-lg shadow-sky-500/20 disabled:opacity-50"
                    >
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>

                <p className="text-center text-sm text-slate-400 mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-sky-400 font-medium hover:underline">
                        Log in here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
