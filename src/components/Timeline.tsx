import React, { useRef } from "react";
import { EventWithDateTime } from "../types/Event";
import EventCard from "./EventCard";

interface TimelineProps {
  events: EventWithDateTime[];
  onScrollToActiveRef?: (ref: React.RefObject<HTMLDivElement>) => void;
}

const Timeline: React.FC<TimelineProps> = ({ events, onScrollToActiveRef }) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  // Instead of a single ref, use an array of refs for all events
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Find the index of the first active event, or fallback logic
  const firstActiveIndex = events.findIndex((event) => event.isActive);
  let targetIndex = firstActiveIndex;
  if (targetIndex === -1) {
    // If no active, fallback to today
    targetIndex = events.findIndex(
      (event) => event.isToday && !events.some((e) => e.isActive)
    );
    if (targetIndex === -1) {
      // If no today, fallback to first future event
      targetIndex = events.findIndex(
        (event) => !event.isPast && !events.some((e) => e.isActive || e.isToday)
      );
    }
  }

  React.useEffect(() => {
    if (onScrollToActiveRef && targetIndex !== -1) {
      // Pass a ref to the parent for the correct event
      onScrollToActiveRef({ current: eventRefs.current[targetIndex] });
    }
  }, [onScrollToActiveRef, targetIndex, events]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div ref={timelineRef} className="relative">
        {events.map((event, index) => (
          <div
            key={`${event.date}-${event.time}-${index}`}
            ref={(el) => (eventRefs.current[index] = el)}
          >
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
