"use client";

import { useEffect } from "react";

export default function DashboardError({ error, reset }) {
  useEffect(() => {
    console.error("Dashboard Error:", error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white px-4">

      {/* Soft Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-100/40 blur-3xl" />

      <div
        className="
          relative
          w-full
          max-w-md
          rounded-3xl
          border border-gray-200/80
          bg-white/70
          p-8
          text-center
          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          backdrop-blur-2xl
          sm:p-10
        "
      >

        {/* Brand */}
        <div className="mb-8">
          <span className="text-lg font-bold tracking-tight text-black">
            ChatSupport
            <span className="text-blue-600">.AI</span>
          </span>
        </div>

        {/* Error Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 text-2xl shadow-sm">
          !
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Something went wrong
        </h1>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
          We could not load your dashboard right now.
          Please try again. Your account and data are safe.
        </p>

        {/* Retry */}
        <button
          type="button"
          onClick={() => reset()}
          className="
            mt-7
            w-full
            rounded-xl
            bg-black
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-gray-800
            active:scale-[0.98]
          "
        >
          Try Again
        </button>

        {/* Small Status */}
        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          Dashboard temporarily unavailable
        </div>

      </div>
    </div>
  );
}