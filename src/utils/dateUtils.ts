import { Event, EventWithDateTime } from "../types/Event";

export const parseEventDateTime = (event: Event): Date => {
  const [year, month, day] = event.date.split("-").map(Number);

  // Parse time - handle various formats
  let hour = 0;
  let minute = 0;

  if (event.time.includes(":")) {
    const timeStr = event.time.split(" ")[0]; // Take first time if range
    const [h, m] = timeStr.split(":").map(Number);
    hour = h;
    minute = m || 0;
  }

  return new Date(year, month - 1, day, hour, minute);
};

export const processEvents = (events: Event[]): EventWithDateTime[] => {
  const now = new Date();

  return events.map((event) => {
    const dateTime = parseEventDateTime(event);
    const isPast = dateTime < now;
    const isToday = dateTime.toDateString() === now.toDateString();

    // An event is "active" if it's happening now (within 2 hours window)
    const timeDiff = Math.abs(now.getTime() - dateTime.getTime());
    const isActive = timeDiff <= 2 * 60 * 60 * 1000 && !isPast;

    return {
      ...event,
      dateTime,
      isPast,
      isToday,
      isActive,
    };
  });
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("it-IT", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatTime = (timeStr: string): string => {
  return timeStr;
};

export const getEventIcon = (eventName: string): string => {
  const name = eventName.toLowerCase();

  if (
    name.includes("concerto") ||
    name.includes("musicale") ||
    name.includes("band")
  )
    return "music";
  if (
    name.includes("teatro") ||
    name.includes("spettacolo") ||
    name.includes("cabaret")
  )
    return "drama";
  if (name.includes("danza") || name.includes("danzante")) return "dance";
  if (
    name.includes("sport") ||
    name.includes("calcio") ||
    name.includes("torneo")
  )
    return "trophy";
  if (name.includes("bambini") || name.includes("splash")) return "baby";
  if (
    name.includes("chiesa") ||
    name.includes("eucaristica") ||
    name.includes("processione")
  )
    return "church";
  if (name.includes("mostra") || name.includes("fotografica")) return "camera";
  if (name.includes("biblioteca") || name.includes("letture"))
    return "book-open";
  if (name.includes("cinema")) return "film";
  if (name.includes("matrimonio") || name.includes("coppie")) return "heart";
  if (name.includes("sagra")) return "ferris-wheel";

  return "calendar";
};
