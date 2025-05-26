
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppointmentContext } from '../contexts/AppointmentContext';
import { Users, UserCheck, Shield, Sparkles } from 'lucide-react';

const UserRoleSelector: React.FC = () => {
  const { currentUser, setCurrentUser } = useAppointmentContext();

  const roles = [
    {
      type: 'patient' as const,
      title: 'Patient',
      description: 'Book appointments and manage your healthcare journey',
      icon: Users,
      color: 'text-teal-700',
      bgColor: 'bg-gradient-to-br from-teal-50 to-cyan-100',
      borderColor: 'border-teal-300',
      hoverColor: 'hover:bg-gradient-to-br hover:from-teal-100 hover:to-cyan-200',
      shadowColor: 'shadow-teal-200/50'
    },
    {
      type: 'doctor' as const,
      title: 'Doctor',
      description: 'Manage schedules and provide exceptional patient care',
      icon: UserCheck,
      color: 'text-blue-700',
      bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-100',
      borderColor: 'border-blue-300',
      hoverColor: 'hover:bg-gradient-to-br hover:from-blue-100 hover:to-indigo-200',
      shadowColor: 'shadow-blue-200/50'
    },
    {
      type: 'admin' as const,
      title: 'Admin',
      description: 'Oversee operations with advanced analytics & insights',
      icon: Shield,
      color: 'text-purple-700',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-100',
      borderColor: 'border-purple-300',
      hoverColor: 'hover:bg-gradient-to-br hover:from-purple-100 hover:to-pink-200',
      shadowColor: 'shadow-purple-200/50'
    }
  ];

  return (
    <div className="mb-8 relative">
      {/* Decorative background elements */}
      <div className="absolute -top-4 -left-4 w-24 h-24 bg-teal-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      
      <div className="text-center mb-8 relative">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="h-8 w-8 text-teal-600 mr-3 animate-pulse" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Choose Your Role
          </h2>
          <Sparkles className="h-8 w-8 text-purple-600 ml-3 animate-pulse delay-500" />
        </div>
        <p className="text-gray-700 text-lg font-medium">Select how you'd like to access our secure platform</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {roles.map((role) => {
          const Icon = role.icon;
          const isActive = currentUser === role.type;
          return (
            <Card
              key={role.type}
              className={`cursor-pointer transition-all duration-500 transform hover:scale-105 ${role.shadowColor} ${
                isActive 
                  ? `${role.borderColor} border-3 ${role.bgColor} shadow-2xl scale-105` 
                  : `border-gray-200 hover:border-gray-300 ${role.hoverColor} shadow-lg hover:shadow-xl`
              } backdrop-blur-sm bg-white/90`}
              onClick={() => setCurrentUser(role.type)}
            >
              <CardContent className="p-8 text-center relative overflow-hidden">
                {/* Decorative gradient overlay */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600"></div>
                
                <div className={`${isActive ? role.bgColor : 'bg-gray-100'} ${isActive ? role.color : 'text-gray-500'} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 shadow-lg ${isActive ? 'animate-pulse' : ''}`}>
                  <Icon className="h-10 w-10" />
                </div>
                
                <h3 className={`text-xl font-bold mb-3 ${isActive ? role.color : 'text-gray-900'} transition-colors duration-300`}>
                  {role.title}
                </h3>
                
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{role.description}</p>
                
                {isActive && (
                  <div className="mt-6 animate-fade-in">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${role.bgColor} ${role.color} shadow-md`}>
                      <div className="w-2 h-2 bg-current rounded-full mr-2 animate-ping"></div>
                      Active Session
                    </div>
                  </div>
                )}
                
                {/* Subtle pattern overlay */}
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-gray-100/50 to-transparent rounded-full -translate-y-4 translate-x-4"></div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default UserRoleSelector;
