"use client";

import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { 
  PlaneTakeoff, 
  Users, 
  TrendingUp, 
  DollarSign 
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      label: "Total Deals",
      value: "156",
      icon: PlaneTakeoff,
      trend: "+12%",
      trendUp: true
    },
    {
      label: "Active Users",
      value: "2,845",
      icon: Users,
      trend: "+5%",
      trendUp: true
    },
    {
      label: "Conversion Rate",
      value: "3.2%",
      icon: TrendingUp,
      trend: "-0.4%",
      trendUp: false
    },
    {
      label: "Revenue",
      value: "$12,426",
      icon: DollarSign,
      trend: "+18%",
      trendUp: true
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6">
              <div className="flex items-center justify-between">
                <div className="bg-black/5 p-3 rounded-lg">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className={`text-sm ${
                  stat.trendUp ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <p className="text-sm text-gray-600">
                    New deal added: Paris Summer Getaway
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Popular Destinations</h2>
            <div className="space-y-4">
              {[
                { city: "Paris", bookings: "234" },
                { city: "London", bookings: "189" },
                { city: "Rome", bookings: "156" }
              ].map((dest) => (
                <div key={dest.city} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{dest.city}</span>
                  <span className="text-sm font-medium">{dest.bookings} bookings</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}