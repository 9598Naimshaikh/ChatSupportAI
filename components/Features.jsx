const features = [
  {
    number: "01",
    title: "Knowledge grounded",
    description:
      "Your AI answers are based on the business information and content you provide.",
  },
  {
    number: "02",
    title: "Strict guardrails",
    description:
      "Keep your AI focused on your business and reduce irrelevant or unwanted responses.",
  },
  {
    number: "03",
    title: "Tone matching",
    description:
      "Customize how your AI assistant communicates with your customers.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="border-y border-gray-100 bg-white px-6 py-20"
    >
      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <div className="max-w-2xl">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            Designed for trust
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            AI support you can trust.
          </h2>

          <p className="mt-4 text-sm leading-6 text-gray-500">
            Most AI support tools can give unreliable answers.
            ChatSupportAI is designed to keep responses grounded
            in your business content.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="rounded-xl border border-gray-200 bg-gray-50 p-6 transition hover:border-gray-300 hover:shadow-sm hover:scale-101"
            >
              {/* Number */}
              <span className="text-lg font-semibold text-gray-400">
                {feature.number}
              </span>

              {/* Title */}
              <h3 className="mt-4 text-md font-semibold text-gray-900">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-xs leading-5 text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}