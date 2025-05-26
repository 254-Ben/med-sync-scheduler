
import { Doctor, Patient, Appointment } from '../types/appointment';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'General Practice',
    email: 'sarah.johnson@clinic.com',
    phone: '+1 (555) 123-4567',
    avatar: '/api/placeholder/120/120',
    status: 'available',
    workingHours: {
      start: '09:00',
      end: '17:00',
      breakStart: '12:00',
      breakEnd: '13:00'
    },
    workingDays: [1, 2, 3, 4, 5] // Monday to Friday
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Cardiology',
    email: 'michael.chen@clinic.com',
    phone: '+1 (555) 234-5678',
    avatar: '/api/placeholder/120/120',
    status: 'in-consultation',
    workingHours: {
      start: '08:00',
      end: '16:00',
      breakStart: '12:30',
      breakEnd: '13:30'
    },
    workingDays: [1, 2, 3, 4, 5]
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Dermatology',
    email: 'emily.rodriguez@clinic.com',
    phone: '+1 (555) 345-6789',
    avatar: '/api/placeholder/120/120',
    status: 'break',
    workingHours: {
      start: '10:00',
      end: '18:00',
      breakStart: '14:00',
      breakEnd: '15:00'
    },
    workingDays: [1, 2, 3, 4, 5]
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialization: 'Orthopedics',
    email: 'james.wilson@clinic.com',
    phone: '+1 (555) 456-7890',
    avatar: '/api/placeholder/120/120',
    status: 'available',
    workingHours: {
      start: '07:00',
      end: '15:00',
      breakStart: '11:00',
      breakEnd: '12:00'
    },
    workingDays: [1, 2, 3, 4, 5]
  },
  {
    id: '5',
    name: 'Dr. Lisa Thompson',
    specialization: 'Pediatrics',
    email: 'lisa.thompson@clinic.com',
    phone: '+1 (555) 567-8901',
    avatar: '/api/placeholder/120/120',
    status: 'available',
    workingHours: {
      start: '09:00',
      end: '17:00',
      breakStart: '13:00',
      breakEnd: '14:00'
    },
    workingDays: [1, 2, 3, 4, 5]
  }
];

export const patients: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    phone: '+1 (555) 111-1111',
    email: 'john.smith@email.com',
    age: 35
  },
  {
    id: '2',
    name: 'Mary Johnson',
    phone: '+1 (555) 222-2222',
    email: 'mary.johnson@email.com',
    age: 42
  },
  {
    id: '3',
    name: 'Robert Brown',
    phone: '+1 (555) 333-3333',
    email: 'robert.brown@email.com',
    age: 28
  }
];

export const appointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    date: '2025-05-26',
    time: '10:00',
    duration: 30,
    reason: 'Regular checkup',
    status: 'scheduled',
    isUrgent: false,
    createdAt: '2025-05-24T10:00:00Z',
    queuePosition: 1
  },
  {
    id: '2',
    patientId: '2',
    doctorId: '2',
    date: '2025-05-26',
    time: '14:00',
    duration: 45,
    reason: 'Chest pain consultation',
    status: 'in-progress',
    isUrgent: true,
    createdAt: '2025-05-24T14:00:00Z'
  },
  {
    id: '3',
    patientId: '3',
    doctorId: '3',
    date: '2025-05-27',
    time: '11:00',
    duration: 30,
    reason: 'Skin rash examination',
    status: 'scheduled',
    isUrgent: false,
    createdAt: '2025-05-24T16:00:00Z'
  }
];

export const reasonOptions = [
  'Regular checkup',
  'Follow-up appointment',
  'Vaccination',
  'Consultation',
  'Emergency',
  'Prescription refill',
  'Test results',
  'Physical therapy',
  'Other'
];
