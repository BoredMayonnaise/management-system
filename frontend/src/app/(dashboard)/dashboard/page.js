import { 
  Users, AlertTriangle, Utensils, Calendar, 
  ArrowUpRight, Plus, ChefHat, FilePlus 
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8 p-6">
      
      {/* 1. Welcome Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500">Welcome back, here's what's happening at IIHC today.</p>
        </div>
        <div className="text-sm text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Enrollees" 
          value="1,248" 
          trend="+12% this sem" 
          icon={Users} 
          color="bg-blue-600" 
        />
        <StatCard 
          title="Kitchen Requests" 
          value="24" 
          trend="Pending Approval" 
          icon={Utensils} 
          color="bg-orange-500" 
        />
        <StatCard 
          title="Facility Bookings" 
          value="08" 
          trend="Upcoming Today" 
          icon={Calendar} 
          color="bg-purple-600" 
        />
        <StatCard 
          title="Low Stock Items" 
          value="15" 
          trend="Needs Restock" 
          icon={AlertTriangle} 
          color="bg-red-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 3. Main Content: Recent Activity Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Recent Transactions</h3>
          </div>
          <div className="p-0">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Reference</th>
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <TransactionRow id="#REQ-092" name="Juan Dela Cruz" type="Kitchen Supply" status="Pending" />
                <TransactionRow id="#BK-101" name="Maria Clara" type="Function Hall A" status="Approved" />
                <TransactionRow id="#ENR-442" name="Jose Rizal" type="Enrollment" status="Completed" />
                <TransactionRow id="#REQ-091" name="Andres Boni" type="Uniform Request" status="Pending" />
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Sidebar: Quick Actions */}
        <div className="space-y-6">
          
          {/* Quick Actions Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <ActionButton icon={Plus} label="Enroll New Student" />
              <ActionButton icon={ChefHat} label="Restock Inventory" />
              <ActionButton icon={FilePlus} label="Create Announcement" />
            </div>
          </div>

          {/* System Status Card */}
          <div className="bg-slate-900 rounded-xl shadow-sm p-6 text-white">
            <h3 className="font-bold mb-2">System Status</h3>
            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex justify-between">
                <span>Database</span>
                <span className="text-green-400 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online
                </span>
              </div>
              <div className="flex justify-between">
                <span>API Latency</span>
                <span>24ms</span>
              </div>
              <div className="pt-4 border-t border-slate-700">
                <p className="text-xs text-slate-500">Last backup: 2 hours ago</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// --- Sub Components ---

function StatCard({ title, value, trend, icon: Icon, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${color} text-white shadow-sm`}>
          <Icon size={22} />
        </div>
      </div>
      <div className="flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-50 w-fit px-2 py-1 rounded-md">
        <ArrowUpRight size={14} className="text-green-600" />
        <span>{trend}</span>
      </div>
    </div>
  );
}

function TransactionRow({ id, name, type, status }) {
  const statusStyles = {
    Pending: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    Approved: 'bg-green-50 text-green-700 border-green-100',
    Completed: 'bg-blue-50 text-blue-700 border-blue-100',
  };

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4 font-medium text-slate-900">{id}</td>
      <td className="px-6 py-4">{name}</td>
      <td className="px-6 py-4">{type}</td>
      <td className="px-6 py-4">
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${statusStyles[status] || 'bg-gray-100'}`}>
          {status}
        </span>
      </td>
    </tr>
  );
}

function ActionButton({ icon: Icon, label }) {
  return (
    <button className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 text-slate-700 font-medium rounded-lg hover:bg-slate-100 border border-slate-200 transition-all hover:border-slate-300">
      <Icon size={18} className="text-red-700" />
      {label}
    </button>
  );
}