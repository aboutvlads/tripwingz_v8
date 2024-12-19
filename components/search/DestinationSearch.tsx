"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DestinationSearchProps {
  onSearch: (query: string) => void;
}

export function DestinationSearch({ onSearch }: DestinationSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <Input
        className="pl-10 h-12"
        placeholder="Search destinations..."
        type="text"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}