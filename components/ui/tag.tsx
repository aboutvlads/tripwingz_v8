"use client";

import { cn } from "@/lib/utils";
import type { TripTag } from "@/types/flight";

const tagStyles: Record<TripTag, { icon: string; color: string }> = {
  foodie: {
    icon: "🍽️",
    color: "bg-orange-100 text-orange-800 hover:bg-orange-200"
  },
  rave: {
    icon: "🎉",
    color: "bg-purple-100 text-purple-800 hover:bg-purple-200"
  },
  girlstrip: {
    icon: "👯‍♀️",
    color: "bg-pink-100 text-pink-800 hover:bg-pink-200"
  },
  date: {
    icon: "💕",
    color: "bg-red-100 text-red-800 hover:bg-red-200"
  },
  cartrip: {
    icon: "🚗",
    color: "bg-blue-100 text-blue-800 hover:bg-blue-200"
  },
  friends: {
    icon: "🤝",
    color: "bg-green-100 text-green-800 hover:bg-green-200"
  }
};

interface TagProps {
  tag: TripTag;
  selected?: boolean;
  size?: "sm" | "md";
}

export function Tag({ tag, selected, size = "md" }: TagProps) {
  const { icon, color } = tagStyles[tag];
  
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 font-medium transition-all",
        color,
        selected && "ring-2 ring-black ring-offset-2",
        size === "sm" ? "text-xs" : "text-sm",
        "transform hover:scale-105 active:scale-95 cursor-pointer"
      )}
    >
      <span className="text-base">{icon}</span>
      <span>#{tag}</span>
    </span>
  );
}