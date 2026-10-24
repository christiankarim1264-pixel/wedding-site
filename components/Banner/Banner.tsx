"use client";

import { useState } from "react";

export default function Banner() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="flex items-center justify-center gap-4 bg-[#87CEEB] px-4 py-2 text-sm text-background font-main w-screen relative">
      <p className='max-[600px]:text-center'>Site made by Christian.</p>
      <button
        onClick={() => setOpen(false)}
        aria-label="Close banner"
        className="cursor-pointer text-lg leading-none absolute right-4 top-1/2 -translate-y-1/2"
      >
        ×
      </button>
    </div>
  );
}