import React, { createContext, useContext, useState } from "react";

type EmergencyEvent = {
  id: string;
  type: string;
  message: string;
  timestamp: number;
};


type EmergencyTimelineContextType = {
  events: EmergencyEvent[];
  logEvent: (type: string, message: string) => void;
};


const EmergencyTimelineContext =
  createContext<EmergencyTimelineContextType | null>(null);


export const EmergencyTimelineProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [events, setEvents] = useState<EmergencyEvent[]>([]);

  
  const logEvent = (type: string, message: string) => {
    const newEvent: EmergencyEvent = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: Date.now(),
    };

    setEvents((prev) => [...prev, newEvent]);
  };

  return (
    <EmergencyTimelineContext.Provider value={{ events, logEvent }}>
      {children}
    </EmergencyTimelineContext.Provider>
  );
};


export const useEmergencyTimeline = () => {
  const context = useContext(EmergencyTimelineContext);

  if (!context) {
    throw new Error(
      "useEmergencyTimeline must be used inside EmergencyTimelineProvider"
    );
  }

  return context;
};
