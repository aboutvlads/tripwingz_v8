"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AdminHeaderProps {
  onCreateDeal: () => void;
}

export function AdminHeader({ onCreateDeal }: AdminHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Manage Deals</h1>
      <Button 
        onClick={onCreateDeal}
        className="bg-black text-white hover:bg-black/90"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add New Deal
      </Button>
    </div>
  );
}