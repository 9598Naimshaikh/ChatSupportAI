export default function Hero() {
  return (
    <section className="px-6 pt-16 pb-12">
      <div className="mx-auto max-w-5xl text-center">

        {/* Small Badge */}
        <div className="mb-5 inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1">
          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-black"></span>

          <span className="text-[12px] tracking-wide text-gray-600">
            AI-powered customer support
          </span>
        </div>

        {/* Heading */}
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
          AI Customer Support Built for Modern Websites
        </h1>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-gray-500">
          Add a powerful AI chatbot to your website in minutes.
          Let your customers get instant answers using your own
          business knowledge.
        </p>

        {/* CTA Button */}
        <div className="mt-7">
          <a
            href="/signup"
            className="inline-flex items-center rounded-md bg-black px-6 py-3 text-xs font-medium text-white transition hover:bg-gray-800 hover:scale-105 active:scale-95"
          >
            Get Started — Its Free
          </a>
        </div>

      </div>
    </section>
  );
}