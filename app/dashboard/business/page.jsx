"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function BusinessPage() {
  const [formData, setFormData] = useState({
    businessName: "",
    businessEmail: "",
    website: "",
    businessType: "",
    description: "",
    productsServices: "",
    faqs: "",
  });

  const [loading, setLoading] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [businessExists, setBusinessExists] = useState(false);

  useEffect(() => {
    async function loadBusiness() {
      try {
        const response = await fetch("/api/business");

        const data = await response.json();

        if (data.success && data.business) {
          setBusinessExists(true);

          setFormData({
            businessName: data.business.businessName || "",
            businessEmail: data.business.businessEmail || "",
            website: data.business.website || "",
            businessType: data.business.businessType || "",
            description: data.business.description || "",
            productsServices: data.business.productsServices || "",
            faqs: data.business.faqs || "",
          });
        }
      } catch (error) {
        console.error("Load business error:", error);
      } finally {
        setPageLoading(false);
      }
    }

    loadBusiness();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/business", {
        method: businessExists ? "PUT" : "POST",
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

      setBusinessExists(true);
      setIsEditing(false);

      alert(
        businessExists
          ? "Business information updated successfully!"
          : "Business information saved successfully!",
      );
    } catch (error) {
      console.error("Business save error:", error);

      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (pageLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f9fb]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />

          <p className="mt-3 text-[12px] text-gray-500">
            Loading business information...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f9fb] text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-20.5 max-w-300 items-center justify-between px-6 md:px-10">
          <div>
            <Link
              href="/dashboard"
              className="text-[14px] font-medium text-gray-500 transition hover:text-gray-900"
            >
              ← Back to Dashboard
            </Link>

            <h1 className="mt-2 text-[20px] font-bold text-gray-950">
              Business Setup
            </h1>
          </div>

          <div className="hidden sm:block">
            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-semibold text-blue-600">
              CHATBOT SETUP
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-225 px-6 py-10 md:px-10">
        {/* Introduction */}
        <div className="mb-8">
          <h2 className="text-[28px] font-bold tracking-tight text-gray-950">
            {businessExists
              ? "Business Information"
              : "Tell us about your business"}
          </h2>

          <p className="mt-2 max-w-175 text-[14px] leading-6 text-gray-500">
            {businessExists
              ? "Update your business information whenever you need to keep your AI assistant accurate."
              : "Add information about your business so ChatSupportAI can understand your website and provide accurate answers to your customers."}
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] md:p-8"
        >
          {/* ==============================
              BASIC INFORMATION
          =============================== */}
          <div>
            <div className="mb-6">
              <h3 className="text-[17px] font-bold text-gray-950">
                Basic Information
              </h3>

              <p className="mt-1 text-[12px] text-gray-500">
                Basic information about your business.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Business Name */}
              <div>
                <label
                  htmlFor="businessName"
                  className="mb-2 block text-[13px] font-semibold text-gray-700"
                >
                  Business Name
                </label>

                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="e.g. Acme Technologies"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[13px] text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/5"
                />
              </div>

              {/* Business Email */}
              <div>
                <label
                  htmlFor="businessEmail"
                  className="mb-2 block text-[13px] font-semibold text-gray-700"
                >
                  Business Email
                </label>

                <input
                  id="businessEmail"
                  name="businessEmail"
                  type="email"
                  value={formData.businessEmail}
                  onChange={handleChange}
                  placeholder="support@example.com"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[13px] text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/5"
                />
              </div>

              {/* Website */}
              <div>
                <label
                  htmlFor="website"
                  className="mb-2 block text-[13px] font-semibold text-gray-700"
                >
                  Website URL
                </label>

                <input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[13px] text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/5"
                />
              </div>

              {/* Business Type */}
              <div>
                <label
                  htmlFor="businessType"
                  className="mb-2 block text-[13px] font-semibold text-gray-700"
                >
                  Business Type
                </label>

                <input
                  id="businessType"
                  name="businessType"
                  type="text"
                  value={formData.businessType}
                  onChange={handleChange}
                  placeholder="e.g. E-commerce, SaaS, Education"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[13px] text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/5"
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 h-px bg-gray-100" />

          {/* ==============================
              BUSINESS DESCRIPTION
          =============================== */}
          <div>
            <div className="mb-6">
              <h3 className="text-[17px] font-bold text-gray-950">
                Business Details
              </h3>

              <p className="mt-1 text-[12px] text-gray-500">
                Give the AI information about your business.
              </p>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-[13px] font-semibold text-gray-700"
              >
                Business Description
              </label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what your business does, who your customers are, and what your business provides..."
                required
                rows={5}
                className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-[13px] leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/5"
              />

              <p className="mt-2 text-[11px] text-gray-400">
                Provide clear information because the AI will use this
                information when answering customer questions.
              </p>
            </div>

            {/* Products / Services */}
            <div className="mt-5">
              <label
                htmlFor="productsServices"
                className="mb-2 block text-[13px] font-semibold text-gray-700"
              >
                Products & Services
              </label>

              <textarea
                id="productsServices"
                name="productsServices"
                value={formData.productsServices}
                onChange={handleChange}
                placeholder="List your main products, services, pricing information, features, etc..."
                required
                rows={5}
                className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-[13px] leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/5"
              />
            </div>

            {/* FAQs */}
            <div className="mt-5">
              <label
                htmlFor="faqs"
                className="mb-2 block text-[13px] font-semibold text-gray-700"
              >
                Frequently Asked Questions
              </label>

              <textarea
                id="faqs"
                name="faqs"
                value={formData.faqs}
                onChange={handleChange}
                placeholder={`Example:

Q: What are your business hours?
A: We are open Monday to Friday from 9 AM to 6 PM.

Q: Do you offer refunds?
A: Yes, refunds are available within 7 days.`}
                rows={7}
                className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-[13px] leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/5"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 h-px bg-gray-100" />

          {/* Information Notice */}
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-[13px] text-blue-600">
                ✦
              </div>

              <div>
                <h4 className="text-[12px] font-semibold text-blue-900">
                  Important
                </h4>

                <p className="mt-1 text-[11px] leading-5 text-blue-700">
                  The information you provide will be used as the knowledge
                  source for your AI customer support assistant.
                </p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Link
              href="/dashboard"
              className="rounded-xl border border-gray-200 px-5 py-3 text-center text-[13px] font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#111827] px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? businessExists
                  ? "Updating..."
                  : "Saving..."
                : businessExists
                  ? "Update Business Information"
                  : "Save Business Information"}
            </button>
          </div>
        </form>

        {/* Bottom Information */}
        <div className="mt-6 text-center">
          <p className="text-[11px] text-gray-400">
            You can update your business information anytime from your
            dashboard.
          </p>
        </div>
      </div>
    </main>
  );
}
