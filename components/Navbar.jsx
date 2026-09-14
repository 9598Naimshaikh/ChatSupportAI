import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          href="/"
          className="text-sm font-bold tracking-tight"
        >
          ChatSupport<span className="text-gray-500">.AI</span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-xs text-gray-600 transition hover:text-black"
          >
            Features
          </a>

          <a
            href="#use-cases"
            className="text-xs text-gray-600 transition hover:text-black"
          >
            Use Cases
          </a>

          <a
            href="#faq"
            className="text-xs text-gray-600 transition hover:text-black"
          >
            FAQ
          </a>
        </div>

        {/* Sign In */}
        <Link
          href="/login"
          className="rounded-md bg-black px-5 py-2 text-xs font-medium text-white transition hover:bg-gray-800"
        >
          Sign In
        </Link>

      </div>
    </nav>
  );
}