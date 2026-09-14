"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        "/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to process your request."
        );
        return;
      }

      setMessage(data.message);
      setEmail("");
    } catch (error) {
      console.error(
        "Forgot password request error:",
        error
      );

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f9fb] px-6 py-12">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="text-[24px] font-bold tracking-tight text-gray-950"
          >
            ChatSupport
            <span className="text-blue-600">
              AI
            </span>
          </Link>
        </div>


        {/* Card */}
        <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-[0_20px_70px_rgba(0,0,0,0.07)] sm:p-8">

          {/* Icon */}
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-lg">
            🔐
          </div>

          {/* Heading */}
          <div className="mt-6 text-center">

            <h1 className="text-[28px] font-bold tracking-tight text-gray-950">
              Forgot your password?
            </h1>

            <p className="mt-2 text-[13px] leading-6 text-gray-500">
              Enter the email address associated with your
              account and we will help you reset your password.
            </p>

          </div>


          {/* Success */}
          {message && (
            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-[12px] leading-5 text-green-700">
              {message}
            </div>
          )}


          {/* Error */}
          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[12px] leading-5 text-red-600">
              {error}
            </div>
          )}


          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-5"
          >

            <div>

              <label
                htmlFor="email"
                className="mb-2 block text-[13px] font-semibold text-gray-700"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[13px] text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/5"
              />

            </div>


            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-xl bg-[#111827] px-5 py-3.5 text-[13px] font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Sending..."
                : "Send Reset Link"}
            </button>

          </form>


          {/* Login */}
          <div className="mt-7 text-center">

            <Link
              href="/login"
              className="text-[12px] font-semibold text-gray-600 transition hover:text-gray-950"
            >
              ← Back to Login
            </Link>

          </div>

        </div>


        {/* Footer */}
        <p className="mt-6 text-center text-[11px] text-gray-400">
          ChatSupportAI · Secure account recovery
        </p>

      </div>

    </main>
  );
}