import React, { useState } from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';

const SearchBar = ({ onSearch, onReset }) => {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch({ make, model, category, minPrice, maxPrice });
    };

    const handleResetFilters = () => {
        setMake('');
        setModel('');
        setCategory('');
        setMinPrice('');
        setMaxPrice('');
        onReset();
    };

    return (
        <form onSubmit={handleSearchSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 shadow-xl">
            <div className="flex items-center space-x-2 mb-4 text-sky-400 font-semibold text-sm">
                <Filter className="w-4 h-4" />
                <span>Filter & Search Vehicles</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* Make Filter */}
                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Make (Brand)</label>
                    <input
                        type="text"
                        value={make}
                        onChange={(e) => setMake(e.target.value)}
                        placeholder="e.g. Tesla, Toyota"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                </div>

                {/* Model Filter */}
                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Model Name</label>
                    <input
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        placeholder="e.g. Model 3, Camry"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                </div>

                {/* Category Dropdown */}
                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                    >
                        <option value="">All Categories</option>
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Truck">Truck</option>
                        <option value="Electric">Electric</option>
                        <option value="Sports">Sports</option>
                    </select>
                </div>

                {/* Min Price */}
                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Min Price ($)</label>
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="0"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                </div>

                {/* Max Price */}
                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Max Price ($)</label>
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="100000"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-slate-800/80">
                <button
                    type="button"
                    onClick={handleResetFilters}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium flex items-center space-x-1.5 transition-all"
                >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset</span>
                </button>

                <button
                    type="submit"
                    className="px-6 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold rounded-xl text-sm flex items-center space-x-1.5 transition-all shadow-lg shadow-sky-500/20"
                >
                    <Search className="w-4 h-4" />
                    <span>Apply Filters</span>
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
