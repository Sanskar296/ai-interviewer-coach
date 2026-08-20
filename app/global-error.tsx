"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full p-8 rounded-2xl bg-white/5 border border-white/10 text-center shadow-xl backdrop-blur-md">
          <h2 className="text-2xl font-bold mb-4 text-red-400">Application Error</h2>
          <p className="text-gray-300 text-sm mb-6">
            An unexpected error occurred. Please try resetting the application state.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-medium text-white transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
