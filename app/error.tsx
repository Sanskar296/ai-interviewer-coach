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
    console.error("Page Error caught:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
      <div className="max-w-md w-full p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-4 text-rose-400">Something went wrong!</h2>
        <p className="text-gray-300 text-sm mb-6">
          {error.message || "An unexpected error occurred while loading this page."}
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-medium text-white transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
