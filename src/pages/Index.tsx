
import React, { useState } from 'react';
import { AppointmentProvider } from '../contexts/AppointmentContext';
import { useAppointmentContext } from '../contexts/AppointmentContext';
import DoctorCard from '../components/DoctorCard';
import AppointmentForm from '../components/AppointmentForm';
import DashboardStats from '../components/DashboardStats';
import AppointmentQueue from '../components/AppointmentQueue';
import UserRoleSelector from '../components/UserRoleSelector';
import Header from '../components/Header';
import ErrorBoundary from '../components/ErrorBoundary';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { Sparkles, Stethoscope, Users } from 'lucide-react';

const AppContent: React.FC = () => {
  const { doctors, currentUser } = useAppointmentContext();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const { handleAsync, isLoading } = useErrorHandler();

  const handleBookingFormToggle = () => {
    handleAsync(
      async () => {
        setShowBookingForm(!showBookingForm);
        return Promise.resolve();
      },
      undefined,
      (error) => console.error('Form toggle error:', error)
    );
  };

  const renderPatientView = () => (
    <ErrorBoundary>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center medical-pattern p-8 rounded-2xl">
          <div className="flex items-center justify-center mb-4">
            <Stethoscope className="h-12 w-12 text-teal-600 mr-4 animate-float" />
            <h2 className="text-3xl font-bold gradient-text">Book Your Appointment</h2>
            <Sparkles className="h-8 w-8 text-blue-500 ml-4 animate-pulse" />
          </div>
          <p className="text-gray-700 text-lg font-medium">Choose from our certified doctors and schedule your visit securely</p>
        </div>
        
        {showBookingForm ? (
          <div className="animate-slide-up">
            <AppointmentForm onClose={handleBookingFormToggle} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {doctors.map(doctor => (
              <div key={doctor.id} className="hover-lift">
                <DoctorCard
                  doctor={doctor}
                  onBookAppointment={handleBookingFormToggle}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );

  const renderDoctorView = () => (
    <ErrorBoundary>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center teal-glass p-8 rounded-2xl">
          <div className="flex items-center justify-center mb-4">
            <Users className="h-12 w-12 text-teal-600 mr-4 animate-heartbeat" />
            <h2 className="text-3xl font-bold gradient-text">Doctor Dashboard</h2>
          </div>
          <p className="text-gray-700 text-lg font-medium">Manage your schedule and provide exceptional patient care</p>
        </div>
        
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="hover-lift">
            <AppointmentQueue />
          </div>
          <div className="grid gap-6">
            {doctors.slice(0, 2).map(doctor => (
              <div key={doctor.id} className="hover-lift">
                <DoctorCard
                  doctor={doctor}
                  showBookButton={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );

  const renderAdminView = () => (
    <ErrorBoundary>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center glass-effect p-8 rounded-2xl creative-border">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Sparkles className="h-12 w-12 text-purple-600 mr-4 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-400 rounded-full animate-ping"></div>
            </div>
            <h2 className="text-3xl font-bold gradient-text">Admin Command Center</h2>
            <Sparkles className="h-12 w-12 text-teal-600 ml-4 animate-pulse delay-500" />
          </div>
          <p className="text-gray-700 text-lg font-medium">Comprehensive oversight with advanced analytics & real-time insights</p>
        </div>
        
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 hover-lift">
            <AppointmentQueue />
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-bold gradient-text">Doctor Status Monitor</h3>
            {doctors.map(doctor => (
              <div key={doctor.id} className="hover-lift">
                <DoctorCard
                  doctor={doctor}
                  showBookButton={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="relative">
            <h1 className="text-5xl font-bold mb-4 animate-fade-in">
              <span className="gradient-text">MedSync Scheduler</span>
            </h1>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-teal-200 rounded-full opacity-20 animate-float"></div>
          </div>
          <p className="text-xl text-gray-700 mb-8 font-medium animate-slide-up">
            Next-generation appointment system with enterprise-grade security
          </p>
          <UserRoleSelector />
        </div>

        {currentUser === 'patient' && renderPatientView()}
        {currentUser === 'doctor' && renderDoctorView()}
        {currentUser === 'admin' && renderAdminView()}
      </div>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppointmentProvider>
        <AppContent />
      </AppointmentProvider>
    </ErrorBoundary>
  );
};

export default Index;
