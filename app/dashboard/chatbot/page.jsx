"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ChatbotPage() {
  const [formData, setFormData] = useState({
    botName: "ChatSupportAI Assistant",
    welcomeMessage: "Hi! 👋 How can I help you today?",
    tone: "Professional",
    primaryColor: "#111827",
    position: "bottom-right",
  });

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [chatbotExists, setChatbotExists] = useState(false);

  useEffect(() => {
    async function loadChatbot() {
      try {
        const response = await fetch("/api/chatbot");

        const data = await response.json();

        if (data.success && data.chatbot) {
          setChatbotExists(true);

          setFormData({
            botName: data.chatbot.botName || "",
            welcomeMessage: data.chatbot.welcomeMessage || "",
            tone: data.chatbot.tone || "Professional",
            primaryColor: data.chatbot.primaryColor || "#111827",
            position: data.chatbot.position || "bottom-right",
          });
        }
      } catch (error) {
        console.error("Load chatbot error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadChatbot();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaved(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSaving(true);
    setSaved(false);

    try {
      const response = await fetch("/api/chatbot", {
        method: chatbotExists ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Something went wrong.");
        return;
      }

      setChatbotExists(true);
      setSaved(true);

      setFormData({
        botName: data.chatbot.botName || "",
        welcomeMessage: data.chatbot.welcomeMessage || "",
        tone: data.chatbot.tone || "Professional",
        primaryColor: data.chatbot.primaryColor || "#111827",
        position: data.chatbot.position || "bottom-right",
      });
    } catch (error) {
      console.error("Save chatbot error:", error);

      alert("Unable to save chatbot configuration. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f9fb]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />

          <p className="mt-3 text-[12px] text-gray-500">
            Loading chatbot configuration...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f9fb] text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex min-h-20.5 max-w-300 items-center justify-between gap-4 px-6 md:px-10">
          {/* Left */}
          <div>
            <Link
              href="/dashboard"
              className="text-[14px] font-medium text-gray-500 transition hover:text-gray-900"
            >
              ← Back to Dashboard
            </Link>

            <h1 className="mt-2 text-[20px] font-bold text-gray-950">
              Chatbot Configuration
            </h1>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            {/* Test Assistant */}
            <Link
              href="/dashboard/chatbot/test"
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[12px] font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
            >
              ✦ Test Assistant
            </Link>

            {/* GET Embed code. */}
            <Link
              href="/dashboard/chatbot/embed"
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[12px] font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
            >
              Get Embed Code
            </Link>

            {/* Setup Badge */}
            <span className="hidden rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-semibold text-blue-600 sm:block">
              CHATBOT SETUP
            </span>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-275 px-6 py-10 md:px-10">
        {/* Introduction */}
        <div className="mb-8">
          <h2 className="text-[28px] font-bold tracking-tight text-gray-950">
            Customize your AI assistant
          </h2>

          <p className="mt-2 max-w-175 text-[14px] leading-6 text-gray-500">
            Configure how your chatbot appears and communicates with your
            customers.
          </p>
        </div>

        {/* Layout */}
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Configuration Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] md:p-8"
          >
            {/* Basic Configuration */}
            <div>
              <h3 className="text-[17px] font-bold text-gray-950">
                Basic Configuration
              </h3>

              <p className="mt-1 text-[12px] text-gray-500">
                Customize the name and communication style of your AI assistant.
              </p>
            </div>

            {/* Bot Name */}
            <div className="mt-6">
              <label
                htmlFor="botName"
                className="mb-2 block text-[13px] font-semibold text-gray-700"
              >
                Assistant Name
              </label>

              <input
                id="botName"
                name="botName"
                type="text"
                value={formData.botName}
                onChange={handleChange}
                placeholder="e.g. Support Assistant"
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[13px] text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/5"
              />
            </div>

            {/* Welcome Message */}
            <div className="mt-5">
              <label
                htmlFor="welcomeMessage"
                className="mb-2 block text-[13px] font-semibold text-gray-700"
              >
                Welcome Message
              </label>

              <textarea
                id="welcomeMessage"
                name="welcomeMessage"
                value={formData.welcomeMessage}
                onChange={handleChange}
                rows={4}
                placeholder="Write the first message your customers will see..."
                required
                className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-[13px] leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/5"
              />
            </div>

            {/* Tone */}
            <div className="mt-5">
              <label
                htmlFor="tone"
                className="mb-2 block text-[13px] font-semibold text-gray-700"
              >
                Assistant Tone
              </label>

              <select
                id="tone"
                name="tone"
                value={formData.tone}
                onChange={handleChange}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-[13px] text-gray-900 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/5"
              >
                <option value="Professional">Professional</option>

                <option value="Friendly">Friendly</option>

                <option value="Casual">Casual</option>

                <option value="Helpful">Helpful</option>
              </select>
            </div>

            {/* Divider */}
            <div className="my-8 h-px bg-gray-100" />

            {/* Appearance */}
            <div>
              <h3 className="text-[17px] font-bold text-gray-950">
                Appearance
              </h3>

              <p className="mt-1 text-[12px] text-gray-500">
                Customize the appearance of your chatbot widget.
              </p>
            </div>

            {/* Color */}
            <div className="mt-6">
              <label
                htmlFor="primaryColor"
                className="mb-2 block text-[13px] font-semibold text-gray-700"
              >
                Primary Color
              </label>

              <div className="flex gap-3">
                <input
                  id="primaryColor"
                  name="primaryColor"
                  type="color"
                  value={formData.primaryColor}
                  onChange={handleChange}
                  className="h-11.5 w-14.5 cursor-pointer rounded-xl border border-gray-200 bg-white p-1"
                />

                <input
                  type="text"
                  value={formData.primaryColor}
                  onChange={(e) =>
                    setFormData((previous) => ({
                      ...previous,
                      primaryColor: e.target.value,
                    }))
                  }
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-[13px] uppercase outline-none focus:border-gray-900"
                />
              </div>
            </div>

            {/* Position */}
            <div className="mt-5">
              <label
                htmlFor="position"
                className="mb-2 block text-[13px] font-semibold text-gray-700"
              >
                Chatbot Position
              </label>

              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-[13px] text-gray-900 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/5"
              >
                <option value="bottom-right">Bottom Right</option>

                <option value="bottom-left">Bottom Left</option>
              </select>
            </div>

            {/* Notice */}
            <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50 p-4">
              <div className="flex gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  ✦
                </div>

                <div>
                  <h4 className="text-[12px] font-semibold text-blue-900">
                    AI configuration
                  </h4>

                  <p className="mt-1 text-[11px] leading-5 text-blue-700">
                    These settings will be used later when we create your
                    AI-powered customer support assistant.
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
              {/* Cancel */}
              <Link
                href="/dashboard"
                className="rounded-xl border border-gray-200 px-5 py-3 text-center text-[13px] font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
              >
                Cancel
              </Link>

              {/* Test Assistant */}
              <Link
                href="/dashboard/chatbot/test"
                className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-center text-[13px] font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
              >
                Test Assistant ↗
              </Link>

              {/* Save / Update */}
              <button
                type="submit"
                className="rounded-xl bg-[#111827] px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-gray-800"
              >
                {saving
                  ? chatbotExists
                    ? "Updating..."
                    : "Saving..."
                  : chatbotExists
                    ? "Update Configuration"
                    : "Save Configuration"}
              </button>
            </div>

            {saved && (
              <div className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-center text-[12px] font-medium text-green-700">
                ✓ Configuration saved successfully
              </div>
            )}
          </form>

          {/* Live Preview */}
          <div className="lg:sticky lg:top-6 lg:h-fit">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              {/* Preview Header */}
              <div className="border-b border-gray-100 px-5 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                  Live Preview
                </p>
              </div>

              {/* Website Preview */}
              <div className="relative min-h-117.5 bg-[#f8f9fb] p-4">
                {/* Fake Website */}
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <div className="h-3 w-24 rounded-full bg-gray-200" />

                  <div className="mt-5 h-3 w-full rounded-full bg-gray-100" />

                  <div className="mt-2 h-3 w-[80%] rounded-full bg-gray-100" />

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <div className="h-24 rounded-xl bg-gray-50" />

                    <div className="h-24 rounded-xl bg-gray-50" />
                  </div>
                </div>

                {/* Chat Window */}
                <div
                  className={`absolute bottom-20 ${
                    formData.position === "bottom-left" ? "left-4" : "right-4"
                  } w-67.5 overflow-hidden rounded-2xl bg-white shadow-[0_15px_45px_rgba(0,0,0,0.15)]`}
                >
                  {/* Chat Header */}
                  <div
                    className="px-4 py-3 text-white"
                    style={{
                      backgroundColor: formData.primaryColor,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-[13px]">
                        ✦
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-[12px] font-semibold">
                          {formData.botName}
                        </p>

                        <p className="text-[9px] text-white/70">Online</p>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="min-h-42.5 bg-white p-4">
                    <div className="max-w-52.5 rounded-xl rounded-tl-sm bg-gray-100 px-3 py-2.5">
                      <p className="text-[10px] leading-4 text-gray-700">
                        {formData.welcomeMessage}
                      </p>
                    </div>
                  </div>

                  {/* Input */}
                  <div className="border-t border-gray-100 p-3">
                    <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
                      <span className="flex-1 text-[9px] text-gray-400">
                        Type your message...
                      </span>

                      <span
                        className="text-[11px] font-bold"
                        style={{
                          color: formData.primaryColor,
                        }}
                      >
                        ↑
                      </span>
                    </div>
                  </div>
                </div>

                {/* Chat Bubble */}
                <div
                  className={`absolute bottom-4 ${
                    formData.position === "bottom-left" ? "left-4" : "right-4"
                  } flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg`}
                  style={{
                    backgroundColor: formData.primaryColor,
                  }}
                >
                  ✦
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
