import NavLink from '../ui/NavLink';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-3">
        {/* Brand / Logo Area */}
        <Image src={"/logo.png"} height={50} width={50} alt='iihc logo' />
        <span className="text-xl font-bold tracking-tight text-red-950">IIHC Portal</span>
      </div>
      <div className="flex items-center gap-6">
        <NavLink href="/login" className="px-5 py-2.5 bg-red-900 text-white text-sm font-medium rounded-lg hover:bg-red-800 transition-all shadow-sm hover:shadow-md">
          Login
        </NavLink>
      </div>
    </nav>
  );
}