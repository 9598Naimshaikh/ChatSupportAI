"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
    <section id="faq" className="bg-white px-6 py-24">
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
        <div className="mt-12 overflow-hidden rounded-2xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`relative border-b border-gray-200 last:border-b-0 transition-all duration-300 ${
                  isOpen
                    ? "bg-gray-50"
                    : "bg-white hover:bg-gray-50/40"
                }`}
              >
                {/* Active Left Border */}
                <div
                  className={`absolute left-0 top-0 h-full w-[2px] bg-black transition-all duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Question */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="group flex w-full items-center justify-between gap-6 px-6 py-6 text-left md:px-7"
                >
                  <div className="flex items-center gap-4">
                    {/* Number */}
                    <span className="text-md font-medium text-gray-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Question */}
                    <span
                      className={`text-sm font-medium transition-all duration-300 ${
                        isOpen
                          ? "text-black"
                          : "text-gray-700 group-hover:text-black"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>

                  {/* Modern Chevron Icon */}
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "border-black bg-black text-white shadow-sm"
                        : "border-gray-200 bg-white text-gray-500 group-hover:border-gray-400"
                    }`}
                  >
                    <ChevronDown
                      size={18}
                      strokeWidth={2.5}
                      className={`transition-transform duration-300 ease-out ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`grid transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`px-6 pb-6 pl-[4.4rem] pr-12 md:px-6 md:pl-14 transition-all duration-300 ${
                        isOpen
                          ? "translate-y-0 opacity-100"
                          : "-translate-y-2 opacity-0"
                      }`}
                    >
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