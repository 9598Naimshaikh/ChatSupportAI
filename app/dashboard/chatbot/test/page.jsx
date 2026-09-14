"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ChatTestPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const [sessionId] = useState(() => {
    if (typeof window !== "undefined") {
      const existingSession = sessionStorage.getItem(
        "chatsupportai_test_session"
      );

      if (existingSession) {
        return existingSession;
      }

      const newSession =
        crypto.randomUUID();

      sessionStorage.setItem(
        "chatsupportai_test_session",
        newSession
      );

      return newSession;
    }

    return "";
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function sendMessage(e) {
    e.preventDefault();

    const trimmedMessage = input.trim();

    if (!trimmedMessage || loading) {
      return;
    }

    const userMessage = {
      role: "user",
      content: trimmedMessage,
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedMessage,
          sessionId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to get AI response."
        );
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: data.answer,
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong. Please try again.",
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function clearConversation() {
    sessionStorage.removeItem(
      "chatsupportai_test_session"
    );

    window.location.reload();
  }

  return (
    <main className="min-h-screen bg-[#f8f9fb] text-gray-900">

      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-[82px] max-w-[1000px] items-center justify-between px-6 md:px-10">

          <div>
            <Link
              href="/dashboard/chatbot"
              className="text-[13px] font-medium text-gray-500 transition hover:text-gray-900"
            >
              ← Back to Chatbot
            </Link>

            <h1 className="mt-2 text-[20px] font-bold text-gray-950">
              Test Your AI Assistant
            </h1>
          </div>

          <button
            type="button"
            onClick={clearConversation}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[12px] font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
          >
            New Conversation
          </button>

        </div>
      </header>


      {/* Chat Area */}
      <div className="mx-auto max-w-[900px] px-6 py-8 md:px-10">

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">

          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111827] text-sm font-semibold text-white">
                AI
              </div>

              <div>
                <p className="text-[13px] font-semibold text-gray-900">
                  ChatSupportAI Assistant
                </p>

                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                  <span className="text-[10px] text-gray-400">
                    Online
                  </span>
                </div>
              </div>

            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-semibold text-blue-600">
              TEST MODE
            </span>

          </div>


          {/* Messages */}
          <div className="min-h-[520px] max-h-[520px] overflow-y-auto bg-[#fafafa] px-5 py-6 md:px-8">

            {messages.length === 0 ? (
              <div className="flex min-h-[450px] items-center justify-center">

                <div className="max-w-md text-center">

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-900 text-xl text-white">
                    ✦
                  </div>

                  <h2 className="mt-5 text-[20px] font-bold text-gray-950">
                    Test your AI assistant
                  </h2>

                  <p className="mt-2 text-[13px] leading-6 text-gray-500">
                    Ask a question about your business and see
                    how your AI customer support assistant responds.
                  </p>

                  <div className="mt-6 grid gap-2 sm:grid-cols-2">

                    <button
                      type="button"
                      onClick={() =>
                        setInput(
                          "What products or services do you offer?"
                        )
                      }
                      className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-left text-[11px] text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
                    >
                      What products or services do you offer?
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setInput(
                          "What are your business hours?"
                        )
                      }
                      className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-left text-[11px] text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
                    >
                      What are your business hours?
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setInput(
                          "Do you provide delivery?"
                        )
                      }
                      className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-left text-[11px] text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
                    >
                      Do you provide delivery?
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setInput(
                          "How can I contact your business?"
                        )
                      }
                      className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-left text-[11px] text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
                    >
                      How can I contact your business?
                    </button>

                  </div>

                </div>

              </div>
            ) : (
              <div className="space-y-5">

                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`flex ${
                      message.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >

                    <div
                      className={`max-w-[78%] rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "rounded-br-md bg-[#111827] text-white"
                          : message.error
                          ? "rounded-bl-md border border-red-200 bg-red-50 text-red-600"
                          : "rounded-bl-md border border-gray-200 bg-white text-gray-700"
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-[12px] leading-5">
                        {message.content}
                      </p>
                    </div>

                  </div>
                ))}


                {/* Loading */}
                {loading && (
                  <div className="flex justify-start">

                    <div className="rounded-2xl rounded-bl-md border border-gray-200 bg-white px-4 py-3">

                      <div className="flex items-center gap-1.5">

                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />

                        <span
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"
                          style={{
                            animationDelay: "120ms",
                          }}
                        />

                        <span
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"
                          style={{
                            animationDelay: "240ms",
                          }}
                        />

                      </div>

                    </div>

                  </div>
                )}

                <div ref={messagesEndRef} />

              </div>
            )}

          </div>


          {/* Input */}
          <form
            onSubmit={sendMessage}
            className="border-t border-gray-100 bg-white p-4"
          >

            <div className="flex items-end gap-3 rounded-xl border border-gray-200 bg-gray-50 p-2 focus-within:border-gray-400">

              <textarea
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.shiftKey
                  ) {
                    e.preventDefault();
                    sendMessage(e);
                  }
                }}
                rows={1}
                placeholder="Ask something about your business..."
                className="max-h-32 min-h-[40px] flex-1 resize-none bg-transparent px-2 py-2 text-[12px] text-gray-900 outline-none placeholder:text-gray-400"
              />

              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#111827] text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ↑
              </button>

            </div>

            <p className="mt-2 text-center text-[10px] text-gray-400">
              Test mode • AI responses are generated using your business information.
            </p>

          </form>

        </div>

      </div>

    </main>
  );
}