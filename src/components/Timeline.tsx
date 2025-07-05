import React, { useRef } from "react";
import { EventWithDateTime } from "../types/Event";
import EventCard from "./EventCard";

interface TimelineProps {
  events: EventWithDateTime[];
  onScrollToActiveRef?: (ref: React.RefObject<HTMLDivElement>) => void;
}

const Timeline: React.FC<TimelineProps> = ({ events, onScrollToActiveRef }) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const activeEventRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Pass the scroll function to parent
    if (onScrollToActiveRef) {
      onScrollToActiveRef(activeEventRef);
    }
  }, [onScrollToActiveRef]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div ref={timelineRef} className="relative">
        {events.map((event, index) => {
          const isTargetEvent =
            event.isActive ||
            (event.isToday && !events.some((e) => e.isActive)) ||
            (!event.isPast && !events.some((e) => e.isActive || e.isToday));

          return (
            <div
              key={`${event.date}-${event.time}-${index}`}
              ref={
                isTargetEvent && !activeEventRef.current ? activeEventRef : null
              }
            >
              <EventCard event={event} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
