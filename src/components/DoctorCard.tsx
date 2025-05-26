
import React from 'react';
import { Doctor } from '../types/appointment';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppointmentContext } from '../contexts/AppointmentContext';

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment?: () => void;
  showBookButton?: boolean;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBookAppointment, showBookButton = true }) => {
  const { setSelectedDoctorId } = useAppointmentContext();

  const getStatusColor = (status: Doctor['status']) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-consultation': return 'bg-red-100 text-red-800 border-red-200';
      case 'break': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'off-duty': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: Doctor['status']) => {
    switch (status) {
      case 'available': return 'Available';
      case 'in-consultation': return 'In Consultation';
      case 'break': return 'On Break';
      case 'off-duty': return 'Off Duty';
      default: return 'Unknown';
    }
  };

  const handleBookAppointment = () => {
    setSelectedDoctorId(doctor.id);
    onBookAppointment?.();
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-lg">
                {doctor.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <CardTitle className="text-lg text-gray-900">{doctor.name}</CardTitle>
              <p className="text-sm text-gray-600">{doctor.specialization}</p>
            </div>
          </div>
          <Badge className={`${getStatusColor(doctor.status)} px-2 py-1`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${
              doctor.status === 'available' ? 'bg-green-500' :
              doctor.status === 'in-consultation' ? 'bg-red-500' :
              doctor.status === 'break' ? 'bg-yellow-500' : 'bg-gray-500'
            }`} />
            {getStatusText(doctor.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-gray-600">
          <div>
            <span className="font-medium">Hours:</span> {doctor.workingHours.start} - {doctor.workingHours.end}
          </div>
          <div>
            <span className="font-medium">Break:</span> {doctor.workingHours.breakStart} - {doctor.workingHours.breakEnd}
          </div>
          <div>
            <span className="font-medium">Phone:</span> {doctor.phone}
          </div>
        </div>
        
        {showBookButton && (
          <Button 
            onClick={handleBookAppointment}
            disabled={doctor.status !== 'available'}
            className="w-full mt-4"
            variant={doctor.status === 'available' ? 'default' : 'secondary'}
          >
            {doctor.status === 'available' ? 'Book Appointment' : 'Currently Unavailable'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
