import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Stats from "./components/Stats";
import QuickNavigation from "./components/QuickNavigation";
import Timeline from "./components/Timeline";
import InstallPrompt from "./components/InstallPrompt";
import { processEvents } from "./utils/dateUtils";
import { EventWithDateTime } from "./types/Event";
import eventsData from "./data/events.json";

function App() {
  const [events, setEvents] = useState<EventWithDateTime[]>([]);
  const activeEventRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const processedEvents = processEvents(eventsData);
    setEvents(processedEvents);

    // Update events every minute to keep the timeline current
    const interval = setInterval(() => {
      const updatedEvents = processEvents(eventsData);
      setEvents(updatedEvents);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const scrollToActiveEvent = () => {
    if (activeEventRef.current) {
      activeEventRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
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
        <Stats events={events} />
        <QuickNavigation
          events={events}
          onScrollToActive={scrollToActiveEvent}
        />
        <Timeline
          events={events}
          onScrollToActiveRef={handleScrollToActiveRef}
        />
        <InstallPrompt />

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
              App realizzata da{" "}
              <a
                href="https://www.linkedin.com/in/rosarioterranova/"
                target="_blank"
                className="text-blue-100 hover:text-white transition-colors underline"
              >
                Rosario Terranova
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
