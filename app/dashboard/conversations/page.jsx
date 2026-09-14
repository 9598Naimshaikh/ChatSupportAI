"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function ConversationsPage() {
  const [conversations, setConversations] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadConversations() {
      try {
        const response = await fetch("/api/conversations");

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load conversations."
          );
        }

        setConversations(data.conversations || []);

        if (data.conversations?.length > 0) {
          setSelectedId(data.conversations[0]._id);
        }
      } catch (error) {
        console.error("Load conversations error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadConversations();
  }, []);

  const selectedConversation = useMemo(() => {
    return conversations.find(
      (conversation) =>
        conversation._id === selectedId
    );
  }, [conversations, selectedId]);

  function getLatestMessage(conversation) {
    if (!conversation.messages?.length) {
      return "No messages";
    }

    return conversation.messages[
      conversation.messages.length - 1
    ].content;
  }

  function getConversationTitle(conversation) {
    const firstUserMessage =
      conversation.messages?.find(
        (message) => message.role === "user"
      );

    if (!firstUserMessage) {
      return "New conversation";
    }

    return firstUserMessage.content;
  }

  function formatDate(dateValue) {
    if (!dateValue) {
      return "";
    }

    const date = new Date(dateValue);

    return date.toLocaleString([], {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f9fb]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />

          <p className="mt-3 text-[12px] text-gray-500">
            Loading conversations...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f9fb] text-gray-900">

      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex min-h-[82px] max-w-[1300px] items-center justify-between gap-4 px-6 md:px-10">

          <div>
            <Link
              href="/dashboard"
              className="text-[14px] font-medium text-gray-500 transition hover:text-gray-900"
            >
              ← Back to Dashboard
            </Link>

            <h1 className="mt-2 text-[20px] font-bold text-gray-950">
              Conversations
            </h1>
          </div>

          <div className="rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-semibold text-blue-600">
            CUSTOMER SUPPORT
          </div>

        </div>
      </header>


      {/* Main */}
      <div className="mx-auto max-w-[1300px] px-6 py-8 md:px-10">

        {/* Intro */}
        <div className="mb-6">

          <h2 className="text-[27px] font-bold tracking-tight text-gray-950">
            Customer conversations
          </h2>

          <p className="mt-2 text-[14px] text-gray-500">
            View customer questions and AI responses from your
            ChatSupportAI widget.
          </p>

        </div>


        {/* Empty State */}
        {conversations.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-900 text-xl text-white">
              ◌
            </div>

            <h3 className="mt-5 text-[20px] font-bold text-gray-950">
              No conversations yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-[13px] leading-6 text-gray-500">
              Once customers start talking to your AI assistant,
              their conversations will appear here.
            </p>

            <Link
              href="/dashboard/chatbot/test"
              className="mt-6 inline-flex rounded-xl bg-[#111827] px-5 py-3 text-[12px] font-semibold text-white transition hover:bg-gray-800"
            >
              Test Assistant →
            </Link>

          </div>
        ) : (
          <div className="grid min-h-[650px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] lg:grid-cols-[340px_1fr]">

            {/* =================================================
                CONVERSATION LIST
            ================================================== */}
            <aside className="border-b border-gray-200 lg:border-b-0 lg:border-r">

              {/* List Header */}
              <div className="border-b border-gray-100 px-5 py-4">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-[13px] font-semibold text-gray-900">
                      All conversations
                    </p>

                    <p className="mt-1 text-[11px] text-gray-400">
                      {conversations.length} conversation
                      {conversations.length !== 1
                        ? "s"
                        : ""}
                    </p>
                  </div>

                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-semibold text-gray-500">
                    LIVE
                  </span>

                </div>

              </div>


              {/* Conversation Items */}
              <div className="max-h-[590px] overflow-y-auto">

                {conversations.map((conversation) => {

                  const isSelected =
                    conversation._id === selectedId;

                  const title =
                    getConversationTitle(
                      conversation
                    );

                  const latest =
                    getLatestMessage(
                      conversation
                    );

                  return (
                    <button
                      type="button"
                      key={conversation._id}
                      onClick={() =>
                        setSelectedId(
                          conversation._id
                        )
                      }
                      className={`w-full border-b border-gray-100 px-5 py-4 text-left transition ${
                        isSelected
                          ? "bg-blue-50"
                          : "bg-white hover:bg-gray-50"
                      }`}
                    >

                      <div className="flex items-start gap-3">

                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                            isSelected
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          AI
                        </div>

                        <div className="min-w-0 flex-1">

                          <div className="flex items-center justify-between gap-3">

                            <p className="truncate text-[12px] font-semibold text-gray-900">
                              {title}
                            </p>

                            <span className="shrink-0 text-[9px] text-gray-400">
                              {formatDate(
                                conversation.updatedAt
                              )}
                            </span>

                          </div>

                          <p className="mt-1 truncate text-[11px] text-gray-400">
                            {latest}
                          </p>

                          <p className="mt-2 text-[9px] text-gray-400">
                            Session:{" "}
                            {conversation.sessionId.slice(
                              0,
                              8
                            )}
                            ...
                          </p>

                        </div>

                      </div>

                    </button>
                  );
                })}

              </div>

            </aside>


            {/* =================================================
                CONVERSATION DETAIL
            ================================================== */}
            <section className="flex min-h-[650px] flex-col">

              {!selectedConversation ? (
                <div className="flex flex-1 items-center justify-center p-8 text-center">

                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
                      ◌
                    </div>

                    <p className="mt-4 text-[13px] text-gray-500">
                      Select a conversation to view messages.
                    </p>
                  </div>

                </div>
              ) : (
                <>
                  {/* Detail Header */}
                  <div className="border-b border-gray-100 px-6 py-5">

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                      <div>

                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                          Conversation
                        </p>

                        <h3 className="mt-1 text-[16px] font-bold text-gray-950">
                          Customer session
                        </h3>

                        <p className="mt-1 text-[10px] text-gray-400">
                          {selectedConversation.sessionId}
                        </p>

                      </div>

                      <div className="rounded-full bg-green-50 px-3 py-1.5 text-[10px] font-semibold text-green-600">
                        Active
                      </div>

                    </div>

                  </div>


                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto bg-[#fafafa] px-6 py-6">

                    <div className="mx-auto max-w-[760px] space-y-5">

                      {selectedConversation.messages?.map(
                        (message, index) => (
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
                                message.role ===
                                "user"
                                  ? "rounded-br-md bg-[#111827] text-white"
                                  : "rounded-bl-md border border-gray-200 bg-white text-gray-700"
                              }`}
                            >

                              <p className="mb-1 text-[9px] font-semibold uppercase tracking-wide opacity-60">
                                {message.role ===
                                "user"
                                  ? "Customer"
                                  : "AI Assistant"}
                              </p>

                              <p className="whitespace-pre-wrap text-[12px] leading-5">
                                {message.content}
                              </p>

                            </div>

                          </div>
                        )
                      )}

                    </div>

                  </div>


                  {/* Bottom */}
                  <div className="border-t border-gray-100 bg-white px-6 py-4">

                    <div className="flex items-center justify-between gap-4">

                      <p className="text-[10px] text-gray-400">
                        Conversations are stored in your
                        ChatSupportAI database.
                      </p>

                      <span className="shrink-0 text-[10px] font-semibold text-gray-500">
                        {selectedConversation.messages?.length || 0}{" "}
                        messages
                      </span>

                    </div>

                  </div>
                </>
              )}

            </section>

          </div>
        )}

      </div>

    </main>
  );
}