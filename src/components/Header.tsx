
import React from 'react';
import { Heart, Clock, Calendar, Shield } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-teal-600 via-teal-700 to-blue-800 text-white shadow-xl border-b-4 border-teal-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Heart className="h-8 w-8 text-white animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-teal-300 rounded-full animate-ping"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-teal-100 bg-clip-text text-transparent">
                MediCare Connect
              </h1>
              <p className="text-teal-100 text-sm font-medium">Secure • Innovative • Reliable</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-2 bg-white bg-opacity-10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Shield className="h-5 w-5 text-teal-200" />
              <span className="text-sm font-medium">HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-2 bg-white bg-opacity-10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Clock className="h-5 w-5 text-teal-200" />
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2 bg-white bg-opacity-10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Calendar className="h-5 w-5 text-teal-200" />
              <span className="text-sm font-medium">Smart Booking</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
