
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppointmentContext } from '../contexts/AppointmentContext';
import { Calendar, Clock, Users, CheckCircle, TrendingUp, Activity } from 'lucide-react';

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
      color: "text-teal-600",
      bgColor: "bg-gradient-to-br from-teal-50 to-teal-100",
      iconBg: "bg-gradient-to-br from-teal-500 to-teal-600",
      trend: "+12%",
      trendIcon: TrendingUp
    },
    {
      title: "Available Doctors",
      value: availableDoctors,
      icon: Users,
      color: "text-emerald-600",
      bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      trend: "+5%",
      trendIcon: Activity
    },
    {
      title: "Completed Today",
      value: completedToday,
      icon: CheckCircle,
      color: "text-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
      trend: "+8%",
      trendIcon: TrendingUp
    },
    {
      title: "Active Patients",
      value: activePatients,
      icon: Clock,
      color: "text-cyan-600",
      bgColor: "bg-gradient-to-br from-cyan-50 to-cyan-100",
      iconBg: "bg-gradient-to-br from-cyan-500 to-cyan-600",
      trend: "+15%",
      trendIcon: TrendingUp
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trendIcon;
        return (
          <Card key={index} className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 backdrop-blur-sm bg-white/80">
            <div className={`absolute inset-0 ${stat.bgColor} opacity-50`} />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-8 translate-x-8" />
            
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-gray-700">
                {stat.title}
              </CardTitle>
              <div className={`${stat.iconBg} p-3 rounded-xl shadow-lg transform hover:scale-110 transition-transform duration-300`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            
            <CardContent className="relative">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1 animate-fade-in">{stat.value}</div>
                  <div className="flex items-center space-x-1">
                    <TrendIcon className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-green-600 font-medium">{stat.trend}</span>
                    <span className="text-xs text-gray-500">vs last week</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex items-center">
                <div className="h-2 bg-white bg-opacity-60 rounded-full flex-1 mr-3 overflow-hidden">
                  <div 
                    className={`h-2 ${stat.iconBg} rounded-full transition-all duration-1000 ease-out animate-pulse`} 
                    style={{ width: '75%' }} 
                  />
                </div>
                <span className="text-xs text-gray-600 font-medium">Active</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;
