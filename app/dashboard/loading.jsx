export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">

        {/* Top Header Skeleton */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200" />
            <div className="mt-3 h-4 w-72 animate-pulse rounded-md bg-gray-100" />
          </div>

          <div className="hidden h-10 w-24 animate-pulse rounded-xl bg-gray-100 sm:block" />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="
                rounded-2xl
                border border-gray-200/80
                bg-white/70
                p-5
                shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                backdrop-blur-xl
              "
            >
              <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />

              <div className="mt-4 h-8 w-20 animate-pulse rounded-lg bg-gray-200" />

              <div className="mt-3 h-3 w-32 animate-pulse rounded bg-gray-100" />
            </div>
          ))}
        </div>

        {/* Main Dashboard Sections */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Left Section */}
          <div
            className="
              min-h-70
              rounded-2xl
              border border-gray-200/80
              bg-white/70
              p-6
              shadow-[0_8px_30px_rgba(0,0,0,0.04)]
              backdrop-blur-xl
            "
          >
            <div className="h-5 w-40 animate-pulse rounded-md bg-gray-200" />

            <div className="mt-5 space-y-4">
              <div className="h-12 animate-pulse rounded-xl bg-gray-100" />
              <div className="h-12 animate-pulse rounded-xl bg-gray-100" />
              <div className="h-12 animate-pulse rounded-xl bg-gray-100" />
              <div className="h-12 animate-pulse rounded-xl bg-gray-100" />
            </div>
          </div>

          {/* Right Section */}
          <div
            className="
              min-h-70
              rounded-2xl
              border border-gray-200/80
              bg-white/70
              p-6
              shadow-[0_8px_30px_rgba(0,0,0,0.04)]
              backdrop-blur-xl
            "
          >
            <div className="h-5 w-44 animate-pulse rounded-md bg-gray-200" />

            <div className="mt-5 h-40 animate-pulse rounded-2xl bg-gray-100" />

            <div className="mt-5 flex gap-3">
              <div className="h-10 w-28 animate-pulse rounded-xl bg-gray-100" />
              <div className="h-10 w-28 animate-pulse rounded-xl bg-gray-100" />
            </div>
          </div>

        </div>

        {/* Bottom Loading Indicator */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-2 w-2 animate-bounce rounded-full bg-black [animation-delay:-0.3s]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.15s]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-300" />

          <span className="ml-2 text-sm text-gray-500">
            Loading your dashboard...
          </span>
        </div>

      </div>
    </div>
  );
}