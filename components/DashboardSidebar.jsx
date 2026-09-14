"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default function DashboardSidebar({ user, initial }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: "▦",
    },
    {
      href: "/dashboard/business",
      label: "Business",
      icon: "▣",
    },
    {
      href: "/dashboard/chatbot",
      label: "Chatbot",
      icon: "✧",
    },
    {
      href: "/dashboard/conversations",
      label: "Conversations",
      icon: "◌",
    },
  ];

  const closeSidebar = () => {
    setOpen(false);
  };

  const isActive = (href) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      {/* =====================================================
          MOBILE / TABLET MENU BUTTON
      ====================================================== */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        className="fixed left-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-xl text-gray-800 shadow-sm transition hover:bg-gray-50 lg:hidden"
      >
        ☰
      </button>

      {/* =====================================================
          MOBILE / TABLET OVERLAY
      ====================================================== */}
      {open && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-72 flex-col
          border-r border-gray-200 bg-white
          shadow-xl transition-transform duration-300 ease-in-out
          lg:static lg:z-auto lg:w-61.25 lg:shrink-0
          lg:translate-x-0 lg:shadow-none
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* =================================================
            LOGO / HEADER
        ================================================== */}
        <div className="flex h-20.5 shrink-0 items-center justify-between border-b border-gray-100 px-6 lg:px-7">
          <Link
            href="/"
            onClick={closeSidebar}
            className="text-[21px] font-bold tracking-tight"
          >
            ChatSupport
            <span className="text-blue-600">AI</span>
          </Link>

          {/* Mobile / Tablet close button */}
          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 lg:hidden"
          >
            ✕
          </button>
        </div>

        {/* =================================================
            NAVIGATION
        ================================================== */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-7">
          {/* Workspace */}
          <div>
            <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400">
              Workspace
            </p>

            <nav className="space-y-1">
              {navigation.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeSidebar}
                    className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-[14px] transition ${
                      active
                        ? "bg-[#111827] font-semibold text-white shadow-sm"
                        : "font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[15px]">
                      {item.icon}
                    </span>

                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Account */}
          <div className="mt-9">
            <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400">
              Account
            </p>

            <Link
              href="/dashboard/settings"
              onClick={closeSidebar}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-[14px] transition ${
                isActive("/dashboard/settings")
                  ? "bg-[#111827] font-semibold text-white shadow-sm"
                  : "font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[15px]">
                ⚙
              </span>

              <span>Settings</span>
            </Link>
          </div>
        </div>

        {/* =================================================
            USER SECTION
        ================================================== */}
        <div className="shrink-0 border-t border-gray-100 p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111827] text-sm font-semibold text-white">
              {initial}
            </div>

            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-gray-900">
                {user.name}
              </p>

              <p className="truncate text-[11px] text-gray-500">
                {user.email}
              </p>
            </div>
          </div>

          <LogoutButton />
        </div>
      </aside>
    </>
  );
}