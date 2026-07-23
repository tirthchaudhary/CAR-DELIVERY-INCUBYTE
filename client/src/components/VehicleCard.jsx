import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Car, ShoppingBag, PlusCircle, Trash2, Tag, DollarSign, Layers } from 'lucide-react';

const VehicleCard = ({ vehicle, onPurchase, onRestock, onDelete, onEdit }) => {
    const { isAdmin } = useAuth();
    const isOutOfStock = vehicle.quantity <= 0;

    return (
        <div className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-xl relative overflow-hidden group">
            {/* Category Tag & Stock Status */}
            <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{vehicle.category}</span>
                </span>

                <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${isOutOfStock
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}
                >
                    {isOutOfStock ? 'Out of Stock' : `${vehicle.quantity} In Stock`}
                </span>
            </div>

            {/* Vehicle Info */}
            <div className="mb-6">
                <div className="flex items-center space-x-2 text-slate-400 text-sm mb-1">
                    <Car className="w-4 h-4 text-sky-400" />
                    <span className="font-semibold uppercase tracking-wider text-xs">{vehicle.make}</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors">
                    {vehicle.model}
                </h3>
                <div className="mt-4 flex items-baseline space-x-1">
                    <span className="text-2xl font-black text-white">${vehicle.price?.toLocaleString()}</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-slate-800/80">
                {/* Customer Purchase Button */}
                <button
                    onClick={() => onPurchase(vehicle._id)}
                    disabled={isOutOfStock}
                    className={`w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all ${isOutOfStock
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                            : 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-lg shadow-sky-500/20'
                        }`}
                >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{isOutOfStock ? 'Out of Stock' : 'Purchase Vehicle'}</span>
                </button>

                {/* Admin Controls (Visible ONLY to Admin users) */}
                {isAdmin && (
                    <div className="grid grid-cols-2 gap-2 pt-2">
                        <button
                            onClick={() => onRestock(vehicle._id)}
                            className="py-2 px-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/20 text-xs font-semibold flex items-center justify-center space-x-1 transition-all"
                        >
                            <PlusCircle className="w-3.5 h-3.5" />
                            <span>Restock (+1)</span>
                        </button>

                        <button
                            onClick={() => onDelete(vehicle._id)}
                            className="py-2 px-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/20 text-xs font-semibold flex items-center justify-center space-x-1 transition-all"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VehicleCard;
