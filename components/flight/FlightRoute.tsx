"use client";

import { Plane } from "lucide-react";

interface FlightRouteProps {
  departureTime: string;
  arrivalTime: string;
  from: string;
  destination: string;
  duration: string;
}

export function FlightRoute({ departureTime, arrivalTime, from, destination, duration }: FlightRouteProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-center sm:text-left w-full sm:w-auto">
          <p className="text-xl sm:text-2xl font-bold">{departureTime}</p>
          <p className="text-gray-500">{from}</p>
        </div>
        <div className="w-full sm:flex-1 px-4">
          <div className="relative flex items-center justify-center">
            <div className="border-t border-gray-300 w-full" />
            <div className="absolute">
              <Plane className="h-5 w-5 text-gray-400 transform rotate-90" />
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">
            {duration}
          </p>
        </div>
        <div className="text-center sm:text-right w-full sm:w-auto">
          <p className="text-xl sm:text-2xl font-bold">{arrivalTime}</p>
          <p className="text-gray-500">{destination}</p>
        </div>
      </div>
    </div>
  );
}