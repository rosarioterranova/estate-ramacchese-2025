import React from "react";
import {
  Music,
  Drama,
  Trophy,
  Baby,
  Church,
  Camera,
  BookOpen,
  Film,
  Heart,
  Calendar,
  MapPin,
  Clock,
  FerrisWheel,
} from "lucide-react";
import { EventWithDateTime } from "../types/Event";
import { formatDate, formatTime, getEventIcon } from "../utils/dateUtils";

interface EventCardProps {
  event: EventWithDateTime;
  isLast: boolean;
}

const iconMap = {
  music: Music,
  drama: Drama,
  dance: Drama,
  trophy: Trophy,
  baby: Baby,
  church: Church,
  camera: Camera,
  "book-open": BookOpen,
  film: Film,
  heart: Heart,
  calendar: Calendar,
  "ferris-wheel": FerrisWheel,
};

const EventCard: React.FC<EventCardProps> = ({ event, isLast }) => {
  const IconComponent =
    iconMap[getEventIcon(event.name) as keyof typeof iconMap] || Calendar;

  return (
    <div className="relative flex items-start group">
      {/* Timeline line */}
      {!isLast && (
        <div
          className={`absolute left-6 top-12 w-0.5 h-full transition-colors duration-300 ${
            event.isPast
              ? "bg-gradient-to-b from-green-400 to-green-300"
              : "bg-gradient-to-b from-gray-200 to-gray-100"
          }`}
        />
      )}

      {/* Timeline dot */}
      <div
        className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
          event.isActive
            ? "bg-gradient-to-br from-pink-500 to-purple-600 border-pink-200 shadow-lg shadow-pink-300 animate-pulse"
            : event.isPast
            ? "bg-gradient-to-br from-green-500 to-emerald-600 border-green-200"
            : event.isToday
            ? "bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-200 shadow-lg shadow-blue-200"
            : "bg-white border-gray-300 shadow-sm"
        }`}
      >
        <IconComponent
          className={`w-5 h-5 ${
            event.isActive || event.isPast || event.isToday
              ? "text-white"
              : "text-gray-600"
          }`}
        />
      </div>

      {/* Event card */}
      <div
        className={`ml-6 mb-8 flex-1 transition-all duration-300 ${
          event.isActive ? "transform scale-105" : ""
        }`}
      >
        <div
          className={`bg-white rounded-xl shadow-md border-l-4 p-6 hover:shadow-lg transition-all duration-300 ${
            event.isActive
              ? "border-pink-500 shadow-lg shadow-pink-100 bg-gradient-to-r from-pink-50 to-purple-50"
              : event.isPast
              ? "border-green-500 bg-green-50"
              : event.isToday
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          {/* Date and time */}
          <div className="flex flex-wrap items-center gap-4 mb-3 text-sm">
            <div
              className={`flex items-center ${
                event.isActive
                  ? "text-pink-700"
                  : event.isToday
                  ? "text-blue-700"
                  : "text-gray-600"
              }`}
            >
              <Calendar className="w-4 h-4 mr-1" />
              <span className="font-medium">{formatDate(event.dateTime)}</span>
            </div>
            <div
              className={`flex items-center ${
                event.isActive
                  ? "text-pink-700"
                  : event.isToday
                  ? "text-blue-700"
                  : "text-gray-600"
              }`}
            >
              <Clock className="w-4 h-4 mr-1" />
              <span className="font-medium">{formatTime(event.time)}</span>
            </div>
          </div>

          {/* Event name */}
          <h3
            className={`text-lg font-semibold mb-3 leading-tight ${
              event.isActive
                ? "text-pink-800"
                : event.isToday
                ? "text-blue-800"
                : "text-gray-800"
            }`}
          >
            {event.name}
          </h3>

          {/* Location */}
          {event.place && (
            <div
              className={`flex items-start ${
                event.isActive
                  ? "text-pink-700"
                  : event.isToday
                  ? "text-blue-700"
                  : "text-gray-600"
              }`}
            >
              <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm font-medium">{event.place}</span>
            </div>
          )}

          {/* Status badges */}
          {event.isActive && (
            <div className="mt-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md animate-pulse">
                🔴 IN CORSO ORA
              </span>
            </div>
          )}

          {event.isToday && !event.isActive && !event.isPast && (
            <div className="mt-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
                📅 OGGI
              </span>
            </div>
          )}

          {event.isPast && (
            <div className="mt-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ✅ Completato
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
