import React from 'react';
import { Play, Calendar, Clock } from 'lucide-react';
import { EventWithDateTime } from '../types/Event';

interface QuickNavigationProps {
  events: EventWithDateTime[];
  onScrollToActive: () => void;
}

const QuickNavigation: React.FC<QuickNavigationProps> = ({ events, onScrollToActive }) => {
  const activeEvent = events.find(event => event.isActive);
  const todayEvents = events.filter(event => event.isToday);
  const nextEvent = events.find(event => !event.isPast && !event.isActive);

  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          {/* Vai all'evento in corso */}
          {activeEvent && (
            <button
              onClick={onScrollToActive}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse"
            >
              <Play className="w-5 h-5 mr-2 fill-current" />
              Vai all'evento in corso
            </button>
          )}
          
          {/* Eventi di oggi */}
          {!activeEvent && todayEvents.length > 0 && (
            <button
              onClick={onScrollToActive}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Vai agli eventi di oggi ({todayEvents.length})
            </button>
          )}
          
          {/* Prossimi eventi */}
          {!activeEvent && todayEvents.length === 0 && nextEvent && (
            <button
              onClick={onScrollToActive}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Clock className="w-5 h-5 mr-2" />
              Vai ai prossimi eventi
            </button>
          )}
          
          {/* Info aggiuntiva */}
          <div className="text-sm text-gray-600 text-center sm:text-left">
            {activeEvent && (
              <span className="text-orange-600 font-medium">
                🔴 In corso: {activeEvent.name.substring(0, 50)}...
              </span>
            )}
            {!activeEvent && todayEvents.length > 0 && (
              <span className="text-blue-600 font-medium">
                📅 {todayEvents.length} eventi oggi
              </span>
            )}
            {!activeEvent && todayEvents.length === 0 && nextEvent && (
              <span className="text-gray-600">
                ⏰ Prossimo: {nextEvent.dateTime.toLocaleDateString('it-IT', { 
                  day: 'numeric', 
                  month: 'short' 
                })}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickNavigation;