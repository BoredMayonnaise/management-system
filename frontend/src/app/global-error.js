'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, LifeBuoy } from 'lucide-react';

export default function Error({ error, reset }) {
  
  useEffect(() => {
    // Log the error to the console (or your logging service)
    console.error('Runtime Application Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-4">
      
      <div className="max-w-md w-full text-center">
        
        {/* Icon Container (Warning Style) */}
        <div className="mx-auto w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-red-100">
            <AlertTriangle className="w-12 h-12 text-red-600" />
        </div>

        {/* Headings */}
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
          Application Error
        </h1>
        <p className="text-slate-500 mb-8 text-lg">
          We encountered an unexpected issue. Our technical team has been notified.
        </p>

        {/* Dev Mode Error Details (Optional) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-red-50 text-red-800 text-sm font-mono rounded border border-red-100 text-left overflow-auto max-h-32">
            {error.message || "Unknown error occurred"}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
            className="flex items-center justify-center gap-2 px-6 py-3 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transition-all shadow-sm hover:shadow-md"
          >
            <RotateCcw size={18} />
            Try Again
          </button>

          <Link
            href="/support"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-700 font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 transition-all"
          >
            <LifeBuoy size={18} />
            Contact IT
          </Link>
        </div>

      </div>
      
      {/* Footer Text */}
      <p className="mt-12 text-xs text-slate-400 uppercase tracking-widest font-medium">
        Error 500 • IIHC Portal
      </p>
    </div>
  );
}