'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Import useRouter
import { 
  LayoutDashboard, Users, GraduationCap, 
  ChefHat, CalendarDays, Settings, LogOut, 
  FileText, ClipboardList
} from 'lucide-react';
import Image from 'next/image';
import { api } from '@/app/lib/api'; // Import the API utility

const menuItems = [
  {
    category: "Overview",
    items: [
      { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    ]
  },
  {
    category: "Academic",
    items: [
      { name: 'Students', icon: Users, href: '/dashboard/students' },
      { name: 'Grades & Records', icon: GraduationCap, href: '/dashboard/grades' },
      { name: 'Enrollment', icon: FileText, href: '/dashboard/enrollment' },
    ]
  },
  {
    category: "Hospitality Ops",
    items: [
      { name: 'Kitchen Inventory', icon: ChefHat, href: '/dashboard/inventory' },
      { name: 'Facility Booking', icon: CalendarDays, href: '/dashboard/facilities' },
      { name: 'Requisitions', icon: ClipboardList, href: '/dashboard/requests' },
    ]
  },
  {
    category: "System",
    items: [
      { name: 'Settings', icon: Settings, href: '/settings' },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter(); // Initialize useRouter

  const handleLogout = async () => {
    try {
      // Call the backend logout API
      await api.post('/api/logout');

      // On successful logout, redirect to the login page
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen sticky top-0 border-r border-slate-800">
      
      {/* Brand Header */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800">
        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
          {/* Ensure logo.png is in public folder */}
          <Image src="/logo.png" alt="IIHC" width={24} height={24} className="object-contain" />
        </div>
        <span className="font-bold tracking-wide text-lg">IIHC Admin</span>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-8">
        {menuItems.map((section, idx) => (
          <div key={idx}>
            <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              {section.category}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive 
                        ? 'bg-blue-900 text-white shadow-sm' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon size={18} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={handleLogout} // Attach the logout handler
          className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-blue-400 hover:bg-white/5 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}