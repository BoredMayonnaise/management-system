'use client';

import { useState } from 'react';
import { 
  Search, Plus, Trash2, Printer, 
  CreditCard, CheckCircle2, AlertCircle, BookOpen 
} from 'lucide-react';

// Mock Data: Available Subjects
const AVAILABLE_SUBJECTS = [
  { code: 'CRIM 101', desc: 'Intro to Criminology', units: 3, fee: 1500, type: 'Lec' },
  { code: 'LEA 1', desc: 'Law Enforcement Org', units: 3, fee: 1500, type: 'Lec' },
  { code: 'PE 3', desc: 'Individual/Dual Sports', units: 2, fee: 1200, type: 'Lab' },
  { code: 'CUL 101', desc: 'Kitchen Essentials', units: 4, fee: 3500, type: 'Lab' },
  { code: 'TOUR 1', desc: 'Principles of Tourism', units: 3, fee: 1500, type: 'Lec' },
  { code: 'GE 004', desc: 'Mathematics in Modern World', units: 3, fee: 1500, type: 'Lec' },
];

export default function EnrollmentPage() {
  const [studentId, setStudentId] = useState('');
  const [enrolledSubjects, setEnrolledSubjects] = useState([]);
  const [status, setStatus] = useState('Pending'); // Pending, Assessed, Enrolled

  // Calculations
  const totalUnits = enrolledSubjects.reduce((acc, sub) => acc + sub.units, 0);
  const tuitionFee = enrolledSubjects.reduce((acc, sub) => acc + sub.fee, 0);
  const miscFee = 5500; // Fixed misc fee
  const totalAssessment = tuitionFee + miscFee;

  // Add Subject Logic
  const addSubject = (subject) => {
    if (!enrolledSubjects.some(s => s.code === subject.code)) {
      setEnrolledSubjects([...enrolledSubjects, subject]);
    }
  };

  // Remove Subject Logic
  const removeSubject = (code) => {
    setEnrolledSubjects(enrolledSubjects.filter(s => s.code !== code));
  };

  return (
    <div className="space-y-6 p-6">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Enrollment Module</h1>
          <p className="text-slate-500 text-sm">Process student subjects and generate assessments.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm text-sm">
          <span className="text-slate-500">Academic Period:</span>
          <span className="font-bold text-slate-900 ml-2">1st Sem, 2024-2025</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* LEFT COL: Student & Subject Selection */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Student Lookup */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
              Student Selection
            </h3>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Enter Student ID (e.g. 2024-001)" 
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </div>
              <button className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors">
                Load Profile
              </button>
            </div>
            
            {/* Mock Profile Preview (Visible when typing) */}
            {studentId.length > 4 && (
              <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center animate-in fade-in slide-in-from-top-2">
                <div>
                  <p className="font-bold text-slate-900">Juan Dela Cruz</p>
                  <p className="text-sm text-slate-500">BS Criminology • 3rd Year • Irregular</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200">
                  Eligible to Enroll
                </span>
              </div>
            )}
          </div>

          {/* 2. Subject Selection */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
              Add Subjects
            </h3>
            
            {/* Subject List Grid */}
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {AVAILABLE_SUBJECTS.map((sub) => (
                <button
                  key={sub.code}
                  onClick={() => addSubject(sub)}
                  disabled={enrolledSubjects.some(s => s.code === sub.code)}
                  className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{sub.code}</p>
                    <p className="text-xs text-slate-500">{sub.desc}</p>
                  </div>
                  <Plus size={16} className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>

            {/* Selected Table */}
            <div className="border border-slate-200 rounded-lg overflow-hidden mt-6">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-600 font-medium">
                  <tr>
                    <th className="px-4 py-3">Code</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3 text-center">Units</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {enrolledSubjects.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-4 py-8 text-center text-slate-400">
                        No subjects added yet.
                      </td>
                    </tr>
                  ) : (
                    enrolledSubjects.map((sub) => (
                      <tr key={sub.code} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-900">{sub.code}</td>
                        <td className="px-4 py-3 text-slate-600">{sub.desc}</td>
                        <td className="px-4 py-3 text-center text-slate-600">{sub.units}</td>
                        <td className="px-4 py-3 text-right">
                          <button 
                            onClick={() => removeSubject(sub.code)}
                            className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* RIGHT COL: Assessment Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm sticky top-24">
            
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <BookOpen size={18} className="text-slate-500" />
                Assessment Summary
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Total Units</span>
                <span className="font-medium text-slate-900">{totalUnits}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Tuition Fee</span>
                <span className="font-medium text-slate-900">₱{tuitionFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Miscellaneous</span>
                <span className="font-medium text-slate-900">₱{miscFee.toLocaleString()}</span>
              </div>
              
              <div className="border-t border-dashed border-slate-300 pt-4 mt-2">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-slate-700">Total Due</span>
                  <span className="text-2xl font-bold text-blue-700">₱{totalAssessment.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <button 
                  onClick={() => setStatus('Enrolled')}
                  className="w-full py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
                  disabled={enrolledSubjects.length === 0}
                >
                  <CheckCircle2 size={18} />
                  Process Enrollment
                </button>
                
                <button className="w-full py-3 bg-white text-slate-700 border border-slate-200 font-medium rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                  <Printer size={18} />
                  Print Assessment
                </button>
              </div>

              {/* Status Alert */}
              {status === 'Enrolled' && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 text-sm text-green-800">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold">Successfully Enrolled!</span>
                    <p className="text-green-700/80 text-xs mt-1">Assessment form sent to student email.</p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}