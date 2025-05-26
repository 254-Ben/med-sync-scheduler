
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      color: 'text-blue-600'
    },
    {
      type: 'doctor' as const,
      title: 'Doctor',
      description: 'Manage your schedule and patient appointments',
      icon: UserCheck,
      color: 'text-green-600'
    },
    {
      type: 'admin' as const,
      title: 'Admin',
      description: 'Oversee clinic operations and analytics',
      icon: Shield,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="mb-6">
      <div className="flex gap-4 justify-center">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <Button
              key={role.type}
              variant={currentUser === role.type ? "default" : "outline"}
              onClick={() => setCurrentUser(role.type)}
              className="flex items-center gap-2 px-4 py-2"
            >
              <Icon className={`h-4 w-4 ${currentUser === role.type ? 'text-white' : role.color}`} />
              {role.title}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default UserRoleSelector;
