"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import type { FlightDeal } from "@/types/flight";
import { DealImage } from "@/components/flight/DealImage";
import { FlightRoute } from "@/components/flight/FlightRoute";
import { DealAmenities } from "@/components/flight/DealAmenities";
import { DealPricing } from "@/components/flight/DealPricing";
import { DealFinder } from "@/components/flight/DealFinder";
import { DealTags } from "@/components/flight/DealTags";
import { DealActions } from "@/components/flight/DealActions";

interface FlightDialogProps {
  deal: FlightDeal;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FlightDialog({ deal, open, onOpenChange }: FlightDialogProps) {
  const dealUrl = `https://tripwingz.com/deals/${deal.id}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 sm:p-0">
        <DialogTitle className="sr-only">
          Flight Deal Details for {deal.destination}
        </DialogTitle>
        
        <button 
          onClick={() => onOpenChange(false)}
          className="absolute right-4 sm:right-8 top-4 sm:top-8 z-50"
          aria-label="Close dialog"
        >
          <div className="bg-black/50 backdrop-blur-md rounded-full p-2 hover:bg-black/60 transition-colors">
            <X className="h-4 w-4 text-white" />
          </div>
        </button>
        
        <div className="space-y-6">
          <DealImage 
            image={deal.image}
            destination={deal.destination}
            discount={deal.discount}
            isHot={deal.isHot}
          />

          <div className="px-4 sm:px-6 space-y-4 sm:space-y-6">
            <DealPricing 
              price={deal.price}
              originalPrice={deal.originalPrice}
              date={deal.date}
            />

            <FlightRoute 
              departureTime={deal.departureTime}
              arrivalTime={deal.arrivalTime}
              from={deal.from}
              destination={deal.destination}
              duration={deal.duration}
            />

            <DealTags tags={deal.tags} />

            <DealFinder {...deal.dealFinder} />

            <DealAmenities amenities={deal.amenities} />

            <DealActions dealUrl={dealUrl} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}