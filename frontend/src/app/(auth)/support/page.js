'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  LifeBuoy, Mail, Phone, MapPin, Send, 
  ArrowLeft, CheckCircle2, AlertCircle, Loader2 
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function SupportPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    category: 'login',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API Call delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* Navigation Bar */}
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            How can we help you?
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Our IT team is here to assist students and staff with technical issues, account access, and portal inquiries.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN - Contact Info & FAQ */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Direct Contact Cards */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Phone size={18} className="text-red-600" /> Direct Support
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1"><Phone size={16} className="text-slate-400" /></div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">(02) 8123-4567</p>
                    <p className="text-xs text-slate-500">Mon-Fri, 8AM - 5PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1"><Mail size={16} className="text-slate-400" /></div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">support@iihc.edu.ph</p>
                    <p className="text-xs text-slate-500">24/7 Ticket Logging</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1"><MapPin size={16} className="text-slate-400" /></div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">IT Office, Room 304</p>
                    <p className="text-xs text-slate-500">Main Campus Building</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick FAQ */}
            <div className="bg-red-50 rounded-xl border border-red-100 p-6">
              <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                <AlertCircle size={18} /> Quick Tips
              </h3>
              <ul className="space-y-3 text-sm text-red-800">
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>If you forgot your password, use the "Forgot Password" link on the login page first.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>Grade inquiries should be directed to the Registrar, not IT.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>Clear your browser cache if the portal is loading slowly.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN - Ticket Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h2 className="font-bold text-slate-800">Submit a Support Ticket</h2>
              </div>
              
              <div className="p-6 sm:p-8">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Name */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                          placeholder="Juan Dela Cruz"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Student/Staff ID */}
                      <div className="space-y-2">
                        <label htmlFor="id" className="text-sm font-medium text-slate-700">Student / Staff ID</label>
                        <input
                          type="text"
                          id="id"
                          name="id"
                          required
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                          placeholder="2024-XXXX"
                          value={formData.id}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Issue Category */}
                    <div className="space-y-2">
                      <label htmlFor="category" className="text-sm font-medium text-slate-700">Issue Category</label>
                      <select
                        id="category"
                        name="category"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all bg-white"
                        value={formData.category}
                        onChange={handleChange}
                      >
                        <option value="login">Login / Account Access</option>
                        <option value="portal">Portal Errors</option>
                        <option value="email">Institutional Email</option>
                        <option value="wifi">Campus Wi-Fi</option>
                        <option value="other">Other Concern</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-slate-700">Description of Issue</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows="4"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all resize-none"
                        placeholder="Please describe the problem you are encountering..."
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-900 text-white font-semibold py-3 px-8 rounded-lg hover:bg-red-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="animate-spin h-5 w-5" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Submit Ticket
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  // Success State
                  <div className="text-center py-12">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Ticket Submitted!</h2>
                    <p className="text-slate-600 max-w-md mx-auto mb-8">
                      Thank you, <strong>{formData.name}</strong>. Your ticket has been logged. Our IT team will contact you shortly via your registered email.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ ...formData, message: '' });
                      }}
                      className="text-red-700 font-semibold hover:text-red-900 underline underline-offset-4"
                    >
                      Submit another ticket
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}