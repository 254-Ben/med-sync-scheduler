
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppointmentContext } from '../contexts/AppointmentContext';
import { Clock, Users } from 'lucide-react';

const AppointmentQueue: React.FC = () => {
  const { appointments, patients, doctors } = useAppointmentContext();
  
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments
    .filter(apt => apt.date === today && apt.status === 'scheduled')
    .sort((a, b) => a.time.localeCompare(b.time));

  const getPatientName = (patientId: string) => {
    return patients.find(p => p.id === patientId)?.name || 'Unknown Patient';
  };

  const getDoctorName = (doctorId: string) => {
    return doctors.find(d => d.id === doctorId)?.name || 'Unknown Doctor';
  };

  const getEstimatedWaitTime = (appointmentTime: string, index: number) => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    const [hours, minutes] = appointmentTime.split(':').map(Number);
    const appointmentDate = new Date();
    appointmentDate.setHours(hours, minutes, 0, 0);
    
    const estimatedDelay = index * 15; // 15 minutes delay per appointment
    const waitTime = Math.max(0, (appointmentDate.getTime() - now.getTime()) / (1000 * 60) + estimatedDelay);
    
    return Math.round(waitTime);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          Today's Queue
        </CardTitle>
      </CardHeader>
      <CardContent>
        {todayAppointments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No appointments scheduled for today</p>
        ) : (
          <div className="space-y-3">
            {todayAppointments.map((appointment, index) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">
                      {getPatientName(appointment.patientId)}
                    </span>
                    {appointment.isUrgent && (
                      <Badge variant="destructive" className="text-xs">Urgent</Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{getDoctorName(appointment.doctorId)}</span>
                    {" • "}
                    <span>{appointment.reason}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{appointment.time}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    ~{getEstimatedWaitTime(appointment.time, index)} min wait
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentQueue;
