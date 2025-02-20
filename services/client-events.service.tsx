// src/services/client-event.service.tsx

import eventData from "@/assets/data/event-data.json"; // Ensure event-data.json is placed in the correct directory

export const fetchEventData = async (): Promise<typeof eventData> => {
  // Simulating an async HTTP request (e.g., using fetch or axios)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(eventData);
    }, 100); // Simulated delay for the async fetch
  });
};
