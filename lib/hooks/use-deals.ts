import { useState, useCallback } from 'react';
import type { FlightDeal } from '@/types/flight';
import { toast } from 'sonner';

export function useDeals() {
  const [deals, setDeals] = useState<FlightDeal[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const createDeal = useCallback(async (dealData: Partial<FlightDeal>) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dealData),
      });

      if (!response.ok) throw new Error('Failed to create deal');

      const newDeal = await response.json();
      setDeals(prev => [newDeal, ...prev]);
      toast.success('Deal created successfully');
      return newDeal;
    } catch (error) {
      toast.error('Failed to create deal');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateDeal = useCallback(async (id: string, dealData: Partial<FlightDeal>) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/deals/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dealData),
      });

      if (!response.ok) throw new Error('Failed to update deal');

      const updatedDeal = await response.json();
      setDeals(prev => prev.map(deal => 
        deal.id === id ? { ...deal, ...updatedDeal } : deal
      ));
      toast.success('Deal updated successfully');
      return updatedDeal;
    } catch (error) {
      toast.error('Failed to update deal');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteDeal = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/deals/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete deal');

      setDeals(prev => prev.filter(deal => deal.id !== id));
      toast.success('Deal deleted successfully');
    } catch (error) {
      toast.error('Failed to delete deal');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    deals,
    isLoading,
    createDeal,
    updateDeal,
    deleteDeal
  };
}