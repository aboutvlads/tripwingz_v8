"use client";

import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import type { TripTag } from "@/types/flight";

interface TripTagsProps {
  onTagSelect: (tag: TripTag) => void;
  selectedTags: TripTag[];
}

const TRIP_TAGS: TripTag[] = [
  'foodie',
  'rave',
  'girlstrip',
  'date',
  'cartrip',
  'friends'
];

export function TripTags({ onTagSelect, selectedTags }: TripTagsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        What&apos;s your vibe? ✨
      </h2>
      <div className="flex flex-wrap gap-3 justify-center">
        {TRIP_TAGS.map((tag) => (
          <Button
            key={tag}
            variant="ghost"
            onClick={() => onTagSelect(tag)}
            className="rounded-full p-0 h-auto hover:bg-transparent"
          >
            <Tag tag={tag} selected={selectedTags.includes(tag)} />
          </Button>
        ))}
      </div>
    </div>
  );
}