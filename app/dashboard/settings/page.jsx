import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const initial =
    user.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <main className="min-h-screen bg-[#f8f9fb] text-gray-900">

      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex min-h-[82px] max-w-[1200px] items-center justify-between gap-4 px-6 md:px-10">

          <div>
            <Link
              href="/dashboard"
              className="text-[14px] font-medium text-gray-500 transition hover:text-gray-900"
            >
              ← Back to Dashboard
            </Link>

            <h1 className="mt-2 text-[20px] font-bold text-gray-950">
              Settings
            </h1>
          </div>

          <span className="hidden rounded-full bg-gray-100 px-3 py-1.5 text-[11px] font-semibold text-gray-500 sm:block">
            ACCOUNT SETTINGS
          </span>

        </div>
      </header>


      {/* Main */}
      <div className="mx-auto max-w-[900px] px-6 py-10 md:px-10">

        {/* Intro */}
        <div className="mb-8">

          <h2 className="text-[28px] font-bold tracking-tight text-gray-950">
            Account settings
          </h2>

          <p className="mt-2 max-w-[650px] text-[14px] leading-6 text-gray-500">
            Manage your ChatSupportAI account and security
            preferences.
          </p>

        </div>


        {/* Profile */}
        <section className="rounded-2xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">

          <div className="border-b border-gray-100 px-6 py-5 md:px-8">

            <h3 className="text-[16px] font-bold text-gray-950">
              Profile
            </h3>

            <p className="mt-1 text-[12px] text-gray-500">
              Your account information.
            </p>

          </div>


          <div className="space-y-6 p-6 md:p-8">

            {/* Avatar + Name */}
            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#111827] text-lg font-bold text-white">
                {initial}
              </div>

              <div>

                <p className="text-[16px] font-bold text-gray-950">
                  {user.name}
                </p>

                <p className="mt-1 text-[12px] text-gray-500">
                  ChatSupportAI account
                </p>

              </div>

            </div>


            {/* Name */}
            <div>

              <label className="mb-2 block text-[13px] font-semibold text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                value={user.name}
                readOnly
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[13px] text-gray-700 outline-none"
              />

            </div>


            {/* Email */}
            <div>

              <label className="mb-2 block text-[13px] font-semibold text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[13px] text-gray-700 outline-none"
              />

            </div>


            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">

              <p className="text-[11px] leading-5 text-blue-700">
                Profile editing will be added later. For now,
                your account information is shown here for
                reference.
              </p>

            </div>

          </div>

        </section>


        {/* Security */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">

          <div className="border-b border-gray-100 px-6 py-5 md:px-8">

            <h3 className="text-[16px] font-bold text-gray-950">
              Security
            </h3>

            <p className="mt-1 text-[12px] text-gray-500">
              Manage your account security.
            </p>

          </div>


          <div className="space-y-4 p-6 md:p-8">

            <div className="flex flex-col gap-4 rounded-xl border border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h4 className="text-[13px] font-semibold text-gray-900">
                  Password
                </h4>

                <p className="mt-1 text-[11px] text-gray-500">
                  Change your account password.
                </p>

              </div>

              <Link
                href="/forgot-password"
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-center text-[12px] font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Reset Password
              </Link>

            </div>

          </div>

        </section>


        {/* Account */}
        <section className="mt-6 rounded-2xl border border-red-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">

          <div className="border-b border-red-100 px-6 py-5 md:px-8">

            <h3 className="text-[16px] font-bold text-gray-950">
              Account
            </h3>

            <p className="mt-1 text-[12px] text-gray-500">
              Sign out from your ChatSupportAI account.
            </p>

          </div>


          <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-8">

            <p className="text-[12px] leading-5 text-gray-500">
              Logging out will remove your current
              authentication session from this browser.
            </p>

            <LogoutButton />

          </div>

        </section>


        {/* Bottom */}
        <div className="mt-8 flex items-center justify-between">

          <p className="text-[11px] text-gray-400">
            ChatSupportAI
          </p>

          <Link
            href="/dashboard"
            className="text-[11px] font-semibold text-gray-500 hover:text-gray-900"
          >
            Back to Dashboard
          </Link>

        </div>

      </div>

    </main>
  );
}