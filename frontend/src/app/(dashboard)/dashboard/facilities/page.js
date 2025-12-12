'use client';

import { useState } from 'react';
import { 
  Calendar, Clock, MapPin, Plus, Filter, 
  CheckCircle2, XCircle, MoreHorizontal, Search, 
  Monitor, Utensils, BedDouble, Users 
} from 'lucide-react';

// Mock Data: Facilities Status
const FACILITIES = [
  { id: 'HK-01', name: 'Hot Kitchen A', type: 'Laboratory', capacity: 25, status: 'Available', icon: Utensils },
  { id: 'HK-02', name: 'Hot Kitchen B', type: 'Laboratory', capacity: 25, status: 'Maintenance', icon: Utensils },
  { id: 'CL-101', name: 'Computer Lab 1', type: 'Academic', capacity: 40, status: 'Available', icon: Monitor },
  { id: 'MH-304', name: 'Mock Hotel Suite', type: 'Training', capacity: 10, status: 'Available', icon: BedDouble },
  { id: 'FH-MAIN', name: 'Grand Function Hall', type: 'Event', capacity: 200, status: 'Occupied', icon: Users },
];

// Mock Data: Booking Requests
const BOOKINGS = [
  { id: 'BK-101', facility: 'Hot Kitchen A', requestedBy: 'Chef Marco (Faculty)', date: 'Oct 25, 2024', time: '08:00 AM - 12:00 PM', purpose: 'Culinary 101 Exam', status: 'Approved' },
  { id: 'BK-102', facility: 'Computer Lab 1', requestedBy: 'BS IT - 3A', date: 'Oct 25, 2024', time: '01:00 PM - 04:00 PM', purpose: 'Capstone Coding', status: 'Pending' },
  { id: 'BK-103', facility: 'Grand Function Hall', requestedBy: 'Student Council', date: 'Oct 26, 2024', time: '08:00 AM - 05:00 PM', purpose: 'Acquaintance Party', status: 'Approved' },
  { id: 'BK-104', facility: 'Mock Hotel Suite', requestedBy: 'HM - 2B', date: 'Oct 27, 2024', time: '09:00 AM - 11:00 AM', purpose: 'Housekeeping Assessment', status: 'Rejected' },
];

export default function FacilitiesPage() {
  const [filterType, setFilterType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter Logic
  const filteredFacilities = FACILITIES.filter(f => filterType === 'All' || f.type === filterType);

  return (
    <div className="space-y-8 p-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Facility Management</h1>
          <p className="text-slate-500 text-sm">Manage room schedules, maintenance status, and booking requests.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2.5 rounded-lg hover:bg-blue-800 transition-colors shadow-sm font-medium">
          <Plus size={18} />
          <span>New Booking</span>
        </button>
      </div>

      {/* Facility Status Overview (Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {filteredFacilities.map((facility) => (
          <FacilityCard key={facility.id} data={facility} />
        ))}
      </div>

      {/* Booking Schedule Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Table Header / Toolbar */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <Calendar size={18} className="text-slate-500" />
            Booking Schedule
          </h3>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search bookings..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-2 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 text-slate-600">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Facility</th>
                <th className="px-6 py-4">Requested By</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Purpose</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {BOOKINGS.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {booking.facility}
                    <div className="text-xs text-slate-400 font-normal mt-0.5">{booking.id}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{booking.requestedBy}</td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-slate-400" /> {booking.date}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      <Clock size={14} className="text-slate-400" /> {booking.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{booking.purpose}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---

function FacilityCard({ data }) {
  const Icon = data.icon;
  
  const statusStyles = {
    'Available': 'bg-green-100 text-green-700',
    'Occupied': 'bg-blue-100 text-blue-700',
    'Maintenance': 'bg-orange-100 text-orange-700',
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-lg ${data.type === 'Laboratory' ? 'bg-orange-50 text-orange-600' : 'bg-slate-100 text-slate-600'}`}>
          <Icon size={20} />
        </div>
        <span className={`px-2 py-1 rounded text-xs font-bold ${statusStyles[data.status]}`}>
          {data.status}
        </span>
      </div>
      <h3 className="font-bold text-slate-900 mb-1">{data.name}</h3>
      <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
        <span className="flex items-center gap-1">
          <MapPin size={12} /> {data.type}
        </span>
        <span className="flex items-center gap-1">
          <Users size={12} /> Max {data.capacity}
        </span>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    'Approved': 'bg-green-50 text-green-700 border-green-200',
    'Pending': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'Rejected': 'bg-red-50 text-red-700 border-red-200',
  };

  const icons = {
    'Approved': CheckCircle2,
    'Pending': Clock,
    'Rejected': XCircle,
  };

  const StatusIcon = icons[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
      {StatusIcon && <StatusIcon size={12} />}
      {status}
    </span>
  );
}