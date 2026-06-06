"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-white mb-4">500</h1>
        <p className="text-white/60 mb-8">Something went wrong. We&apos;ve been notified and are looking into it.</p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors text-sm"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
