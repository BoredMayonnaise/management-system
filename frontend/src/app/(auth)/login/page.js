'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  User, Lock, ArrowRight, Loader2, Eye, EyeOff, ShieldCheck, 
  GraduationCap, Briefcase 
} from 'lucide-react';
import { api } from '@/app/lib/api'; // Import the API utility

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('student'); // 'student' or 'worker'
  const [formData, setFormData] = useState({ id: '', password: '' });
  const [error, setError] = useState(''); // State to hold error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); // Clear previous errors

    try {
      const endpoint = '/login'; // Backend login endpoint
      const response = await api.post(endpoint, { 
        id: formData.id, 
        password: formData.password 
      });

      if (response && response.user) {
        console.log('Login successful:', response.user);
        // The backend will set an HttpOnly JWT cookie.
        // Frontend just needs to redirect.
        router.push('/dashboard'); // Redirect to generic dashboard
      } else {
        setError('Login failed: Unknown error');
      }
    } catch (err) {
      console.error('Login API error:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const isStudent = userType === 'student';

  return (
    <div className="min-h-screen w-full flex bg-zinc-50">
      
      {/* LEFT SIDE - Visual & Branding */}
      <div className={`hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-12 text-white transition-colors duration-500 ${isStudent ? 'bg-red-900' : 'bg-zinc-900'}`}>
        
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        
        {/* Brand Header */}
        <div className="relative z-10 flex items-center gap-3">
           <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20">
             <Image src="/logo.png" alt="IIHC Logo" width={32} height={32} className="object-contain" />
           </div>
           <span className="font-bold text-lg tracking-wide">IIHC PORTAL</span>
        </div>

        {/* Hero Text */}
        <div className="relative z-10 max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-sm">
            {isStudent ? 'Student Access' : 'Faculty & Staff Access'}
          </div>
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            {isStudent ? (
              <>Empowering Future <span className="text-red-200">Leaders.</span></>
            ) : (
              <>Excellence in <span className="text-red-200">Education.</span></>
            )}
          </h1>
          <p className="text-red-100 text-lg leading-relaxed opacity-90">
            {isStudent 
              ? "Access your grades, enrollment schedules, and kitchen lab requisitions in one secure student hub."
              : "Manage student records, approve inventory requests, and update facility schedules efficiently."
            }
          </p>
        </div>

        {/* Footer Info */}
        <div className="relative z-10 flex items-center gap-2 text-sm text-red-300">
          <ShieldCheck size={16} />
          <span>Secure {isStudent ? 'Student' : 'Admin'} Environment • v2.4</span>
        </div>
      </div>

      {/* RIGHT SIDE - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-20 bg-white">
        <div className="max-w-md w-full space-y-8">
          
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Image src="/logo.png" alt="IIHC Logo" width={80} height={80} />
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Welcome Back</h2>
            <p className="mt-2 text-zinc-500">Please select your role to continue.</p>
          </div>

          {/* ROLE TOGGLE */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-100 rounded-xl">
            <button
              onClick={() => setUserType('student')}
              className={`flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                isStudent 
                  ? 'bg-white text-red-700 shadow-sm ring-1 ring-black/5' 
                  : 'text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200/50'
              }`}
            >
              <GraduationCap size={18} />
              Student
            </button>
            <button
              onClick={() => setUserType('worker')}
              className={`flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                !isStudent 
                  ? 'bg-white text-zinc-900 shadow-sm ring-1 ring-black/5' 
                  : 'text-zinc-500 hover:text-zinc-700 hover:bg-zinc-700/50'
              }`}
            >
              <Briefcase size={18} />
              Worker / Staff
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              
              {/* ID Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-zinc-400 group-focus-within:text-red-600 transition-colors" />
                </div>
                <input
                  id="id"
                  name="id"
                  type="text"
                  required
                  placeholder={isStudent ? "Student ID (e.g., 2024-001)" : "Employee ID / Email"}
                  className="block w-full pl-11 pr-4 py-3 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all bg-zinc-50 focus:bg-white"
                  value={formData.id}
                  onChange={(e) => setFormData({...formData, id: e.target.value})}
                />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-400 group-focus-within:text-red-600 transition-colors" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="Password"
                  className="block w-full pl-11 pr-12 py-3 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all bg-zinc-50 focus:bg-white"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className={`h-4 w-4 rounded focus:ring-opacity-50 ${isStudent ? 'text-red-600 focus:ring-red-500' : 'text-zinc-800 focus:ring-zinc-500'}`}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-zinc-600">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="forgot-password" className={`font-medium hover:underline ${isStudent ? 'text-red-600 hover:text-red-500' : 'text-zinc-700 hover:text-zinc-900'}`}>
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`group w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all ${
                isStudent 
                  ? 'bg-red-900 hover:bg-red-800 focus:ring-red-900' 
                  : 'bg-zinc-900 hover:bg-zinc-800 focus:ring-zinc-900'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 h-5 w-5" />
                  Verifying Credentials...
                </>
              ) : (
                <>
                  {isStudent ? 'Login as Student' : 'Login as Staff'}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-zinc-500">
            Having trouble?{' '}
            <Link href="/support" className={`font-medium hover:underline ${isStudent ? 'text-red-600' : 'text-zinc-700'}`}>
              Contact IT Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}