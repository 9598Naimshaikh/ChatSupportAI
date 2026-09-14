import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import DashboardSidebar from "@/components/DashboardSidebar";

import connectDB from "@/lib/mongodb";
import Business from "@/models/Business";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  await connectDB();

  const business = await Business.findOne({
    owner: user._id,
  }).lean();

  const firstName = user.name?.split(" ")[0] || "User";
  const initial = user.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <main className="min-h-screen bg-[#f8f9fb] text-gray-900">
      <div className="flex min-h-screen">
        {/* =====================================================
            SIDEBAR
        ====================================================== */}

        <DashboardSidebar
          user={{
            name: user.name,
            email: user.email,
          }}
          initial={initial}
        />

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}
        <section className="min-w-0 flex-1">
          {/* Top Header */}
          <header className="flex min-h-20.5 items-center justify-between border-b border-gray-200 bg-white px-4 pl-20 sm:px-6 sm:pl-20 md:px-10 lg:pl-10">
            <div>
              <p className="text-[13px] text-gray-400">Dashboard</p>

              <h1 className="mt-0.5 text-[18px] font-semibold text-gray-900">
                Overview
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-[13px] font-semibold text-gray-900">
                  {user.name}
                </p>

                <p className="text-[11px] text-gray-400">{user.email}</p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111827] text-sm font-semibold text-white">
                {initial}
              </div>
            </div>
          </header>

          {/* =====================================================
              DASHBOARD CONTENT
          ====================================================== */}
          <div className="mx-auto w-full max-w-300 px-4 py-7 sm:px-6 sm:py-8 md:px-10 md:py-9">
            {/* Welcome */}
            <div className="mb-8">
              <h2 className="text-[24px] font-bold tracking-tight text-gray-950 sm:text-[27px]">
                Welcome back, {firstName} 👋
              </h2>

              <p className="mt-2 text-[14px] text-gray-500">
                Manage your business and AI customer support assistant from one
                place.
              </p>
            </div>

            {/* =================================================
                STATUS CARDS
            ================================================== */}
            <div className="grid gap-5 lg:grid-cols-3">
              {/* Business Card */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[13px] font-medium text-gray-500">
                      Business
                    </p>

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[13px] font-medium text-gray-500">
                            Business
                          </p>

                          <h3 className="mt-2 text-[20px] font-bold text-gray-950">
                            {business
                              ? business.businessName
                              : "Not configured"}
                          </h3>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-700">
                          ◇
                        </div>
                      </div>

                      {business ? (
                        <>
                          <div className="mt-4 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-green-500" />

                            <span className="text-[12px] font-semibold text-green-600">
                              Configured
                            </span>
                          </div>

                          <p className="mt-3 truncate text-[12px] text-gray-400">
                            {business.website}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="mt-5 text-[12px] leading-5 text-gray-400">
                            Add your business information to get started.
                          </p>

                          <Link
                            href="/dashboard/business"
                            className="mt-4 inline-block text-[12px] font-semibold text-blue-600 hover:text-blue-700"
                          >
                            Configure business →
                          </Link>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-700">
                    ◇
                  </div>
                </div>

                <p className="mt-5 text-[12px] leading-5 text-gray-400">
                  Add your business information to get started.
                </p>
              </div>

              {/* Chatbot Card */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[13px] font-medium text-gray-500">
                      AI Chatbot
                    </p>

                    <h3 className="mt-2 text-[20px] font-bold text-gray-950">
                      Not generated
                    </h3>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-900">
                    ✦
                  </div>
                </div>

                <p className="mt-5 text-[12px] leading-5 text-gray-400">
                  Your chatbot will appear here after setup.
                </p>
              </div>

              {/* System Status Card */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[13px] font-medium text-gray-500">
                      System Status
                    </p>

                    <h3 className="mt-2 text-[20px] font-bold text-green-600">
                      Active
                    </h3>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                  </div>
                </div>

                <p className="mt-5 text-[12px] leading-5 text-gray-400">
                  Your ChatSupportAI account is ready.
                </p>
              </div>
            </div>

            {/* =================================================
                GET STARTED
            ================================================== */}
            <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-175">
                  <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-600">
                    GET STARTED
                  </span>

                  <h2 className="mt-3 text-[21px] font-bold tracking-tight text-gray-950">
                    {business
                      ? "Your business is ready for the next step"
                      : "Configure your AI customer support"}
                  </h2>

                  <p className="mt-2 text-[13px] leading-6 text-gray-500">
                    {business
                      ? "Your business information has been saved. The next step is to configure your AI chatbot."
                      : "Add your business information and website details. ChatSupportAI will use this information to create an AI assistant that can answer your customers&apos; questions."}
                  </p>
                </div>

                <Link
                  href={business ? "/dashboard/chatbot" : "/dashboard/business"}
                  className="shrink-0 rounded-xl bg-[#111827] px-5 py-3 text-center text-[13px] font-semibold text-white transition hover:bg-gray-800"
                >
                  {business ? "Configure AI chatbot →" : "Set up business →"}
                </Link>
              </div>
            </div>

            {/* =================================================
                HOW IT WORKS
            ================================================== */}
            <div className="mt-9">
              <div>
                <h2 className="text-[18px] font-bold text-gray-950">
                  How ChatSupportAI works
                </h2>

                <p className="mt-1 text-[13px] text-gray-500">
                  Create your AI customer support assistant in a few steps.
                </p>
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-3">
                {/* Step 1 */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#111827] text-[13px] font-bold text-white">
                    1
                  </div>

                  <h3 className="mt-5 text-[15px] font-semibold text-gray-950">
                    Add your business
                  </h3>

                  <p className="mt-2 text-[12px] leading-5 text-gray-500">
                    Provide your business name, website and information about
                    your products or services.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#111827] text-[13px] font-bold text-white">
                    2
                  </div>

                  <h3 className="mt-5 text-[15px] font-semibold text-gray-950">
                    Generate your chatbot
                  </h3>

                  <p className="mt-2 text-[12px] leading-5 text-gray-500">
                    ChatSupportAI creates your AI assistant using your business
                    information.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#111827] text-[13px] font-bold text-white">
                    3
                  </div>

                  <h3 className="mt-5 text-[15px] font-semibold text-gray-950">
                    Add it to your website
                  </h3>

                  <p className="mt-2 text-[12px] leading-5 text-gray-500">
                    Copy the generated script and add it to your website to
                    activate the chatbot.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
