'use client';

import { useState } from 'react';
import { 
  Save, Building, Shield, Bell, Database, 
  UserCog, Lock, Mail, Upload, Loader2, CheckCircle2 
} from 'lucide-react';
import Image from 'next/image';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Mock Settings State
  const [settings, setSettings] = useState({
    schoolName: 'Integrated Innovation and Hospitality Colleges',
    address: 'Fairview, Quezon City',
    currentTerm: '1st Semester',
    academicYear: '2024-2025',
    emailNotifications: true,
    systemMaintenance: false,
  });

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API Call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* School Profile Card */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Building size={20} className="text-slate-400" /> 
                School Profile
              </h3>
              
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                {/* Logo Upload */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-32 h-32 bg-slate-100 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center relative overflow-hidden group cursor-pointer hover:border-red-500 transition-colors">
                    {/* Ensure logo.png exists or this placeholder shows */}
                    <Image src="/logo.png" alt="Logo" width={80} height={80} className="object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Upload className="text-white" size={24} />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Click to update logo</p>
                </div>

                {/* Form Fields */}
                <div className="flex-1 w-full grid gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Institution Name</label>
                    <input 
                      type="text" 
                      value={settings.schoolName}
                      onChange={(e) => setSettings({...settings, schoolName: e.target.value})}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Campus Address</label>
                    <input 
                      type="text" 
                      value={settings.address}
                      onChange={(e) => setSettings({...settings, address: e.target.value})}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Period Card */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Database size={20} className="text-slate-400" /> 
                Academic Configuration
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Academic Year</label>
                  <select 
                    value={settings.academicYear}
                    onChange={(e) => setSettings({...settings, academicYear: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none"
                  >
                    <option>2023-2024</option>
                    <option>2024-2025</option>
                    <option>2025-2026</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Current Term</label>
                  <select 
                    value={settings.currentTerm}
                    onChange={(e) => setSettings({...settings, currentTerm: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-900 bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none"
                  >
                    <option>1st Semester</option>
                    <option>2nd Semester</option>
                    <option>Summer Term</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Lock size={20} className="text-slate-400" /> 
                Access Control
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-slate-100 rounded-lg bg-slate-50">
                  <div>
                    <p className="font-semibold text-slate-900">Two-Factor Authentication (2FA)</p>
                    <p className="text-sm text-slate-500">Require OTP for Admin logins.</p>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="font-bold text-slate-800">Password Policy</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700">Minimum Length</label>
                      <input type="number" defaultValue={8} className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700">Expiration (Days)</label>
                      <input type="number" defaultValue={90} className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="p-12 text-center text-slate-500">Module under development.</div>;
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-6">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
          <p className="text-slate-500 text-sm">Configure global preferences and school parameters.</p>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium shadow-sm transition-all ${
            saveSuccess ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-900 hover:bg-slate-800'
          }`}
        >
          {isSaving ? (
            <Loader2 className="animate-spin" size={18} />
          ) : saveSuccess ? (
            <CheckCircle2 size={18} />
          ) : (
            <Save size={18} />
          )}
          <span>{saveSuccess ? 'Saved!' : isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-8 items-start">
        
        {/* Navigation Sidebar */}
        <div className="md:col-span-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <nav className="flex flex-col p-2 space-y-1">
            {[
              { id: 'general', label: 'General', icon: Building },
              { id: 'security', label: 'Security', icon: Shield },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'users', label: 'User Roles', icon: UserCog },
              { id: 'backup', label: 'Backup & Data', icon: Database },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-red-50 text-red-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="md:col-span-3">
          {renderTabContent()}
        </div>

      </div>
    </div>
  );
}