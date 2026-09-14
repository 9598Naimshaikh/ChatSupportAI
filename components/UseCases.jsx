const useCases = [
  {
    number: "01",
    title: "Drop-in simplicity",
    description:
      "Add ChatSupportAI to your existing website with a simple script. No complex chatbot development is required.",
    code: `<script
  src="chatsupportai.com/widget.js"
  data-business="your-id">
</script>`,
  },
  {
    number: "02",
    title: "E-commerce support",
    description:
      "Help customers with product information, orders, delivery details, return policies, and frequently asked questions.",
    code: `Customer
   ↓
Question
   ↓
AI Assistant
   ↓
Business Answer`,
  },
  {
    number: "03",
    title: "Service businesses",
    description:
      "Provide instant answers about your services, pricing, working hours, availability, and other business information.",
    code: `Business Info
      ↓
ChatSupportAI
      ↓
Customer Support`,
  },
];

export default function UseCases() {
  return (
    <section
      id="use-cases"
      className="bg-gray-50 px-6 py-20"
    >
      <div className="mx-auto max-w-5xl">

        {/* Section Heading */}
        <div className="text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            Use Cases
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Built for modern businesses.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-500">
            Give your customers instant answers with an AI assistant
            that understands your business.
          </p>
        </div>

        {/* Use Case Cards */}
        <div className="mt-12 space-y-6">
          {useCases.map((useCase) => (
            <div
              key={useCase.number}
              className="grid overflow-hidden rounded-2xl border border-gray-200 bg-white md:grid-cols-2"
            >

              {/* Text */}
              <div className="p-8 md:p-10">

                <span className="text-[10px] font-semibold text-gray-400">
                  {useCase.number}
                </span>

                <h3 className="mt-5 text-xl font-bold tracking-tight text-gray-900">
                  {useCase.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {useCase.description}
                </p>

              </div>

              {/* Visual / Code */}
              <div className="flex min-h-[220px] items-center bg-black p-8">

                <div className="w-full overflow-hidden rounded-xl border border-gray-800 bg-gray-950 p-5">

                  <div className="mb-4 flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  </div>

                  <pre className="overflow-x-auto whitespace-pre-wrap text-[10px] leading-5 text-green-500">
                    {useCase.code}
                  </pre>

                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}