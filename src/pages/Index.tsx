
import React, { useState } from 'react';
import { AppointmentProvider } from '../contexts/AppointmentContext';
import { useAppointmentContext } from '../contexts/AppointmentContext';
import DoctorCard from '../components/DoctorCard';
import AppointmentForm from '../components/AppointmentForm';
import DashboardStats from '../components/DashboardStats';
import AppointmentQueue from '../components/AppointmentQueue';
import UserRoleSelector from '../components/UserRoleSelector';

const AppContent: React.FC = () => {
  const { doctors, currentUser } = useAppointmentContext();
  const [showBookingForm, setShowBookingForm] = useState(false);

  const renderPatientView = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Your Appointment</h2>
        <p className="text-gray-600">Choose from our available doctors and schedule your visit</p>
      </div>
      
      {showBookingForm ? (
        <AppointmentForm onClose={() => setShowBookingForm(false)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map(doctor => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBookAppointment={() => setShowBookingForm(true)}
            />
          ))}
        </div>
      )}
    </div>
  );

  const renderDoctorView = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Doctor Dashboard</h2>
        <p className="text-gray-600">Manage your schedule and patient appointments</p>
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AppointmentQueue />
        <div className="grid gap-4">
          {doctors.slice(0, 2).map(doctor => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              showBookButton={false}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderAdminView = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
        <p className="text-gray-600">Comprehensive overview of clinic operations</p>
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AppointmentQueue />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Doctor Status</h3>
          {doctors.map(doctor => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              showBookButton={false}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">
            MedSync Scheduler
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Advanced appointment booking system for healthcare facilities
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
    <AppointmentProvider>
      <AppContent />
    </AppointmentProvider>
  );
};

export default Index;
