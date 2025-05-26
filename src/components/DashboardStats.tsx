
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppointmentContext } from '../contexts/AppointmentContext';
import { Calendar, Clock, Users, CheckCircle } from 'lucide-react';

const DashboardStats: React.FC = () => {
  const { appointments, doctors, patients } = useAppointmentContext();
  
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(apt => apt.date === today);
  const completedToday = todayAppointments.filter(apt => apt.status === 'completed').length;
  const availableDoctors = doctors.filter(doc => doc.status === 'available').length;
  const activePatients = patients.length;

  const stats = [
    {
      title: "Today's Appointments",
      value: todayAppointments.length,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Available Doctors",
      value: availableDoctors,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Completed Today",
      value: completedToday,
      icon: CheckCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Active Patients",
      value: activePatients,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bgColor} ${stat.color} p-2 rounded-lg`}>
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;
