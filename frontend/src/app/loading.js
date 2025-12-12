import { Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      
      {/* Brand Logo (Pulsing) */}
      <div className="mb-8 p-4 bg-white rounded-full shadow-sm border border-slate-100 animate-pulse">
        {/* Ensure 'logi.png' exists in your public/ folder */}
        <Image 
          src="/logo.png" 
          alt="IIHC Logo" 
          width={64} 
          height={64} 
          className="w-16 h-16 object-contain"
          priority
        />
      </div>

      {/* Loading Indicator */}
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
        
        <p className="text-sm font-medium text-slate-500 tracking-wider uppercase">
          Loading...
        </p>
      </div>

    </div>
  );
}