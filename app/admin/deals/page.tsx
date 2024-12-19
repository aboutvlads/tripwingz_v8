"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { DealList } from "@/components/admin/deals/DealList";
import { DealForm } from "@/components/admin/deals/DealForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import type { FlightDeal } from "@/types/flight";

export default function DealsPage() {
  const [deals, setDeals] = useState<FlightDeal[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<FlightDeal | null>(null);

  const handleSubmit = async (dealData: Partial<FlightDeal>) => {
    try {
      if (editingDeal) {
        // Update existing deal
        const response = await fetch(`/api/deals/${editingDeal.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dealData),
        });

        if (!response.ok) throw new Error('Failed to update deal');

        setDeals(prev => prev.map(deal => 
          deal.id === editingDeal.id ? { ...deal, ...dealData } : deal
        ));
        toast.success('Deal updated successfully');
      } else {
        // Create new deal
        const response = await fetch('/api/deals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dealData),
        });

        if (!response.ok) throw new Error('Failed to create deal');

        const newDeal = await response.json();
        setDeals(prev => [newDeal, ...prev]);
        toast.success('Deal created successfully');
      }

      setIsFormOpen(false);
      setEditingDeal(null);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/deals/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete deal');

      setDeals(prev => prev.filter(deal => deal.id !== id));
      toast.success('Deal deleted successfully');
    } catch (error) {
      toast.error('Failed to delete deal');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Manage Deals</h1>
        
        <DealList
          deals={deals}
          onEdit={(deal) => {
            setEditingDeal(deal);
            setIsFormOpen(true);
          }}
          onDelete={handleDelete}
          onAdd={() => {
            setEditingDeal(null);
            setIsFormOpen(true);
          }}
        />

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingDeal ? 'Edit Deal' : 'Create New Deal'}
              </DialogTitle>
            </DialogHeader>
            <DealForm
              onSubmit={handleSubmit}
              initialData={editingDeal || undefined}
            />
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}