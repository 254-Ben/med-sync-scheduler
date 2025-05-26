
export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  email: string;
  phone: string;
  avatar: string;
  status: 'available' | 'in-consultation' | 'break' | 'off-duty';
  workingHours: {
    start: string;
    end: string;
    breakStart: string;
    breakEnd: string;
  };
  workingDays: number[]; // 0-6 (Sunday-Saturday)
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  age: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  duration: number; // in minutes
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show' | 'in-progress';
  isUrgent: boolean;
  notes?: string;
  createdAt: string;
  queuePosition?: number;
}

export interface TimeSlot {
  time: string;
  isAvailable: boolean;
  isBreak: boolean;
  appointmentId?: string;
}
