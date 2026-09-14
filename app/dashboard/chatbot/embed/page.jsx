"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function EmbedPage() {
  const [chatbot, setChatbot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadChatbot() {
      try {
        const response = await fetch("/api/chatbot");

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load chatbot."
          );
        }

        setChatbot(data.chatbot);
      } catch (error) {
        console.error("Load chatbot error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadChatbot();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f9fb]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />

          <p className="mt-3 text-[12px] text-gray-500">
            Loading embed configuration...
          </p>
        </div>
      </main>
    );
  }

  if (!chatbot) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f9fb] px-6">
        <div className="max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-gray-950">
            Chatbot not configured
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Create your chatbot configuration before generating
            the website embed code.
          </p>

          <Link
            href="/dashboard/chatbot"
            className="mt-6 inline-flex rounded-xl bg-[#111827] px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Configure Chatbot →
          </Link>
        </div>
      </main>
    );
  }

  const scriptCode = `<script
  src="${typeof window !== "undefined"
    ? `${window.location.origin}/widget.js`
    : "/widget.js"}"
  data-chatbot-id="${chatbot.publicId}">
</script>`;

  async function copyScript() {
    try {
      await navigator.clipboard.writeText(scriptCode);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy script error:", error);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f9fb] text-gray-900">

      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex min-h-20.5 max-w-300 items-center justify-between gap-4 px-6 md:px-10">

          <div>
            <Link
              href="/dashboard/chatbot"
              className="text-[14px] font-medium text-gray-500 transition hover:text-gray-900"
            >
              ← Back to Chatbot
            </Link>

            <h1 className="mt-2 text-[20px] font-bold text-gray-950">
              Install Chatbot
            </h1>
          </div>

          <Link
            href="/dashboard/chatbot/test"
            className="hidden rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[12px] font-semibold text-gray-700 transition hover:bg-gray-50 sm:inline-flex"
          >
            ✦ Test Assistant
          </Link>

        </div>
      </header>


      {/* Content */}
      <div className="mx-auto max-w-[1000px] px-6 py-10 md:px-10">

        {/* Intro */}
        <div className="mb-8">

          <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-[11px] font-semibold text-green-600">
            CHATBOT READY
          </span>

          <h2 className="mt-4 text-[28px] font-bold tracking-tight text-gray-950">
            Add ChatSupportAI to your website
          </h2>

          <p className="mt-2 max-w-2xl text-[14px] leading-6 text-gray-500">
            Copy the installation code below and paste it into your
            website. Your AI customer support assistant will then
            appear automatically.
          </p>

        </div>


        {/* Script Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">

          {/* Card Header */}
          <div className="flex flex-col gap-3 border-b border-gray-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h3 className="text-[16px] font-bold text-gray-950">
                Installation Code
              </h3>

              <p className="mt-1 text-[12px] text-gray-500">
                Add this script before the closing
                <code className="mx-1 rounded bg-gray-100 px-1.5 py-0.5 text-[11px]">
                  &lt;/body&gt;
                </code>
                tag.
              </p>
            </div>

            <button
              type="button"
              onClick={copyScript}
              className="rounded-xl bg-[#111827] px-5 py-2.5 text-[12px] font-semibold text-white transition hover:bg-gray-800"
            >
              {copied ? "✓ Copied!" : "Copy Script"}
            </button>

          </div>


          {/* Code */}
          <div className="bg-[#111827] p-6">

            <pre className="overflow-x-auto whitespace-pre-wrap break-all text-[12px] leading-6 text-gray-200">
              <code>{scriptCode}</code>
            </pre>

          </div>

        </div>


        {/* Installation Steps */}
        <div className="mt-8">

          <h3 className="text-[18px] font-bold text-gray-950">
            How to install
          </h3>

          <div className="mt-5 grid gap-5 md:grid-cols-3">

            {/* Step 1 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#111827] text-[13px] font-bold text-white">
                1
              </div>

              <h4 className="mt-5 text-[14px] font-semibold text-gray-950">
                Copy the script
              </h4>

              <p className="mt-2 text-[12px] leading-5 text-gray-500">
                Click the Copy Script button to copy your unique
                ChatSupportAI installation code.
              </p>

            </div>


            {/* Step 2 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#111827] text-[13px] font-bold text-white">
                2
              </div>

              <h4 className="mt-5 text-[14px] font-semibold text-gray-950">
                Add it to your website
              </h4>

              <p className="mt-2 text-[12px] leading-5 text-gray-500">
                Paste the script before the closing
                <code className="mx-1 rounded bg-gray-100 px-1 py-0.5 text-[10px]">
                  &lt;/body&gt;
                </code>
                tag of your website.
              </p>

            </div>


            {/* Step 3 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600 text-[13px] font-bold text-white">
                ✓
              </div>

              <h4 className="mt-5 text-[14px] font-semibold text-gray-950">
                Your chatbot is live
              </h4>

              <p className="mt-2 text-[12px] leading-5 text-gray-500">
                Open your website and look at the bottom corner.
                Your ChatSupportAI button should appear.
              </p>

            </div>

          </div>

        </div>


        {/* Important Notice */}
        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">

          <div className="flex gap-3">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              ✦
            </div>

            <div>

              <h4 className="text-[13px] font-semibold text-blue-900">
                Important
              </h4>

              <p className="mt-1 text-[12px] leading-5 text-blue-700">
                Your installation code contains a public chatbot
                identifier. It does not expose your password, JWT,
                MongoDB credentials, or private account information.
              </p>

            </div>

          </div>

        </div>


        {/* Bottom Navigation */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">

          <Link
            href="/dashboard/chatbot"
            className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-center text-[12px] font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
          >
            ← Chatbot Settings
          </Link>

          <Link
            href="/dashboard/chatbot/test"
            className="rounded-xl bg-[#111827] px-5 py-3 text-center text-[12px] font-semibold text-white transition hover:bg-gray-800"
          >
            Test Assistant →
          </Link>

        </div>

      </div>

    </main>
  );
}