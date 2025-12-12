'use client';

import { useState } from 'react';
import { 
  FileText, ChefHat, Shirt, Archive, Filter, 
  CheckCircle, XCircle, Clock, MoreHorizontal, Search, 
  ArrowUpRight 
} from 'lucide-react';

// Mock Data: Various Request Types
const REQUESTS = [
  { id: 'REQ-1001', requestor: 'Juan Dela Cruz', type: 'Kitchen Ingredients', dept: 'Culinary Arts', date: 'Oct 26, 2024', status: 'Pending', details: '5kg Flour, 2kg Butter' },
  { id: 'REQ-1002', requestor: 'Maria Clara', type: 'Uniform Replacement', dept: 'Hospitality', date: 'Oct 25, 2024', status: 'Approved', details: '1x Chef Jacket (Size M)' },
  { id: 'REQ-1003', requestor: 'Jose Rizal', type: 'Certificate of Grades', dept: 'Registrar', date: 'Oct 24, 2024', status: 'Completed', details: 'For Scholarship Application' },
  { id: 'REQ-1004', requestor: 'Andres Bonifacio', type: 'Equipment Borrowing', dept: 'Culinary Arts', date: 'Oct 27, 2024', status: 'Rejected', details: 'Pastry Kit Set B' },
  { id: 'REQ-1005', requestor: 'Gabriela Silang', type: 'Good Moral Cert', dept: 'Guidance', date: 'Oct 27, 2024', status: 'Pending', details: 'Transfer Credentials' },
];

export default function RequestsPage() {
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter Logic
  const filteredRequests = REQUESTS.filter(req => {
    const matchesSearch = 
      req.requestor.toLowerCase().includes(searchTerm.toLowerCase()) || 
      req.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || req.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Stats
  const pendingCount = REQUESTS.filter(r => r.status === 'Pending').length;
  const kitchenCount = REQUESTS.filter(r => r.dept === 'Culinary Arts').length;

  return (
    <div className="space-y-8 p-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Requisition Management</h1>
          <p className="text-slate-500 text-sm">Track and approve student and faculty requests.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 text-sm font-medium hover:bg-slate-50 shadow-sm">
            Export Log
          </button>
          <button className="px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800 shadow-sm">
            Create Request
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          title="Pending Approvals" 
          value={pendingCount} 
          icon={Clock} 
          color="bg-orange-50 text-orange-600 border-orange-100" 
        />
        <StatCard 
          title="Kitchen Requisitions" 
          value={kitchenCount} 
          icon={ChefHat} 
          color="bg-blue-50 text-blue-600 border-blue-100" 
        />
        <StatCard 
          title="Document Requests" 
          value={REQUESTS.filter(r => r.dept === 'Registrar' || r.dept === 'Guidance').length} 
          icon={FileText} 
          color="bg-slate-50 text-slate-600 border-slate-200" 
        />
      </div>

      {/* Main Request Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
          
          {/* Status Tabs */}
          <div className="flex p-1 bg-slate-200/50 rounded-lg">
            {['All', 'Pending', 'Approved', 'Completed', 'Rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  filterStatus === status 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search ID or Name..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Request Details</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Date Filed</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50 transition-colors group">
                  
                  {/* Request Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg mt-1 shrink-0 ${getIconColor(req.type)}`}>
                        {getRequestIcon(req.type)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{req.type}</p>
                        <p className="text-xs text-slate-500 font-mono mb-1">{req.id}</p>
                        <p className="text-xs text-slate-600">
                          By: <span className="font-medium">{req.requestor}</span>
                        </p>
                        <p className="text-xs text-slate-400 mt-1 italic line-clamp-1">"{req.details}"</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    <span className="inline-flex items-center px-2 py-1 rounded border border-slate-200 bg-slate-50 text-xs font-medium">
                      {req.dept}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                    {req.date}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={req.status} />
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

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className={`p-5 rounded-xl border flex items-center justify-between shadow-sm bg-white hover:shadow-md transition-shadow`}>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={20} />
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    'Approved': 'bg-green-50 text-green-700 border-green-200',
    'Completed': 'bg-blue-50 text-blue-700 border-blue-200',
    'Pending': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'Rejected': 'bg-red-50 text-red-700 border-red-200',
  };

  const icons = {
    'Approved': CheckCircle,
    'Completed': CheckCircle,
    'Pending': Clock,
    'Rejected': XCircle,
  };

  const StatusIcon = icons[status] || Clock;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${styles[status]}`}>
      <StatusIcon size={12} />
      {status}
    </span>
  );
}

function getRequestIcon(type) {
  if (type.includes('Kitchen') || type.includes('Ingredients')) return <ChefHat size={18} />;
  if (type.includes('Uniform')) return <Shirt size={18} />;
  if (type.includes('Equipment')) return <Archive size={18} />;
  return <FileText size={18} />;
}

function getIconColor(type) {
  if (type.includes('Kitchen')) return 'bg-orange-100 text-orange-600';
  if (type.includes('Uniform')) return 'bg-purple-100 text-purple-600';
  if (type.includes('Equipment')) return 'bg-slate-100 text-slate-600';
  return 'bg-blue-100 text-blue-600';
}