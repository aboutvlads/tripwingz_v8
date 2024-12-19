"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonProps {
  dealUrl: string;
}

export function ShareButton({ dealUrl }: ShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this flight deal!',
          text: 'I found an amazing flight deal on TripWingz',
          url: dealUrl
        });
      } catch (err) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(dealUrl);
    toast.success('Link copied to clipboard!');
  };

  return (
    <Button
      variant="outline"
      className="w-full bg-white text-black border-[#EAEAEA] hover:bg-gray-50"
      onClick={handleShare}
    >
      <Share2 className="mr-2 h-4 w-4" />
      Share Deal
    </Button>
  );
}