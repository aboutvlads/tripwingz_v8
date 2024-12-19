"use client";

import { useEffect } from "react";
import { DealRow } from "@/components/admin/DealRow";
import type { FlightDeal } from "@/types/flight";

interface DealsListProps {
  deals: FlightDeal[];
  onDealsChange: (deals: FlightDeal[]) => void;
}

export function DealsList({ deals, onDealsChange }: DealsListProps) {
  useEffect(() => {
    fetch("/api/deals")
      .then(res => res.json())
      .then(data => onDealsChange(data))
      .catch(console.error);
  }, [onDealsChange]);

  if (deals.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border">
        <p className="text-gray-500">No deals found. Create your first deal!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border divide-y">
      {deals.map((deal) => (
        <DealRow 
          key={deal.id} 
          deal={deal}
          onDelete={(id) => {
            onDealsChange(deals.filter(d => d.id !== id));
          }}
        />
      ))}
    </div>
  );
}