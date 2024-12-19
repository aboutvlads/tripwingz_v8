"use client";

import { SortSelect } from "@/components/filters/SortSelect";
import type { SortOption } from "@/components/filters/SortSelect";

interface DealsHeaderProps {
  dealsCount: number;
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function DealsHeader({ dealsCount, currentSort, onSortChange }: DealsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <h2 className="text-xl sm:text-2xl font-semibold">
        Latest Deals
      </h2>
      <SortSelect
        currentSort={currentSort}
        onSortChange={onSortChange}
      />
    </div>
  );
}