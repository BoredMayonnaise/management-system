'use client';

import { useState } from 'react';
import { 
  Search, Printer, Save, FileText, 
  ChevronDown, AlertCircle, CheckCircle2 
} from 'lucide-react';

// Mock Student Data
const STUDENTS = [
  { id: '2024-001', name: 'Juan Dela Cruz', program: 'BS Criminology', year: '3rd Year' },
  { id: '2024-002', name: 'Maria Clara', program: 'TVL - HE (Culinary)', year: 'Grade 11' },
];

// Mock Grades Data (Linked to Student ID)
const GRADE_RECORDS = {
  '2024-001': [
    { code: 'CRIM 101', desc: 'Introduction to Criminology', units: 3, prelim: 88, midterm: 85, finals: 89 },
    { code: 'CRIM 102', desc: 'Police Photography', units: 3, prelim: 90, midterm: 92, finals: 91 },
    { code: 'GE 001', desc: 'Understanding the Self', units: 3, prelim: 85, midterm: 83, finals: 86 },
    { code: 'PE 3', desc: 'Individual/Dual Sports', units: 2, prelim: 95, midterm: 94, finals: 96 },
  ],
  '2024-002': [
    { code: 'CUL 101', desc: 'Kitchen Essentials & Basic Food Prep', units: 4, prelim: 92, midterm: 88, finals: 90 },
    { code: 'TOUR 1', desc: 'Introduction to Tourism', units: 3, prelim: 85, midterm: 87, finals: 86 },
    { code: 'H.O. 1', desc: 'Housekeeping Operations', units: 3, prelim: 89, midterm: 85, finals: 88 },
  ]
};

export default function GradesPage() {
  const [selectedStudentId, setSelectedStudentId] = useState(STUDENTS[0].id);
  const [grades, setGrades] = useState(GRADE_RECORDS[STUDENTS[0].id]);
  const [isEditing, setIsEditing] = useState(false);

  // Handle Student Switch
  const handleStudentChange = (e) => {
    const newId = e.target.value;
    setSelectedStudentId(newId);
    setGrades(GRADE_RECORDS[newId] || []);
    setIsEditing(false);
  };

  const selectedStudent = STUDENTS.find(s => s.id === selectedStudentId);

  // Helper to calculate Final Grade (Average)
  const calculateFinal = (g) => Math.round((g.prelim + g.midterm + g.finals) / 3);

  return (
    <div className="space-y-6 p-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Grading Sheet</h1>
          <p className="text-slate-500 text-sm">View and update academic performance records.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-medium transition-colors ${
              isEditing 
                ? 'bg-slate-900 text-white border-slate-900' 
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            {isEditing ? <Save size={18} /> : <FileText size={18} />}
            {isEditing ? 'Save Grades' : 'Edit Grades'}
          </button>
          <button className="flex items-center gap-2 bg-white text-slate-700 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 font-medium shadow-sm">
            <Printer size={18} />
            <span className="hidden sm:inline">Print Report</span>
          </button>
        </div>
      </div>

      {/* Student Selector Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="grid md:grid-cols-3 gap-6 items-center">
          
          {/* Search/Select */}
          <div className="col-span-1">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Select Student</label>
            <div className="relative">
              <select 
                className="w-full appearance-none bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-2.5 pr-8"
                value={selectedStudentId}
                onChange={handleStudentChange}
              >
                {STUDENTS.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name} ({student.id})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          {/* Student Details Preview */}
          <div className="col-span-2 flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-end border-l border-slate-100 pl-6">
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase">Program / Track</p>
              <p className="text-sm font-bold text-slate-800">{selectedStudent?.program}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase">Year Level</p>
              <p className="text-sm font-bold text-slate-800">{selectedStudent?.year}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase">Term</p>
              <p className="text-sm font-bold text-slate-800">1st Semester, AY 2024-2025</p>
            </div>
          </div>

        </div>
      </div>

      {/* Grading Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="px-6 py-4 w-24">Code</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-4 py-4 text-center w-16">Units</th>
                <th className="px-4 py-4 text-center w-24 bg-blue-50/50">Prelim</th>
                <th className="px-4 py-4 text-center w-24 bg-blue-50/50">Midterm</th>
                <th className="px-4 py-4 text-center w-24 bg-blue-50/50">Finals</th>
                <th className="px-6 py-4 text-center w-24 font-bold text-slate-700 bg-slate-100/50">Average</th>
                <th className="px-6 py-4 text-center w-32">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {grades.map((record, index) => {
                const finalGrade = calculateFinal(record);
                const isPassed = finalGrade >= 75; // Example passing grade

                return (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-medium text-slate-600">{record.code}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{record.desc}</td>
                    <td className="px-4 py-4 text-center text-slate-500">{record.units}</td>
                    
                    {/* Grade Inputs (Read-only unless editing) */}
                    <td className="px-4 py-4 text-center">
                      <GradeInput value={record.prelim} isEditing={isEditing} />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <GradeInput value={record.midterm} isEditing={isEditing} />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <GradeInput value={record.finals} isEditing={isEditing} />
                    </td>

                    {/* Computed Final */}
                    <td className="px-6 py-4 text-center font-bold text-slate-900 bg-slate-50/50">
                      {finalGrade}
                    </td>

                    {/* Remarks Badge */}
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        isPassed 
                          ? 'bg-green-50 text-green-700 border-green-200' 
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        {isPassed ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                        {isPassed ? 'PASSED' : 'FAILED'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {/* Table Footer / Summary */}
            <tfoot className="bg-slate-50 border-t border-slate-200">
              <tr>
                <td colSpan="2" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Total Units:</td>
                <td className="px-4 py-4 text-center text-sm font-bold text-slate-900">
                  {grades.reduce((acc, curr) => acc + curr.units, 0)}
                </td>
                <td colSpan="3" className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">GWA:</td>
                <td className="px-6 py-4 text-center font-bold text-blue-700 text-lg">
                  {Math.round(grades.reduce((acc, curr) => acc + calculateFinal(curr), 0) / grades.length)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

// Simple Input Component for Grades
function GradeInput({ value, isEditing }) {
  if (!isEditing) {
    return <span className="text-slate-700">{value}</span>;
  }
  return (
    <input 
      type="number" 
      defaultValue={value}
      className="w-16 p-1 text-center border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-900 bg-white"
      min="50" max="100"
    />
  );
}