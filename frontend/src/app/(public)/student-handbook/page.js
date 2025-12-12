'use client';

import { useState } from 'react';
import { 
  BookOpen, Shirt, Monitor, AlertTriangle, Scale, 
  GraduationCap, Search, ArrowRight, Scroll, ShieldCheck 
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function StudentHandbookPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Data Structure for "Deep Search"
  const sections = [
    {
      id: 'mission',
      title: 'Mission & Vision',
      category: 'Core Identity',
      icon: BookOpen,
      content: (
        <div className="space-y-6">
          <p className="text-slate-600 leading-relaxed">
            IIHC is committed to developing competent professionals who embody <strong>Innovation</strong> and <strong>Service</strong>. We aim to produce graduates who are not only skilled in their craft but are also ethical leaders in the global workforce.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1">Excellence</h4>
              <p className="text-sm text-slate-500">Upholding the highest standards in academic and practical outputs.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1">Integrity</h4>
              <p className="text-sm text-slate-500">Honesty in all academic endeavors and professional dealings.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'programs',
      title: 'Academic Programs',
      category: 'Course Offerings',
      icon: Scroll,
      content: (
        <div className="space-y-8">
          <p className="text-slate-600">
            IIHC offers a diverse range of tracks for Senior High School and specialized degree programs for College students.
          </p>
          
          {/* Senior High School */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="font-bold text-xl text-slate-900 mb-4 flex items-center gap-2">
              <span className="p-1 bg-blue-600 rounded-md"></span> Senior High School
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-blue-800 mb-2 uppercase text-sm tracking-wide">Academic Track</h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-blue-600">•</span> 
                    <span><strong>ABM</strong> (Accountancy, Business and Management)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-blue-600">•</span> 
                    <span><strong>GAS</strong> (General Academic Strand)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-blue-600">•</span> 
                    <span><strong>STEM</strong> (Science, Technology, Engineering and Mathematics)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-blue-600">•</span> 
                    <span><strong>HUMSS</strong> (Humanities and Social Sciences)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-orange-800 mb-2 uppercase text-sm tracking-wide">TVL Track</h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-600">•</span> 
                    <span><strong>HE</strong> (Home Economics: Culinary Arts, Tourism, Hotel & Restaurant Services)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-600">•</span> 
                    <span><strong>ICT</strong> (Information and Communications Technology)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-600">•</span> 
                    <span><strong>IA</strong> (Industrial Arts: SMAW)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* College Programs */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-xl text-slate-900 mb-4 flex items-center gap-2">
              <span className="p-1 bg-red-600 rounded-md"></span> College Programs
            </h3>
            <div className="grid md:grid-cols-2 gap-x-4 gap-y-3">
              <ProgramItem title="BS Criminology" />
              <ProgramItem title="BS Tourism Management" />
              <ProgramItem title="BS Accountancy" />
              <ProgramItem title="BS Information System" />
              <ProgramItem title="BS Accounting Information System" />
              <ProgramItem title="Bachelor of Technical-Vocational Teacher Education" />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'uniform',
      title: 'Uniform & Dress Code',
      category: 'Uniform Policy',
      icon: Shirt,
      content: (
        <div className="space-y-4">
          <p className="text-slate-600">
            Students are required to wear the prescribed uniform for their specific department. The ID card must be worn at all times while on campus premises.
          </p>
          <div className="space-y-3 border-t border-slate-100 pt-4">
            <UniformItem 
              icon={<ShieldCheck size={20} />} 
              color="bg-slate-800 text-white" 
              title="Criminology Department"
              desc="Daily: Official department t-shirt/polo and tactical pants. Regulated haircut and grooming standards apply strictly."
            />
            <UniformItem 
              icon={<GraduationCap size={20} />} 
              color="bg-blue-50 text-blue-700" 
              title="Business & Teacher Education"
              desc="Corporate attire or the official school polo barong/blouse. Black slacks and closed black leather shoes."
            />
            <UniformItem 
              icon={<AlertTriangle size={20} />} 
              color="bg-orange-50 text-orange-700" 
              title="Hospitality & Tourism"
              desc="Standard Days: Departmental Corporate Uniform with blazer. Laboratory Days: Complete Chef's Whites (Culinary) or Bar Service Uniform (F&B)."
            />
            <UniformItem 
              icon={<Monitor size={20} />} 
              color="bg-purple-50 text-purple-700" 
              title="Information Technology (ICT)"
              desc="Official IT Department shirt or polo. Smart casual pants are permitted; strict prohibition on ripped jeans and slippers."
            />
          </div>
        </div>
      )
    },
    {
      id: 'facilities',
      title: 'Facility Guidelines',
      category: 'Facility Usage',
      icon: Scale,
      content: (
        <div className="space-y-4">
          <p className="text-slate-600">
            School facilities are shared resources. Students are expected to maintain cleanliness and order at all times.
          </p>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex gap-3">
              <span className="font-bold text-red-700">•</span>
              <span><strong>Computer Laboratories:</strong> No food or drinks allowed near workstations. Unauthorized installation of software is strictly prohibited.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-red-700">•</span>
              <span><strong>Hot Kitchens:</strong> Mise en place must be prepared before class. Safety shoes are mandatory to prevent accidents.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-red-700">•</span>
              <span><strong>Mock Hotel Rooms:</strong> Beddings and amenities must be reset after Housekeeping training sessions.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-red-700">•</span>
              <span><strong>Welding Shop (IA):</strong> PPE (Personal Protective Equipment) is mandatory at all times inside the workshop area.</span>
            </li>
          </ul>
        </div>
      )
    }
  ];

  // Deep Search Logic
  const filteredSections = sections.filter(section => {
    const term = searchTerm.toLowerCase();
    // Search in title, category, or the text content (simplified check)
    // Note: This simple check converts the JSX content to string which works for basic text, 
    // but for more robust search we check titles and categories primarily.
    return (
      section.title.toLowerCase().includes(term) ||
      section.category.toLowerCase().includes(term)
    );
  });

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar title="Student Handbook" />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Student Guidebook</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            The official code of conduct, academic policies, and operational guidelines for all IIHC students across all departments.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Navigation & Search */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Search Box */}
            <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex items-center">
              <Search className="ml-3 text-slate-400" size={20} />
              <input 
                type="text"
                placeholder="Search handbook..."
                className="w-full p-2 outline-none text-slate-700 placeholder-slate-400 bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Navigation List */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hidden lg:block">
              <h3 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-wider text-slate-500">Table of Contents</h3>
              <ul className="space-y-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-red-700 transition-colors flex items-center justify-between group"
                    >
                      {section.category}
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            
            {filteredSections.length > 0 ? (
              filteredSections.map((section) => (
                <div 
                  key={section.id} 
                  id={section.id} 
                  className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm scroll-mt-24 transition-all hover:shadow-md"
                >
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                    <div className="p-2 bg-red-50 text-red-700 rounded-lg">
                      <section.icon size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{section.category}</span>
                    </div>
                  </div>
                  
                  {section.content}
                </div>
              ))
            ) : (
              // No Results State
              <div className="bg-white p-12 rounded-xl border border-slate-200 text-center shadow-sm">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-slate-400" size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No results found</h3>
                <p className="text-slate-500 mt-2">
                  We couldn't find any guidelines matching "{searchTerm}". Try searching for keywords like "Uniform", "Kitchen", or "Grades".
                </p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-6 text-red-700 font-semibold text-sm hover:underline"
                >
                  Clear Search
                </button>
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Sub-component for Cleaner Uniform List
function UniformItem({ icon, color, title, desc }) {
  return (
    <div className="flex gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
      <div className={`p-2 rounded-lg shrink-0 h-fit flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-slate-900 text-sm">{title}</h4>
        <p className="text-sm text-slate-600 mt-1 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// Helper for Program List
function ProgramItem({ title }) {
  return (
    <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded transition-colors">
      <GraduationCap size={18} className="text-red-700 shrink-0" />
      <span className="text-sm font-medium text-slate-700">{title}</span>
    </div>
  );
}