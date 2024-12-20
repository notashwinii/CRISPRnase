
import * as React from "react"
import { Dna } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Dna className="w-8 h-8 text-primary" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
      </div>
      <span className="text-xl font-bold">
        CRISPR<span className="text-blue-500">nase</span>
      </span>
    </div>
  );
}


