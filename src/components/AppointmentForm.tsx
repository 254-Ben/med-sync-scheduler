
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useAppointmentContext } from '../contexts/AppointmentContext';
import { reasonOptions } from '../data/sampleData';
import { toast } from '@/hooks/use-toast';

interface AppointmentFormProps {
  onClose: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onClose }) => {
  const { doctors, selectedDoctorId, addAppointment, addPatient } = useAppointmentContext();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    date: '',
    time: '',
    reason: '',
    customReason: '',
    isUrgent: false
  });

  const selectedDoctor = doctors.find(d => d.id === selectedDoctorId);

  const generateTimeSlots = () => {
    if (!selectedDoctor) return [];
    
    const slots = [];
    const start = parseInt(selectedDoctor.workingHours.start.split(':')[0]);
    const end = parseInt(selectedDoctor.workingHours.end.split(':')[0]);
    const breakStart = selectedDoctor.workingHours.breakStart;
    const breakEnd = selectedDoctor.workingHours.breakEnd;
    
    for (let hour = start; hour < end; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        // Skip break time
        if (timeString >= breakStart && timeString < breakEnd) continue;
        
        slots.push(timeString);
      }
    }
    
    return slots;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDoctorId || !formData.name || !formData.phone || !formData.date || !formData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Add patient
    const patientId = addPatient({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      age: parseInt(formData.age) || 0
    });

    // Add appointment
    addAppointment({
      patientId,
      doctorId: selectedDoctorId,
      date: formData.date,
      time: formData.time,
      duration: formData.isUrgent ? 45 : 30,
      reason: formData.reason === 'Other' ? formData.customReason : formData.reason,
      status: 'scheduled',
      isUrgent: formData.isUrgent
    });

    toast({
      title: "Appointment Booked!",
      description: `Your appointment with ${selectedDoctor?.name} has been scheduled for ${formData.date} at ${formData.time}.`,
    });

    onClose();
  };

  if (!selectedDoctor) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <p className="text-center text-gray-600">Please select a doctor first.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-blue-800">
          Book Appointment with {selectedDoctor.name}
        </CardTitle>
        <p className="text-sm text-gray-600">{selectedDoctor.specialization}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Preferred Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div>
              <Label htmlFor="time">Preferred Time *</Label>
              <Select onValueChange={(value) => setFormData({...formData, time: value})} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {generateTimeSlots().map(time => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="reason">Reason for Visit</Label>
            <Select onValueChange={(value) => setFormData({...formData, reason: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                {reasonOptions.map(reason => (
                  <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.reason === 'Other' && (
            <div>
              <Label htmlFor="customReason">Please specify</Label>
              <Input
                id="customReason"
                value={formData.customReason}
                onChange={(e) => setFormData({...formData, customReason: e.target.value})}
                placeholder="Describe your reason for visit"
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="urgent"
              checked={formData.isUrgent}
              onCheckedChange={(checked) => setFormData({...formData, isUrgent: !!checked})}
            />
            <Label htmlFor="urgent" className="text-sm">
              This is an urgent appointment (requires longer time slot)
            </Label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">Book Appointment</Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AppointmentForm;
