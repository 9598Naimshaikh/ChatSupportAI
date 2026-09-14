import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-6 pt-16 pb-8">
      <div className="mx-auto max-w-5xl">

        {/* Main Footer */}
        <div className="grid gap-10 md:grid-cols-2">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-sm font-bold tracking-tight text-gray-900"
            >
              ChatSupport<span className="text-gray-400">.AI</span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-500">
              AI-powered customer support for modern websites.
              Give your customers instant answers with a chatbot
              trained on your business information.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">

            {/* Product */}
            <div>
              <h3 className="text-xs font-semibold text-gray-900">
                Product
              </h3>

              <div className="mt-4 space-y-3">
                <a
                  href="#features"
                  className="block text-xs text-gray-500 transition hover:text-black"
                >
                  Features
                </a>

                <a
                  href="#use-cases"
                  className="block text-xs text-gray-500 transition hover:text-black"
                >
                  Use Cases
                </a>

                <a
                  href="#faq"
                  className="block text-xs text-gray-500 transition hover:text-black"
                >
                  FAQ
                </a>
              </div>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-xs font-semibold text-gray-900">
                Company
              </h3>

              <div className="mt-4 space-y-3">
                <a
                  href="#"
                  className="block text-xs text-gray-500 transition hover:text-black"
                >
                  About
                </a>

                <a
                  href="#"
                  className="block text-xs text-gray-500 transition hover:text-black"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Get Started */}
            <div>
              <h3 className="text-xs font-semibold text-gray-900">
                Get Started
              </h3>

              <div className="mt-4 space-y-3">
                <Link
                  href="/login"
                  className="block text-xs text-gray-500 transition hover:text-black"
                >
                  Sign In
                </Link>

                <Link
                  href="/signup"
                  className="block text-xs text-gray-500 transition hover:text-black"
                >
                  Create Account
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-[11px] text-gray-400">
            © {new Date().getFullYear()} ChatSupportAI. All rights reserved.
          </p>

          <div className="flex gap-5">
            <a
              href="#"
              className="text-[11px] text-gray-400 transition hover:text-black"
            >
              Privacy
            </a>

            <a
              href="#"
              className="text-[11px] text-gray-400 transition hover:text-black"
            >
              Terms
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}