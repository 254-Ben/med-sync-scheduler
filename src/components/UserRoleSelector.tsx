
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppointmentContext } from '../contexts/AppointmentContext';
import { Users, UserCheck, Shield } from 'lucide-react';

const UserRoleSelector: React.FC = () => {
  const { currentUser, setCurrentUser } = useAppointmentContext();

  const roles = [
    {
      type: 'patient' as const,
      title: 'Patient',
      description: 'Book appointments and manage your healthcare',
      icon: Users,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      hoverColor: 'hover:bg-emerald-100'
    },
    {
      type: 'doctor' as const,
      title: 'Doctor',
      description: 'Manage your schedule and patient appointments',
      icon: UserCheck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      type: 'admin' as const,
      title: 'Admin',
      description: 'Oversee clinic operations and analytics',
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      hoverColor: 'hover:bg-purple-100'
    }
  ];

  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Role</h2>
        <p className="text-gray-600">Select how you'd like to access the system</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {roles.map((role) => {
          const Icon = role.icon;
          const isActive = currentUser === role.type;
          return (
            <Card
              key={role.type}
              className={`cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                isActive 
                  ? `${role.borderColor} border-2 ${role.bgColor} shadow-md` 
                  : `border-gray-200 hover:border-gray-300 ${role.hoverColor}`
              }`}
              onClick={() => setCurrentUser(role.type)}
            >
              <CardContent className="p-6 text-center">
                <div className={`${isActive ? role.bgColor : 'bg-gray-50'} ${isActive ? role.color : 'text-gray-400'} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${isActive ? role.color : 'text-gray-900'}`}>
                  {role.title}
                </h3>
                <p className="text-sm text-gray-600">{role.description}</p>
                {isActive && (
                  <div className="mt-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${role.bgColor} ${role.color}`}>
                      Active
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default UserRoleSelector;
