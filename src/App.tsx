import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import QuickNavigation from "./components/QuickNavigation";
import Timeline from "./components/Timeline";
import { processEvents } from "./utils/dateUtils";
import { EventWithDateTime } from "./types/Event";
import eventsData from "./data/events.json";

function App() {
  const [events, setEvents] = useState<EventWithDateTime[]>(
    processEvents(eventsData)
  );
  const activeEventRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update events every minute to keep the timeline current
    const interval = setInterval(() => {
      const updatedEvents = processEvents(eventsData);
      setEvents(updatedEvents);
    }, 1000 * 60); // 1 minute

    return () => clearInterval(interval);
  }, []);

  const scrollToActiveEvent = () => {
    if (activeEventRef.current) {
      const element = activeEventRef.current;
      const rect = element.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      // Offset in pixels (e.g., 350px)
      const offset = 350;
      window.scrollTo({
        top: rect.top + scrollTop - offset,
        behavior: "smooth",
      });
    }
  };

  const handleScrollToActiveRef = (ref: React.RefObject<HTMLDivElement>) => {
    activeEventRef.current = ref.current;
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Background pattern from the image */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url('ramacca-background.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "grayscale(100%) contrast(150%)",
        }}
      />

      <div className="relative z-10">
        <Header />
        <QuickNavigation
          events={events}
          onScrollToActive={scrollToActiveEvent}
        />
        <Timeline
          events={events}
          onScrollToActiveRef={handleScrollToActiveRef}
        />

        {/* Footer */}
        <footer className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white py-8 mt-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-4">
              <div>
                <p className="font-semibold">
                  Estate Ramacchese 2025 • Comune di Ramacca
                </p>
                <p className="text-sm text-pink-100 mt-1">
                  Aggiornato in tempo reale • Dal 27 Giugno al 19 Ottobre
                </p>
              </div>
            </div>
            <div className="text-xs text-pink-200">
              App realizzata dalla redazione di{" "}
              <a
                href="https://www.ramaccanews.it/"
                target="_blank"
                className="text-blue-100 hover:text-white transition-colors underline"
              >
                Ramacca News
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
