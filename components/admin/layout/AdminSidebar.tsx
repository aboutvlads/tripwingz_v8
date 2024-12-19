"use client";

import Link from "next/link";
import { 
  LayoutDashboard, 
  PlaneTakeoff, 
  Users, 
  Settings,
  LogOut 
} from "lucide-react";

export function AdminSidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: PlaneTakeoff, label: "Deals", href: "/admin/deals" },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  return (
    <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white border-r p-6">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-6 left-6 right-6">
        <button className="flex items-center space-x-2 px-4 py-2 w-full text-red-600 hover:bg-red-50 rounded-lg">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}