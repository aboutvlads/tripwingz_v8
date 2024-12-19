"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type SortOption = "latest" | "price-asc" | "price-desc";

interface SortSelectProps {
  onSortChange: (sort: SortOption) => void;
  currentSort: SortOption;
}

export function SortSelect({ onSortChange, currentSort }: SortSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: "latest", label: "Latest" },
    { value: "price-asc", label: "Price (low to high)" },
    { value: "price-desc", label: "Price (high to low)" },
  ];

  const currentLabel = sortOptions.find(opt => opt.value === currentSort)?.label;

  return (
    <div className="relative z-10">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="bg-white border-[#EAEAEA] text-black w-full sm:w-[200px] justify-between hover:bg-gray-50"
          >
            Sort by {currentLabel}
            <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-[200px] bg-white border border-[#EAEAEA] shadow-lg rounded-md mt-1"
        >
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => {
                onSortChange(option.value as SortOption);
                setIsOpen(false);
              }}
              className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50 focus:text-black"
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}