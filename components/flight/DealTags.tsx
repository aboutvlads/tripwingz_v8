"use client";

import { Tag } from "@/components/ui/tag";
import type { TripTag } from "@/types/flight";

interface DealTagsProps {
  tags: TripTag[];
}

export function DealTags({ tags }: DealTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
    </div>
  );
}