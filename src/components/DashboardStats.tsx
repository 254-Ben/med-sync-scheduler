
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
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconBg: "bg-blue-500"
    },
    {
      title: "Available Doctors",
      value: availableDoctors,
      icon: Users,
      color: "text-emerald-600",
      bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      iconBg: "bg-emerald-500"
    },
    {
      title: "Completed Today",
      value: completedToday,
      icon: CheckCircle,
      color: "text-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      iconBg: "bg-purple-500"
    },
    {
      title: "Active Patients",
      value: activePatients,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
      iconBg: "bg-orange-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className={`absolute inset-0 ${stat.bgColor}`} />
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-700">
                {stat.title}
              </CardTitle>
              <div className={`${stat.iconBg} p-2 rounded-lg shadow-md`}>
                <Icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="flex items-center">
                <div className="h-1 bg-white bg-opacity-50 rounded-full flex-1 mr-2">
                  <div className={`h-1 ${stat.iconBg} rounded-full`} style={{ width: '70%' }} />
                </div>
                <span className="text-xs text-gray-600">Active</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;
