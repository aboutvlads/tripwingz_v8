"use client";

import { Button } from "@/components/ui/button";

interface RegionSelectProps {
  selectedRegion: string;
  onRegionSelect: (region: string) => void;
}

export function RegionSelect({ selectedRegion, onRegionSelect }: RegionSelectProps) {
  return (
    <div className="text-center space-y-2">
      <h2 className="text-xl font-semibold">SELECT REGION:</h2>
      <Button
        variant="outline"
        onClick={() => onRegionSelect('EUROPE')}
        className="bg-white border-[#EAEAEA] text-black hover:bg-gray-50 space-x-2"
      >
        <span>EUROPE</span>
        <span>🇪🇺</span>
      </Button>
    </div>
  );
}