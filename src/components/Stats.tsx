import React from 'react';
import { Calendar, CheckCircle, Clock, Star } from 'lucide-react';
import { EventWithDateTime } from '../types/Event';

interface StatsProps {
  events: EventWithDateTime[];
}

const Stats: React.FC<StatsProps> = ({ events }) => {
  const totalEvents = events.length;
  const pastEvents = events.filter(e => e.isPast).length;
  const todayEvents = events.filter(e => e.isToday).length;
  const activeEvents = events.filter(e => e.isActive).length;
  
  return (
    <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 border-b border-pink-100">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl mx-auto mb-2 shadow-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{totalEvents}</div>
            <div className="text-sm text-gray-600 font-medium">Eventi totali</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl mx-auto mb-2 shadow-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{pastEvents}</div>
            <div className="text-sm text-gray-600 font-medium">Completati</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl mx-auto mb-2 shadow-lg">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{todayEvents}</div>
            <div className="text-sm text-gray-600 font-medium">Oggi</div>
          </div>
          
          <div className="text-center">
            <div className={`flex items-center justify-center w-12 h-12 rounded-xl mx-auto mb-2 shadow-lg ${
              activeEvents > 0 
                ? 'bg-gradient-to-br from-pink-500 to-purple-600 animate-pulse' 
                : 'bg-gradient-to-br from-gray-400 to-gray-500'
            }`}>
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{activeEvents}</div>
            <div className="text-sm text-gray-600 font-medium">In corso</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;