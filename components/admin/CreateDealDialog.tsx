"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import type { FlightDeal } from "@/types/flight";

interface CreateDealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDealCreated: (deal: FlightDeal) => void;
}

export function CreateDealDialog({ open, onOpenChange, onDealCreated }: CreateDealDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    destination: "",
    image: "",
    price: "",
    originalPrice: "",
    date: "",
    stops: "1 stop",
    from: "",
    class: "Economy",
    airline: "",
    departureTime: "",
    arrivalTime: "",
    duration: "",
    baggage: "23 kg",
    amenities: ["Wi-Fi", "In-flight Meals", "Entertainment"],
    dealFinder: {
      name: "Lousson",
      bio: "Hey I'm Lousson. I love travel, my family, a good meal, and a good deal!",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
      deals: 127
    },
    tags: ["foodie", "friends"],
    isHot: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/deals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          discount: `${Math.round(((parseFloat(formData.originalPrice) - parseFloat(formData.price)) / parseFloat(formData.originalPrice)) * 100)}% off`
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create deal');
      }

      const deal = await res.json();
      onDealCreated(deal);
      onOpenChange(false);
      toast.success('Deal created successfully!');
      
      // Reset form
      setFormData({
        destination: "",
        image: "",
        price: "",
        originalPrice: "",
        date: "",
        stops: "1 stop",
        from: "",
        class: "Economy",
        airline: "",
        departureTime: "",
        arrivalTime: "",
        duration: "",
        baggage: "23 kg",
        amenities: ["Wi-Fi", "In-flight Meals", "Entertainment"],
        dealFinder: {
          name: "Lousson",
          bio: "Hey I'm Lousson. I love travel, my family, a good meal, and a good deal!",
          avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
          deals: 127
        },
        tags: ["foodie", "friends"],
        isHot: false
      });
    } catch (error) {
      console.error("Failed to create deal:", error);
      toast.error('Failed to create deal. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... rest of the component remains the same ...
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Deal</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields remain the same */}
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Deal'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}