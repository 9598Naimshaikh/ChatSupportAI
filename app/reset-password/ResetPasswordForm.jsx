"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ResetPasswordForm({
  token,
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(true);
  const [resetting, setResetting] = useState(false);

  const [validToken, setValidToken] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function verifyToken() {
      if (!token) {
        setError("Reset token is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/auth/reset-password?token=${encodeURIComponent(
            token
          )}`
        );

        const data = await response.json();

        if (!response.ok || !data.valid) {
          setError(
            data.message ||
              "This reset link is invalid or expired."
          );

          setValidToken(false);
          return;
        }

        setValidToken(true);
      } catch (error) {
        console.error(
          "Token verification error:",
          error
        );

        setError(
          "Unable to verify the reset link."
        );
      } finally {
        setLoading(false);
      }
    }

    verifyToken();
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();

    setMessage("");
    setError("");

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters long."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    setResetting(true);

    try {
      const response = await fetch(
        "/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            token,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to reset password."
        );
        return;
      }

      setMessage(data.message);

      setPassword("");
      setConfirmPassword("");

      setValidToken(false);
    } catch (error) {
      console.error(
        "Reset password error:",
        error
      );

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setResetting(false);
    }
  }

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f9fb] px-6">

        <div className="text-center">

          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />

          <p className="mt-3 text-[12px] text-gray-500">
            Verifying reset link...
          </p>

        </div>

      </main>
    );
  }

  // ==========================================
  // SUCCESS
  // ==========================================

  if (message) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f9fb] px-6 py-12">

        <div className="w-full max-w-md">

          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-[0_20px_70px_rgba(0,0,0,0.07)]">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-2xl text-green-600">
              ✓
            </div>

            <h1 className="mt-6 text-[25px] font-bold tracking-tight text-gray-950">
              Password updated
            </h1>

            <p className="mt-3 text-[13px] leading-6 text-gray-500">
              {message}
            </p>

            <Link
              href="/login"
              className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-[#111827] px-5 py-3.5 text-[13px] font-semibold text-white transition hover:bg-gray-800"
            >
              Continue to Login
            </Link>

          </div>

        </div>

      </main>
    );
  }

  // ==========================================
  // INVALID TOKEN
  // ==========================================

  if (!validToken) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f9fb] px-6 py-12">

        <div className="w-full max-w-md">

          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-[0_20px_70px_rgba(0,0,0,0.07)]">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-xl text-red-600">
              !
            </div>

            <h1 className="mt-6 text-[25px] font-bold tracking-tight text-gray-950">
              Reset link unavailable
            </h1>

            <p className="mt-3 text-[13px] leading-6 text-gray-500">
              {error ||
                "This reset link is invalid or has expired."}
            </p>

            <Link
              href="/forgot-password"
              className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-[#111827] px-5 py-3.5 text-[13px] font-semibold text-white transition hover:bg-gray-800"
            >
              Request a New Link
            </Link>

          </div>

        </div>

      </main>
    );
  }

  // ==========================================
  // RESET PASSWORD FORM
  // ==========================================

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

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-xl">
            🔐
          </div>

          <div className="mt-6 text-center">

            <h1 className="text-[28px] font-bold tracking-tight text-gray-950">
              Create a new password
            </h1>

            <p className="mt-2 text-[13px] leading-6 text-gray-500">
              Choose a strong password for your
              ChatSupportAI account.
            </p>

          </div>


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

            {/* Password */}
            <div>

              <label
                htmlFor="password"
                className="mb-2 block text-[13px] font-semibold text-gray-700"
              >
                New Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="At least 6 characters"
                autoComplete="new-password"
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[13px] text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/5"
              />

            </div>


            {/* Confirm Password */}
            <div>

              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-[13px] font-semibold text-gray-700"
              >
                Confirm New Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                placeholder="Enter your password again"
                autoComplete="new-password"
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[13px] text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/5"
              />

            </div>


            {/* Submit */}
            <button
              type="submit"
              disabled={resetting}
              className="flex w-full items-center justify-center rounded-xl bg-[#111827] px-5 py-3.5 text-[13px] font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {resetting
                ? "Updating Password..."
                : "Reset Password"}
            </button>

          </form>


          <div className="mt-7 text-center">

            <Link
              href="/login"
              className="text-[12px] font-semibold text-gray-600 transition hover:text-gray-950"
            >
              ← Back to Login
            </Link>

          </div>

        </div>


        <p className="mt-6 text-center text-[11px] text-gray-400">
          ChatSupportAI · Secure account recovery
        </p>

      </div>

    </main>
  );
}