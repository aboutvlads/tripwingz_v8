"use client";

import Link from "next/link";
import { Plane } from "lucide-react";

export function AdminNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/admin" className="flex items-center space-x-2">
            <Plane className="h-6 w-6" />
            <span className="text-xl font-bold">Admin Panel</span>
          </Link>
          
          <Link 
            href="/" 
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            View Site
          </Link>
        </div>
      </div>
    </nav>
  );
}