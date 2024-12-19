"use client";

import { AlertCircle } from "lucide-react";

export function DealDisclaimer() {
  return (
    <div className="flex items-start gap-2 text-xs text-gray-500 bg-gray-50/50 rounded-lg p-3">
      <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
      <p>
        Please note: All the information on this page is correct at the time of publication. 
        If you are checking out the deal at a later date, the price and the availability may 
        no longer be as advertised. Prices are subject to change.
      </p>
    </div>
  );
}