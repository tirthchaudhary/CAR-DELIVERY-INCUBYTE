import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Car, LogOut, Shield, User } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
            {/* Brand Logo */}
            <div className="flex items-center space-x-3">
                <div className="p-2 bg-sky-500/10 rounded-xl border border-sky-500/20 text-sky-400">
                    <Car className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="font-bold text-lg text-white tracking-wide">DriveHub</h1>
                    <p className="text-xs text-slate-400">Dealership Inventory</p>
                </div>
            </div>

            {/* User Info & Actions */}
            {user && (
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                        {user.role === 'admin' ? (
                            <Shield className="w-4 h-4 text-amber-400" />
                        ) : (
                            <User className="w-4 h-4 text-sky-400" />
                        )}
                        <span className="text-sm font-medium text-slate-200">{user.name || user.email}</span>
                        <span
                            className={`text-xs px-2 py-0.5 rounded-full uppercase font-bold tracking-wider ${user.role === 'admin'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                                }`}
                        >
                            {user.role}
                        </span>
                    </div>

                    <button
                        onClick={logout}
                        className="flex items-center space-x-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 px-3 py-1.5 rounded-lg border border-rose-500/20 transition-all text-sm font-medium"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
