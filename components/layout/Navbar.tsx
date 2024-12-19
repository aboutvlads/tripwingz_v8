"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plane } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Plane className="h-6 w-6" />
            <span className="text-xl font-bold">tripwingz.</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/deals" className="nav-link">
              Deals
            </Link>
            <Link href="/how-it-works" className="nav-link">
              How It Works
            </Link>
            <Link href="/community" className="nav-link">
              Community
            </Link>
          </div>

          <Button className="button-primary">
            Join Waitlist
          </Button>
        </div>
      </div>
    </nav>
  );
}