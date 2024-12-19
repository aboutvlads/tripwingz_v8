"use client";

import { Wifi, Coffee, Tv, Usb } from "lucide-react";

const amenityIcons: Record<string, any> = {
  "Wi-Fi": Wifi,
  "In-flight Meals": Coffee,
  "Entertainment": Tv,
  "USB Power": Usb,
};

interface DealAmenitiesProps {
  amenities: string[];
}

export function DealAmenities({ amenities }: DealAmenitiesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {amenities.map((amenity) => {
        const IconComponent = amenityIcons[amenity] || Coffee;
        return (
          <div
            key={amenity}
            className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full text-sm"
          >
            <IconComponent className="h-3.5 w-3.5 text-gray-500" />
            {amenity}
          </div>
        );
      })}
    </div>
  );
}