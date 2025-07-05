export interface Event {
  date: string;
  time: string;
  name: string;
  place: string;
}

export interface EventWithDateTime extends Event {
  dateTime: Date;
  isPast: boolean;
  isToday: boolean;
  isActive: boolean;
  isFuture: boolean;
}