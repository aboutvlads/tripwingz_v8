"use client";

import { Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-50">
      <div className="flex items-center justify-between h-full px-8">
        <div className="flex items-center space-x-2">
          <Plane className="h-6 w-6" />
          <span className="text-xl font-bold">TripWingz Admin</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => window.open("/", "_blank")}>
            View Site
          </Button>
        </div>
      </div>
    </header>
  );
}