"use client";

import { Button } from "@/components/ui/button";
import { ShareButton } from "@/components/flight/ShareButton";
import { DealDisclaimer } from "@/components/flight/DealDisclaimer";

interface DealActionsProps {
  dealUrl: string;
}

export function DealActions({ dealUrl }: DealActionsProps) {
  return (
    <div className="space-y-3 pb-6">
      <Button 
        className="w-full bg-black text-white hover:bg-black/90 h-11 sm:h-12 text-base sm:text-lg"
        onClick={() => window.open(dealUrl, '_blank')}
      >
        Book Now
      </Button>
      <ShareButton dealUrl={dealUrl} />
      <DealDisclaimer />
    </div>
  );
}