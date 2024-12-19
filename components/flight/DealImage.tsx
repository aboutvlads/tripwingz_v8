"use client";

import { MapPin, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DealImageProps {
  image: string;
  destination: string;
  discount: string;
  isHot?: boolean;
}

export function DealImage({ image, destination, discount, isHot }: DealImageProps) {
  return (
    <div className="relative h-[250px] sm:h-[350px] mx-3 sm:mx-4 mt-3 sm:mt-4">
      <img
        src={image}
        alt={destination}
        className="w-full h-full object-cover rounded-2xl shadow-lg"
        style={{
          objectPosition: "center 60%"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-2xl" />
      
      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div className="text-white">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 sm:h-5 w-4 sm:w-5" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-wide">{destination}</h2>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-green-400/90 text-black font-medium backdrop-blur-md py-1 px-2.5 text-sm">
              {discount}
            </Badge>
            {isHot && (
              <Badge className="bg-red-400/90 text-black font-medium flex items-center gap-1 backdrop-blur-md py-1 px-2.5 text-sm">
                <Flame className="h-3.5 w-3.5" />
                HOT DEAL
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}