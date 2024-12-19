"use client";

interface DealFinderProps {
  name: string;
  bio: string;
  avatar: string;
  deals: number;
}

export function DealFinder({ name, bio, avatar }: DealFinderProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="flex items-center gap-3">
        <img
          src={avatar}
          alt={name}
          className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover"
        />
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-500">{bio}</p>
        </div>
      </div>
    </div>
  );
}