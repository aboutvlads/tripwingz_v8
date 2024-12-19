"use client";

import { useState } from "react";
import { DestinationSearch } from "@/components/search/DestinationSearch";
import { AirportSelect } from "@/components/search/AirportSelect";
import { SearchFilters } from "@/components/search/SearchFilters";

export function SearchBar() {
  const [selectedAirport, setSelectedAirport] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic here
  };

  const handleAirportChange = (code: string) => {
    setSelectedAirport(code || null);
    // Implement airport filter logic here
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DestinationSearch onSearch={handleSearch} />
        <AirportSelect 
          selectedAirport={selectedAirport} 
          onAirportChange={handleAirportChange}
        />
      </div>
      <div className="mt-4">
        <SearchFilters />
      </div>
    </div>
  );
}