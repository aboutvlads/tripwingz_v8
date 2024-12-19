"use client";

import { Calendar } from "lucide-react";

interface DealPricingProps {
  price: string;
  originalPrice: string;
  date: string;
}

export function DealPricing({ price, originalPrice, date }: DealPricingProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50 rounded-xl p-4">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-gray-400" />
        <div>
          <p className="text-sm text-gray-500">Travel Period</p>
          <p className="font-medium">{date}</p>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">Price per person</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">{price}</span>
          <span className="text-sm text-gray-400 line-through">
            {originalPrice}
          </span>
        </div>
      </div>
    </div>
  );
}