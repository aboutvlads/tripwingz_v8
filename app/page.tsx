"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { FlightCard } from "@/components/FlightCard";
import { SuggestDealSection } from "@/components/SuggestDealSection";
import { FiltersSection } from "@/components/filters/FiltersSection";
import { DealsHeader } from "@/components/deals/DealsHeader";
import type { TripTag, FlightDeal } from "@/types/flight";
import type { SortOption } from "@/components/filters/SortSelect";
import { flightDeals } from "@/data/flightDeals";
import { sortDealsBy } from "@/lib/utils/sorting";

export default function Home() {
  const [selectedTags, setSelectedTags] = useState<TripTag[]>([]);
  const [currentSort, setCurrentSort] = useState<SortOption>("latest");

  const handleTagSelect = (tag: TripTag) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredDeals = sortDealsBy(
    flightDeals.filter(deal => 
      selectedTags.length === 0 || 
      selectedTags.some(tag => deal.tags.includes(tag))
    ),
    currentSort
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            <FiltersSection 
              selectedTags={selectedTags}
              onTagSelect={handleTagSelect}
            />

            <div className="space-y-6">
              <DealsHeader 
                dealsCount={filteredDeals.length}
                currentSort={currentSort}
                onSortChange={setCurrentSort}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDeals.map((deal) => (
                  <FlightCard key={deal.id} deal={deal} />
                ))}
              </div>
            </div>

            <SuggestDealSection />
          </div>
        </div>
      </div>
    </div>
  );
}