'use client';

import { useState } from 'react';
import { 
  Search, Plus, Filter, MoreHorizontal, 
  Eye, Edit, Trash2, GraduationCap, BadgeCheck 
} from 'lucide-react';
import Link from 'next/link';

// Mock Data based on your specific tracks
const MOCK_STUDENTS = [
  { id: '2024-001', name: 'Juan Dela Cruz', type: 'College', program: 'BS Criminology', year: '3rd Year', status: 'Enrolled' },
  { id: '2024-002', name: 'Maria Clara', type: 'SHS', program: 'TVL - HE (Culinary)', year: 'Grade 11', status: 'Enrolled' },
  { id: '2024-003', name: 'Jose Rizal', type: 'College', program: 'BS Information System', year: '4th Year', status: 'On-OJT' },
  { id: '2024-004', name: 'Andres Bonifacio', type: 'SHS', program: 'Academic - STEM', year: 'Grade 12', status: 'Irregular' },
  { id: '2024-005', name: 'Gabriela Silang', type: 'College', program: 'BS Tourism Management', year: '1st Year', status: 'Enrolled' },
];

export default function StudentListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All'); // All, SHS, College

  // Filter Logic
  const filteredStudents = MOCK_STUDENTS.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      student.id.includes(searchTerm);
    const matchesType = filterType === 'All' || student.type === filterType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 p-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Student Records</h1>
          <p className="text-slate-500 text-sm">Manage enrollment, profiles, and academic status.</p>
        </div>
        <button className="flex items-center gap-2 bg-red-900 text-white px-4 py-2.5 rounded-lg hover:bg-red-800 transition-colors shadow-sm font-medium">
          <Plus size={18} />
          <span>Add New Student</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between">
        
        {/* Search Bar */}
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by Name or Student ID..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-slate-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex p-1 bg-slate-100 rounded-lg">
          {['All', 'SHS', 'College'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                filterType === type 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">ID Number</th>
                <th className="px-6 py-4">Program / Strand</th>
                <th className="px-6 py-4">Year Level</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                    
                    {/* Name & Avatar */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{student.name}</p>
                          <p className="text-xs text-slate-500">{student.type}</p>
                        </div>
                      </div>
                    </td>

                    {/* ID */}
                    <td className="px-6 py-4 text-sm font-mono text-slate-600">
                      {student.id}
                    </td>

                    {/* Program */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <GraduationCap size={16} className="text-slate-400" />
                        <span className="text-sm text-slate-700 font-medium">{student.program}</span>
                      </div>
                    </td>

                    {/* Year */}
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {student.year}
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <StatusBadge status={student.status} />
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button title="View Profile" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye size={18} />
                        </button>
                        <button title="Edit Record" className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                          <Edit size={18} />
                        </button>
                        <button title="Archive" className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                    <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                      <Search size={24} className="text-slate-400" />
                    </div>
                    <p>No students found matching "{searchTerm}"</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-sm text-slate-500">
          <span>Showing <strong>{filteredStudents.length}</strong> records</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-300 rounded hover:bg-white disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-slate-300 rounded hover:bg-white">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Helper Component ---
function StatusBadge({ status }) {
  const styles = {
    'Enrolled': 'bg-green-100 text-green-700 border-green-200',
    'Irregular': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'On-OJT': 'bg-blue-100 text-blue-700 border-blue-200',
    'Dropped': 'bg-red-100 text-red-700 border-red-200',
  };

  const defaultStyle = 'bg-slate-100 text-slate-700 border-slate-200';

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status] || defaultStyle} inline-flex items-center gap-1`}>
      {status === 'Enrolled' && <BadgeCheck size={12} />}
      {status}
    </span>
  );
}