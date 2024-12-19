"use client";

import { Button } from "@/components/ui/button";

export function SearchFilters() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex space-x-4">
        <span className="text-sm text-gray-600">Any time</span>
        <span className="text-sm text-gray-600">Cabin: Any</span>
      </div>
      <div className="flex items-center">
        <span className="text-sm text-gray-600 mr-2">Price</span>
        <Button variant="ghost" size="sm">↓</Button>
      </div>
    </div>
  );
}