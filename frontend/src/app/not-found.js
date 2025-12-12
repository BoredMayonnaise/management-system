import Link from "next/link";
import { FileQuestion, LayoutDashboard, LifeBuoy } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-4">
      
      <div className="max-w-md w-full text-center">
        
        {/* Icon Container */}
        <div className="mx-auto w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-red-100">
            <FileQuestion className="w-12 h-12 text-red-600" />
        </div>

        {/* Headings */}
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-slate-500 mb-8 text-lg">
          Sorry, we couldn&apos;t find the page you were looking for. It might have been moved or you may have mistyped the address.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transition-all shadow-sm hover:shadow-md"
          >
            <LayoutDashboard size={18} />
            Back to Main Page
          </Link>

          <Link
            href="/support"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-700 font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 transition-all"
          >
            <LifeBuoy size={18} />
            Help Center
          </Link>
        </div>

      </div>
      
      {/* Footer Text */}
      <p className="mt-12 text-xs text-slate-400 uppercase tracking-widest font-medium">
        Error 404 • IIHC Portal
      </p>
    </div>
  );
}