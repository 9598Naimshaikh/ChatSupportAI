import Link from "next/link";

export default function DashboardNotFound() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white px-4">

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-16 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" />

      <div
        className="
          relative
          w-full
          max-w-lg
          rounded-3xl
          border border-gray-200/80
          bg-white/70
          px-6
          py-10
          text-center
          shadow-[0_20px_60px_rgba(0,0,0,0.07)]
          backdrop-blur-2xl
          sm:px-10
          sm:py-12
        "
      >

        {/* Logo */}
        <div className="mb-8">
          <span className="text-lg font-bold tracking-tight text-black">
            ChatSupport
            <span className="text-blue-600">.AI</span>
          </span>
        </div>

        {/* 404 */}
        <div className="text-7xl font-black tracking-tight text-gray-100 sm:text-8xl">
          404
        </div>

        {/* Heading */}
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Page not found
        </h1>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
          The page you are looking for does not exist or may have
          been moved somewhere else.
        </p>

        {/* Button */}
        <Link
          href="/dashboard"
          className="
            mt-7
            inline-flex
            items-center
            justify-center
            rounded-xl
            bg-black
            px-6
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-gray-800
            active:scale-[0.98]
          "
        >
          Back to Dashboard
        </Link>

      </div>
    </div>
  );
}