"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { airports } from "@/data/airports";

interface AirportSelectProps {
  onAirportChange: (code: string) => void;
  selectedAirport: string | null;
}

export function AirportSelect({ onAirportChange, selectedAirport }: AirportSelectProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
      <Select value={selectedAirport || ""} onValueChange={onAirportChange}>
        <SelectTrigger className="w-full h-12 pl-10">
          <SelectValue placeholder="Select departure airport..." />
        </SelectTrigger>
        <SelectContent>
          {airports.map((airport) => (
            <SelectItem key={airport.code} value={airport.code}>
              {airport.city}, {airport.country} ({airport.code})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}