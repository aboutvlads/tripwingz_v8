"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EditDealDialog } from "@/components/admin/EditDealDialog";
import { AlertDialog, AlertDialogContent, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Pencil, Trash2 } from "lucide-react";
import type { FlightDeal } from "@/types/flight";

interface DealRowProps {
  deal: FlightDeal;
  onDelete: (id: string) => void;
}

export function DealRow({ deal, onDelete }: DealRowProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/deals/${deal.id}`, {
        method: "DELETE"
      });
      
      if (res.ok) {
        onDelete(deal.id);
      }
    } catch (error) {
      console.error("Failed to delete deal:", error);
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <img 
            src={deal.image} 
            alt={deal.destination}
            className="h-12 w-12 rounded-lg object-cover"
          />
          <div>
            <h3 className="font-medium">{deal.destination}</h3>
            <p className="text-sm text-gray-500">{deal.price}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditDialogOpen(true)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <EditDealDialog
        deal={deal}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <h2 className="text-lg font-semibold">Delete Deal</h2>
          <p className="text-sm text-gray-500 mt-2">
            Are you sure you want to delete this deal? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-2 mt-4">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}