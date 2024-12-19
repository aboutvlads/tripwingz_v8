"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

export function SuggestDealSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dealDescription, setDealDescription] = useState("");

  const handleSubmit = () => {
    // Here you would implement the logic to submit the deal
    console.log("Deal submitted:", dealDescription);
    setDealDescription("");
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-8 text-center my-8">
        <h2 className="text-2xl font-semibold mb-4">
          Found an amazing flight deal? Share it with the community! ✈️💸
        </h2>
        <p className="text-gray-600 mb-6">
          Help fellow travelers save big by submitting deals you&apos;ve discovered online. Together, we can make travel more affordable for everyone!
        </p>
        <Button 
          size="lg" 
          className="bg-black text-white hover:bg-black/90"
          onClick={() => setIsDialogOpen(true)}
        >
          Suggest Deal
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          
          <DialogHeader>
            <DialogTitle>Suggest a Flight Deal</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Describe the deal (include departure city, destination, price, dates, and any other relevant details)"
              value={dealDescription}
              onChange={(e) => setDealDescription(e.target.value)}
              className="min-h-[150px]"
            />
            <Button 
              className="w-full bg-black text-white hover:bg-black/90" 
              onClick={handleSubmit}
            >
              Submit Deal
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}