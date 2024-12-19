"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Edit2, Trash2, Search, Plus } from "lucide-react";
import type { FlightDeal } from "@/types/flight";

interface DealListProps {
  deals: FlightDeal[];
  onEdit: (deal: FlightDeal) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export function DealList({ deals, onEdit, onDelete, onAdd }: DealListProps) {
  const [search, setSearch] = useState("");

  const filteredDeals = deals.filter(deal => 
    deal.destination.toLowerCase().includes(search.toLowerCase()) ||
    deal.airline.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search deals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={onAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Deal
        </Button>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Destination</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Airline</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDeals.map((deal) => (
              <TableRow key={deal.id}>
                <TableCell className="font-medium">{deal.destination}</TableCell>
                <TableCell>{deal.price}</TableCell>
                <TableCell>{deal.airline}</TableCell>
                <TableCell>{deal.date}</TableCell>
                <TableCell>
                  {deal.isHot && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                      Hot Deal
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(deal)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(deal.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}