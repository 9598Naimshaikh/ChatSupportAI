"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is ChatSupportAI?",
    answer:
      "ChatSupportAI is an AI-powered customer support platform that allows businesses to add an intelligent chatbot to their website and automatically answer customer questions.",
  },
  {
    question: "How does the chatbot work?",
    answer:
      "You provide your business information through the ChatSupportAI dashboard. The system uses that information as context to generate relevant answers for visitors on your website.",
  },
  {
    question: "Do I need to build a chatbot myself?",
    answer:
      "No. ChatSupportAI provides an embeddable chatbot widget. You generate the script from your dashboard and add it to your website.",
  },
  {
    question: "Can I customize the chatbot?",
    answer:
      "Yes. You will be able to configure settings such as the chatbot name, welcome message, and appearance from your dashboard.",
  },
  {
    question: "Can the AI answer questions unrelated to my business?",
    answer:
      "The chatbot is designed to focus on the business information provided by the business owner. If the required information is not available, it can inform the customer instead of providing unrelated information.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="bg-white px-6 py-24"
    >
      <div className="mx-auto max-w-3xl">

        {/* Heading */}
        <div className="text-center">

          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
            FAQ
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Frequently asked questions.
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-gray-500">
            Everything you need to know about ChatSupportAI.
          </p>

        </div>

        {/* FAQ Container */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-gray-200">

          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`border-b border-gray-200 last:border-b-0 transition-colors duration-300 ${
                  isOpen ? "bg-gray-50/70" : "bg-white"
                }`}
              >

                {/* Question */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="group flex w-full items-center justify-between gap-6 px-6 py-6 text-left md:px-7"
                >

                  <div className="flex items-center gap-4">

                    {/* Number */}
                    <span className="text-[10px] font-medium text-gray-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Question */}
                    <span
                      className={`text-sm font-medium transition-colors duration-300 ${
                        isOpen
                          ? "text-gray-900"
                          : "text-gray-700 group-hover:text-black"
                      }`}
                    >
                      {faq.question}
                    </span>

                  </div>

                  {/* Animated Plus */}
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-all duration-300 ${
                      isOpen
                        ? "rotate-45 bg-black text-white"
                        : "bg-white group-hover:border-gray-400"
                    }`}
                  >
                    <span className="text-lg font-light leading-none">
                      +
                    </span>
                  </span>

                </button>

                {/* Animated Answer */}
                <div
                  className={`grid transition-all duration-200 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">

                    <div className="px-6 pb-6 pl-[4.4rem] pr-12 md:px-6 md:pl-14">

                      <p className="max-w-2xl text-sm leading-6 text-gray-500">
                        {faq.answer}
                      </p>

                    </div>

                  </div>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}