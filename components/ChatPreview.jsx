export default function ChatPreview() {
  return (
    <section className="px-6 pb-16">
      <div className="mx-auto max-w-5xl">

        {/* Preview Container */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-sm">

          {/* Top Label */}
          <div className="mb-5 flex items-center justify-between">
            <p className="text-xs font-medium text-gray-500">
              ChatSupportAI Preview
            </p>

            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-[10px] text-gray-500">
                Online
              </span>
            </div>
          </div>

          {/* Preview Area */}
          <div className="flex min-h-75 items-center justify-between gap-8 rounded-xl bg-white p-8">

            {/* Left Content */}
            <div className="max-w-sm">
              <p className="mb-2 text-xs font-medium text-gray-400">
                READY TO BUILD YOUR AI CHATBOT?
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Create and customize your AI chatbot in minutes.
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Add your business information and let ChatSupportAI
                handle common customer questions automatically.
              </p>

              <button className="mt-6 rounded-md bg-black px-5 py-2.5 text-xs font-medium text-white transition hover:bg-gray-800">
                Lets Start →
              </button>
            </div>

            {/* Chat Window */}
            <div className="hidden w-80 rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm sm:block">

              {/* Chat Header */}
              <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                  AI
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-900">
                    ChatSupportAI
                  </p>

                  <p className="text-[10px] text-gray-400">
                    AI Assistant
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="space-y-3 py-4">

                <div className="ml-auto max-w-[80%] rounded-lg bg-black px-3 py-2 text-[11px] text-white">
                  Do you offer cash on delivery?
                </div>

                <div className="max-w-[80%] rounded-lg border border-gray-200 bg-white px-3 py-2 text-[11px] text-gray-600">
                  Yes, cash on delivery is available for
                  eligible orders.
                </div>

              </div>

              {/* Input */}
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
                <span className="flex-1 text-[10px] text-gray-400">
                  Type your message...
                </span>

                <span className="text-xs font-bold text-gray-400">
                  ↑
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}