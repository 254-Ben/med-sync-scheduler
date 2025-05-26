
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Doctor, Patient, Appointment } from '../types/appointment';
import { doctors as initialDoctors, patients as initialPatients, appointments as initialAppointments } from '../data/sampleData';

interface AppointmentContextType {
  doctors: Doctor[];
  patients: Patient[];
  appointments: Appointment[];
  currentUser: 'patient' | 'doctor' | 'admin';
  selectedDoctorId: string | null;
  updateDoctorStatus: (doctorId: string, status: Doctor['status']) => void;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => void;
  updateAppointment: (appointmentId: string, updates: Partial<Appointment>) => void;
  addPatient: (patient: Omit<Patient, 'id'>) => string;
  setCurrentUser: (user: 'patient' | 'doctor' | 'admin') => void;
  setSelectedDoctorId: (doctorId: string | null) => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [currentUser, setCurrentUser] = useState<'patient' | 'doctor' | 'admin'>('admin');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);

  // Simulate real-time status updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5);
      
      setDoctors(prevDoctors => 
        prevDoctors.map(doctor => {
          const todayAppointments = appointments.filter(apt => 
            apt.doctorId === doctor.id && 
            apt.date === now.toISOString().slice(0, 10) &&
            apt.status === 'scheduled'
          );
          
          const currentAppointment = todayAppointments.find(apt => 
            apt.time <= currentTime && 
            new Date(`1970-01-01T${apt.time}:00`).getTime() + (apt.duration * 60000) > 
            new Date(`1970-01-01T${currentTime}:00`).getTime()
          );
          
          if (currentAppointment) {
            return { ...doctor, status: 'in-consultation' as const };
          }
          
          // Check if in break time
          if (currentTime >= doctor.workingHours.breakStart && currentTime <= doctor.workingHours.breakEnd) {
            return { ...doctor, status: 'break' as const };
          }
          
          // Check if within working hours
          if (currentTime >= doctor.workingHours.start && currentTime <= doctor.workingHours.end) {
            return { ...doctor, status: 'available' as const };
          }
          
          return { ...doctor, status: 'off-duty' as const };
        })
      );
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [appointments]);

  const updateDoctorStatus = (doctorId: string, status: Doctor['status']) => {
    setDoctors(prev => prev.map(doctor => 
      doctor.id === doctorId ? { ...doctor, status } : doctor
    ));
  };

  const addAppointment = (appointmentData: Omit<Appointment, 'id' | 'createdAt'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  const updateAppointment = (appointmentId: string, updates: Partial<Appointment>) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId ? { ...apt, ...updates } : apt
    ));
  };

  const addPatient = (patientData: Omit<Patient, 'id'>): string => {
    const newPatient: Patient = {
      ...patientData,
      id: Date.now().toString()
    };
    setPatients(prev => [...prev, newPatient]);
    return newPatient.id;
  };

  return (
    <AppointmentContext.Provider value={{
      doctors,
      patients,
      appointments,
      currentUser,
      selectedDoctorId,
      updateDoctorStatus,
      addAppointment,
      updateAppointment,
      addPatient,
      setCurrentUser,
      setSelectedDoctorId
    }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointmentContext = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointmentContext must be used within an AppointmentProvider');
  }
  return context;
};
