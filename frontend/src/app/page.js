import { ChefHat, GraduationCap, CalendarDays, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <main className="flex-1 flex flex-col justify-center">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold mb-8 uppercase tracking-wide border border-red-100">
                Official Access Portal
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                Integrated Innovation <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-red-500">
                    & Hospitality Colleges
                </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                Empowering the next generation of hospitality leaders. 
                Access your academic records, manage kitchen requisitions, and book training facilities in one unified hub.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button href="/dashboard" variant="primary">
                    Enter Portal <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button href="/about" variant="secondary">
                    Learn More
                </Button>
            </div>
        </div>

        {/* Feature Grid */}
        <div className="max-w-6xl mx-auto px-6 pb-20 w-full">
            <div className="grid md:grid-cols-3 gap-6">
                <Card 
                  icon={GraduationCap} 
                  title="Academic Hub" 
                  description="View grades, enrollment schedules, and curriculum progress for all hospitality and tech courses." 
                  color="blue" 
                />
                <Card 
                  icon={ChefHat} 
                  title="Kitchen & Supply" 
                  description="Real-time tracking of ingredients, uniforms, and culinary equipment for laboratory classes." 
                  color="orange" 
                />
                <Card 
                  icon={CalendarDays} 
                  title="Facility Reservations" 
                  description="Book hot kitchens, function halls, and computer labs for events and practical examinations." 
                  color="green" 
                />
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}