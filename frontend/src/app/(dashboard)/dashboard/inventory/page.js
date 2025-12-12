'use client';

import { useState } from 'react';
import { 
  Search, Plus, Filter, AlertTriangle, 
  Package, ChefHat, Scale, Calendar, MoreVertical 
} from 'lucide-react';

// Mock Data: Kitchen Inventory
const INVENTORY_ITEMS = [
  { id: 'ING-001', name: 'All-Purpose Flour', category: 'Dry Goods', qty: 25, unit: 'kg', minLevel: 10, expiry: '2025-12-01', status: 'In Stock' },
  { id: 'ING-002', name: 'Unsalted Butter', category: 'Perishables', qty: 2, unit: 'kg', minLevel: 5, expiry: '2024-06-15', status: 'Low Stock' },
  { id: 'EQP-105', name: 'Chef Knife (8")', category: 'Equipment', qty: 15, unit: 'pcs', minLevel: 20, expiry: '-', status: 'Low Stock' },
  { id: 'ING-005', name: 'Whole Milk', category: 'Perishables', qty: 0, unit: 'L', minLevel: 10, expiry: '2024-05-20', status: 'Out of Stock' },
  { id: 'EQP-202', name: 'Stainless Mixing Bowl', category: 'Equipment', qty: 30, unit: 'pcs', minLevel: 15, expiry: '-', status: 'In Stock' },
  { id: 'ING-010', name: 'White Sugar', category: 'Dry Goods', qty: 50, unit: 'kg', minLevel: 10, expiry: '2026-01-01', status: 'In Stock' },
];

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Filter Logic
  const filteredItems = INVENTORY_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Quick Stats
  const lowStockCount = INVENTORY_ITEMS.filter(i => i.qty <= i.minLevel).length;
  const outOfStockCount = INVENTORY_ITEMS.filter(i => i.qty === 0).length;

  return (
    <div className="space-y-6 p-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ChefHat className="text-orange-600" />
            Kitchen Inventory
          </h1>
          <p className="text-slate-500 text-sm">Track ingredients, equipment, and stock levels for laboratory classes.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white text-slate-700 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 font-medium shadow-sm transition-colors">
            <Filter size={18} />
            <span>Generate Report</span>
          </button>
          <button className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors shadow-sm font-medium">
            <Plus size={18} />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          title="Total Items" 
          value={INVENTORY_ITEMS.length} 
          icon={Package} 
          color="bg-blue-50 text-blue-700 border-blue-100" 
        />
        <StatCard 
          title="Low Stock Alert" 
          value={lowStockCount} 
          icon={AlertTriangle} 
          color="bg-orange-50 text-orange-700 border-orange-100" 
          alert={lowStockCount > 0}
        />
        <StatCard 
          title="Out of Stock" 
          value={outOfStockCount} 
          icon={Scale} 
          color="bg-red-50 text-red-700 border-red-100" 
          alert={outOfStockCount > 0}
        />
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search ingredient or equipment..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-slate-700 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Dry Goods', 'Perishables', 'Equipment'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-all ${
                filterCategory === cat 
                  ? 'bg-slate-800 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="px-6 py-4">Item Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-center">Stock Level</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Expiry</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{item.name}</div>
                      <div className="text-xs text-slate-500 font-mono">{item.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{item.category}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold text-slate-800">{item.qty}</span>
                      <span className="text-xs text-slate-500 ml-1">{item.unit}</span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-6 py-4">
                      {item.category === 'Perishables' || item.category === 'Dry Goods' ? (
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar size={14} className="text-slate-400" />
                          {item.expiry}
                        </div>
                      ) : (
                        <span className="text-slate-400 text-sm">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                    No items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---

function StatCard({ title, value, icon: Icon, color, alert }) {
  return (
    <div className={`p-5 rounded-xl border flex items-center justify-between shadow-sm ${color} ${alert ? 'animate-pulse' : ''}`}>
      <div>
        <p className="text-sm font-medium opacity-80">{title}</p>
        <h3 className="text-3xl font-bold mt-1">{value}</h3>
      </div>
      <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
        <Icon size={24} />
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    'In Stock': 'bg-green-100 text-green-700 border-green-200',
    'Low Stock': 'bg-orange-100 text-orange-700 border-orange-200',
    'Out of Stock': 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${styles[status] || 'bg-gray-100'}`}>
      {status}
    </span>
  );
}