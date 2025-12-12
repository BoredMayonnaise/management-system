import NavLink from '../ui/NavLink';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} Integrated Innovation and Hospitality Colleges.
        </p>
        <div className="flex gap-6 text-sm text-slate-500">
          <NavLink href="policy" className="hover:text-red-700">Privacy Policy</NavLink>
          <NavLink href="student-handbook" className="hover:text-red-700">Student Handbook</NavLink>
          <NavLink href="support" className="hover:text-red-700">Contact Support</NavLink>
        </div>
      </div>
    </footer>
  );
}