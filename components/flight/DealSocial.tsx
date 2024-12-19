"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSocialInteractions } from "@/lib/hooks/use-social-interactions";
import { cn } from "@/lib/utils";

interface DealSocialProps {
  likes?: number;
}

export function DealSocial({ likes = 0 }: DealSocialProps) {
  const { isLiked, likes: currentLikes, handleLike } = useSocialInteractions(likes);

  return (
    <div onClick={e => e.stopPropagation()}>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleLike}
        className="flex items-center gap-1.5 p-1.5 h-auto text-sm hover:bg-transparent"
      >
        <Heart 
          className={cn(
            "h-4 w-4 transition-colors", 
            isLiked ? "fill-red-500 text-red-500" : "text-gray-500"
          )} 
        />
        <span className="text-gray-600">{currentLikes}</span>
      </Button>
    </div>
  );
}