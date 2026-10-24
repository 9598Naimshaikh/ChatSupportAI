import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          href="/"
          className="text-xl lg:text-2xl font-bold tracking-tight"
        >
          ChatSupport<span className="text-gray-500">.AI</span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="group relative text-base font-medium text-gray-500 transition hover:text-black"
          >
            Features
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-full" />
          </a>

          <a
            href="#use-cases"
            className="group relative text-base font-medium text-gray-500 transition hover:text-black"
          >
            Use Cases
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-full" />
          </a>

          <a
            href="#faq"
            className="group relative text-base font-medium text-gray-500 transition hover:text-black"
          >
            FAQ
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-full" />
          </a>
        </div>

        {/* Sign In */}
        <Link
          href="/login"
          className="rounded-md bg-black px-5 py-2 text-sm hover:scale-105 active:scale-95 font-medium text-white transition hover:bg-gray-800"
        >
          Sign In
        </Link>

      </div>
    </nav>
  );
}