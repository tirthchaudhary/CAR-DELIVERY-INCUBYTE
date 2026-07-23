import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import VehicleCard from '../components/VehicleCard';
import SearchBar from '../components/SearchBar';
import AdminModal from '../components/AdminModal';
import { PlusCircle, Car, AlertCircle, CheckCircle2 } from 'lucide-react';

const Dashboard = () => {
    const { isAdmin } = useAuth();
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch all vehicles on mount
    const fetchVehicles = async () => {
        setLoading(true);
        try {
            const res = await api.get('/vehicles');
            setVehicles(res.data.vehicles);
        } catch (err) {
            setError('Failed to load vehicles');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    // Search & Filter vehicles
    const handleSearch = async (filters) => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams();
            if (filters.make) queryParams.append('make', filters.make);
            if (filters.model) queryParams.append('model', filters.model);
            if (filters.category) queryParams.append('category', filters.category);
            if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
            if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);

            const res = await api.get(`/vehicles/search?${queryParams.toString()}`);
            setVehicles(res.data.vehicles);
        } catch (err) {
            setError('Search failed.');
        } finally {
            setLoading(false);
        }
    };

    // Purchase vehicle (decreases quantity by 1)
    const handlePurchase = async (vehicleId) => {
        try {
            const res = await api.post(`/vehicles/${vehicleId}/purchase`);
            setMessage(res.data.message || 'Vehicle purchased successfully!');
            setTimeout(() => setMessage(''), 4000);
            fetchVehicles(); // Refresh catalog
        } catch (err) {
            alert(err.response?.data?.error || 'Purchase failed.');
        }
    };

    // Admin Restock (Allows Admin to enter any quantity, e.g. 5 or 10)
    const handleRestock = async (vehicleId) => {
        const inputAmount = prompt('Enter restock quantity:', '1');
        if (!inputAmount || isNaN(inputAmount) || Number(inputAmount) <= 0) return;

        const amount = Number(inputAmount);

        try {
            const res = await api.post(`/vehicles/${vehicleId}/restock`, { amount });
            setMessage(res.data.message || `Vehicle restocked by +${amount}!`);
            setTimeout(() => setMessage(''), 4000);
            fetchVehicles(); // Refresh catalog with new stock count
        } catch (err) {
            alert(err.response?.data?.error || 'Restock failed.');
        }
    };


    // Admin Delete Vehicle
    const handleDelete = async (vehicleId) => {
        if (!window.confirm('Are you sure you want to delete this vehicle?')) return;

        try {
            await api.delete(`/vehicles/${vehicleId}`);
            setMessage('Vehicle deleted successfully.');
            setTimeout(() => setMessage(''), 4000);
            fetchVehicles();
        } catch (err) {
            alert(err.response?.data?.error || 'Delete failed.');
        }
    };

    // Admin Add New Vehicle
    const handleAddVehicle = async (newVehicle) => {
        const res = await api.post('/vehicles', newVehicle);
        setMessage('New vehicle added to catalog!');
        setTimeout(() => setMessage(''), 4000);
        fetchVehicles();
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
            <Navbar />

            <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
                {/* Notification Toast */}
                {message && (
                    <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center space-x-2 animate-bounce">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                        <span className="font-semibold text-sm">{message}</span>
                    </div>
                )}

                {/* Top Action Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tight">Available Vehicles</h2>
                        <p className="text-slate-400 text-sm mt-1">Browse and purchase vehicles from our live inventory catalog</p>
                    </div>

                    {/* Admin Add Vehicle Trigger */}
                    {isAdmin && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-3 rounded-xl flex items-center space-x-2 transition-all shadow-lg shadow-amber-500/20"
                        >
                            <PlusCircle className="w-5 h-5" />
                            <span>Add New Vehicle</span>
                        </button>
                    )}
                </div>

                {/* Filter Search Bar */}
                <SearchBar onSearch={handleSearch} onReset={fetchVehicles} />

                {/* Loading State */}
                {loading ? (
                    <div className="text-center py-20">
                        <Car className="w-12 h-12 text-sky-400 animate-spin mx-auto mb-4" />
                        <p className="text-slate-400 font-medium">Loading live inventory...</p>
                    </div>
                ) : vehicles.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-20 bg-slate-900/50 border border-slate-800 rounded-2xl">
                        <Car className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-white">No Vehicles Found</h3>
                        <p className="text-slate-400 text-sm mt-1">Try adjusting your search filters or add new vehicles.</p>
                    </div>
                ) : (
                    /* Vehicle Grid Deck */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vehicles.map((vehicle) => (
                            <VehicleCard
                                key={vehicle._id}
                                vehicle={vehicle}
                                onPurchase={handlePurchase}
                                onRestock={handleRestock}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* Admin Add Vehicle Modal */}
            <AdminModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddVehicle={handleAddVehicle}
            />
        </div>
    );
};

export default Dashboard;
