"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Sparkles, Check } from "lucide-react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      setMessage(data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Signup error:", error);
      setError("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fafafa] text-gray-900">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* ================= LEFT SIDE ================= */}
        <section className="relative hidden overflow-hidden bg-black lg:flex">
          
          {/* Background Glow */}
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
                <Sparkles size={20} />
              </div>

              <span className="text-xl font-semibold tracking-tight text-white">
                ChatSupportAI
              </span>
            </Link>

            {/* Main Content */}
            <div className="max-w-xl">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur">
                <Sparkles size={15} />
                AI-powered customer support
              </div>

              <h1 className="text-5xl font-semibold leading-tight tracking-tight text-white xl:text-6xl">
                Turn your website into a{" "}
                <span className="text-gray-400">
                  24/7 AI support agent.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-gray-400">
                Create an intelligent chatbot for your business, connect it to
                your website, and let AI answer your customers automatically.
              </p>

              {/* Features */}
              <div className="mt-10 space-y-4">

                <Feature text="AI answers based on your business information" />

                <Feature text="Easy-to-embed chatbot for any website" />

                <Feature text="Manage your chatbot from one dashboard" />

              </div>
            </div>

            {/* Bottom */}
            <p className="text-sm text-gray-500">
              © 2026 ChatSupportAI. All rights reserved.
            </p>
          </div>
        </section>

        {/* ================= RIGHT SIDE ================= */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="mb-10 flex items-center justify-center lg:hidden">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                  <Sparkles size={20} />
                </div>

                <span className="text-xl font-semibold">
                  ChatSupportAI
                </span>
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-semibold tracking-tight">
                Create your account
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Start building your AI customer support assistant.
              </p>
            </div>

            {/* Signup Card */}
            <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-[0_20px_70px_rgba(0,0,0,0.08)] sm:p-8">

              {/* Google Button */}
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium transition hover:bg-gray-50"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21.805 12.23c0-.79-.065-1.55-.205-2.28H12v4.32h5.49a4.69 4.69 0 01-2.04 3.08v2.56h3.3c1.93-1.78 3.055-4.4 3.055-7.68z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 22c2.76 0 5.075-.915 6.765-2.485l-3.3-2.56c-.915.615-2.08.98-3.465.98-2.665 0-4.925-1.8-5.735-4.22H2.85v2.64A10.22 10.22 0 0012 22z"
                    fill="#34A853"
                  />
                  <path
                    d="M6.265 13.715A6.14 6.14 0 015.945 12c0-.595.11-1.17.32-1.715v-2.64H2.85A10.01 10.01 0 002 12c0 1.615.385 3.14 1.06 4.355l3.205-2.64z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 6.065c1.5 0 2.845.515 3.905 1.525l2.925-2.925C17.07 2.99 14.755 2 12 2a10.22 10.22 0 00-9.15 5.645l3.205 2.64C7.075 7.865 9.335 6.065 12 6.065z"
                    fill="#EA4335"
                  />
                </svg>

                Continue with Google
              </button>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200" />

                <span className="text-xs text-gray-400">
                  OR
                </span>

                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Full name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Email address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      required
                      minLength={6}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-12 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-gray-400">
                    Use at least 6 characters.
                  </p>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 rounded border-gray-300"
                  />

                  <p className="text-xs leading-5 text-gray-500">
                    I agree to the{" "}
                    <Link
                      href="#"
                      className="font-medium text-gray-900 hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="#"
                      className="font-medium text-gray-900 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>

                {/* Error */}
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                {/* Success */}
                {message && (
                  <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    {message}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account
                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Login */}
            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-black hover:underline"
              >
                Sign in
              </Link>
            </p>

            {/* Security */}
            <p className="mt-8 text-center text-xs text-gray-400">
              Your information is securely protected.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ================= FEATURE COMPONENT ================= */

function Feature({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10">
        <Check size={14} className="text-white" />
      </div>

      <span className="text-sm text-gray-300">
        {text}
      </span>
    </div>
  );
}