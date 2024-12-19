"use client";

import { useState } from 'react';

export function useSocialInteractions(initialLikes: number = 0) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => {
    if (isLiked) {
      setLikes(prev => prev - 1);
    } else {
      setLikes(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  return {
    isLiked,
    likes,
    handleLike
  };
}