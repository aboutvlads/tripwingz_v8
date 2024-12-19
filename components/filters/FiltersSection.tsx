"use client";

import { TripTags } from "@/components/filters/TripTags";
import type { TripTag } from "@/types/flight";

interface FiltersSectionProps {
  selectedTags: TripTag[];
  onTagSelect: (tag: TripTag) => void;
}

export function FiltersSection({ selectedTags, onTagSelect }: FiltersSectionProps) {
  return (
    <div className="bg-white rounded-xl border border-[#EAEAEA] p-8">
      <TripTags
        selectedTags={selectedTags}
        onTagSelect={onTagSelect}
      />
    </div>
  );
}