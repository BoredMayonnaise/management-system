import Link from 'next/link';
import { ArrowLeft, Shield, Lock, FileText } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function PrivacyPolicyPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* Header */}
      <Navbar/>

      <main className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Title Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-slate-500">
            Last Updated: <span className="font-medium text-slate-900">{lastUpdated}</span>
          </p>
        </div>

        {/* Content Block */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12 space-y-10 text-slate-700 leading-relaxed">
          
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              1. Introduction
            </h2>
            <p>
              Integrated Innovation and Hospitality Colleges (IIHC) respects your right to privacy and is committed to protecting the confidentiality of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use the <strong>IIHC Portal</strong>. By accessing this system, you agree to the terms outlined below.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. Information We Collect
            </h2>
            <p className="mb-4">
              We collect only the information necessary to provide educational services and manage campus operations. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 marker:text-red-600">
              <li><strong>Personal Identification:</strong> Name, Student/Staff ID, contact details, and date of birth.</li>
              <li><strong>Academic Records:</strong> Grades, enrollment history, class schedules, and attendance logs.</li>
              <li><strong>Operational Data:</strong> Kitchen inventory requisitions, facility booking history, and OJT logs.</li>
              <li><strong>System Logs:</strong> Login timestamps, IP addresses, and browser type for security auditing.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              3. How We Use Your Data
            </h2>
            <p>
              Your data is strictly used for academic and administrative purposes, including:
            </p>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <h3 className="font-semibold text-slate-900 mb-2">Academic Administration</h3>
                <p className="text-sm">Processing grades, generating transcripts, and managing course enrollments.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <h3 className="font-semibold text-slate-900 mb-2">Campus Security</h3>
                <p className="text-sm">Verifying identity for portal access and securing campus facilities.</p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. Data Security
            </h2>
            <p className="mb-4">
              We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure.
            </p>
            <div className="flex items-start gap-3 p-4 bg-blue-50 text-blue-900 rounded-lg border border-blue-100">
              <Lock className="shrink-0 mt-1" size={20} />
              <p className="text-sm">
                All data transmitted between your browser and our servers is encrypted using <strong>TLS/SSL protocols</strong>. Access to sensitive records is restricted to authorized faculty and registrar staff only.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. Your Rights
            </h2>
            <p>
              Under the Data Privacy Act, you have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3 marker:text-red-600">
              <li>Access your personal data stored in our system.</li>
              <li>Request corrections to inaccurate or incomplete information.</li>
              <li>Suspend, withdraw, or order the blocking/removal of your personal data (subject to academic retention policies).</li>
            </ul>
          </section>

          {/* Contact Section */}
          <div className="border-t border-slate-200 pt-8 mt-8">
            <h3 className="font-bold text-slate-900 mb-2">Have questions about your data?</h3>
            <p className="text-slate-600 mb-4">
              If you have concerns regarding this policy, please contact our Data Protection Officer.
            </p>
            <Link 
              href="/support"
              className="inline-flex items-center justify-center px-6 py-3 bg-red-900 text-white font-medium rounded-lg hover:bg-red-800 transition-all shadow-sm"
            >
              Contact Support
            </Link>
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
}