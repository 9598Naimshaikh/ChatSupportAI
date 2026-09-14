import crypto from "crypto";
import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import User from "@/models/User";
import PasswordResetToken from "@/models/PasswordResetToken";

import { resend } from "@/lib/resend";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const email = body.email?.toLowerCase().trim();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email address is required.",
        },
        {
          status: 400,
        }
      );
    }

    const user = await User.findOne({
      email,
    });

    /*
      Don't reveal whether the email exists.
    */
    if (!user) {
      return NextResponse.json({
        success: true,
        message:
          "If an account exists with this email, a password reset link has been sent.",
      });
    }

    // Remove previous unused tokens
    await PasswordResetToken.deleteMany({
      user: user._id,
      usedAt: null,
    });

    // Generate secure random token
    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    // Hash token before storing it
    const tokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Token valid for 15 minutes
    const expiresAt = new Date(
      Date.now() + 15 * 60 * 1000
    );

    await PasswordResetToken.create({
      user: user._id,
      tokenHash,
      expiresAt,
    });

    // Application URL
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000";

    const resetLink =
      `${baseUrl}/reset-password?token=${encodeURIComponent(
        resetToken
      )}`;

    // Send reset email
    const { data, error } =
      await resend.emails.send({
        from:
          "ChatSupportAI <onboarding@resend.dev>",

        to: [user.email],

        subject:
          "Reset your ChatSupportAI password",

        html: `
          <div
            style="
              margin: 0;
              padding: 40px 20px;
              background: #f8f9fb;
              font-family: Arial, Helvetica, sans-serif;
              color: #111827;
            "
          >
            <div
              style="
                max-width: 560px;
                margin: 0 auto;
                padding: 32px;
                background: #ffffff;
                border: 1px solid #e5e7eb;
                border-radius: 18px;
              "
            >

              <div
                style="
                  font-size: 22px;
                  font-weight: 700;
                  margin-bottom: 24px;
                "
              >
                ChatSupport<span style="color: #2563eb;">
                  AI
                </span>
              </div>

              <h1
                style="
                  margin: 0;
                  font-size: 24px;
                  line-height: 1.3;
                "
              >
                Reset your password
              </h1>

              <p
                style="
                  margin-top: 16px;
                  color: #6b7280;
                  font-size: 14px;
                  line-height: 1.7;
                "
              >
                Hi ${user.name || "there"},
              </p>

              <p
                style="
                  color: #6b7280;
                  font-size: 14px;
                  line-height: 1.7;
                "
              >
                We received a request to reset the password
                for your ChatSupportAI account.
              </p>

              <div style="margin: 28px 0;">
                <a
                  href="${resetLink}"
                  style="
                    display: inline-block;
                    padding: 13px 20px;
                    background: #111827;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 10px;
                    font-size: 13px;
                    font-weight: 600;
                  "
                >
                  Reset Password
                </a>
              </div>

              <p
                style="
                  color: #6b7280;
                  font-size: 13px;
                  line-height: 1.7;
                "
              >
                This link will expire in
                <strong>15 minutes</strong>.
              </p>

              <p
                style="
                  color: #6b7280;
                  font-size: 13px;
                  line-height: 1.7;
                "
              >
                If you did not request a password reset,
                you can safely ignore this email.
              </p>

              <div
                style="
                  margin-top: 28px;
                  padding-top: 20px;
                  border-top: 1px solid #e5e7eb;
                  color: #9ca3af;
                  font-size: 11px;
                  line-height: 1.6;
                "
              >
                This is an automated email from ChatSupportAI.
                Please do not reply to this message.
              </div>

            </div>
          </div>
        `,
      });

    if (error) {
      console.error(
        "Resend password reset error:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to send password reset email.",
        },
        {
          status: 500,
        }
      );
    }

    console.log(
      "Password reset email sent:",
      data?.id
    );

    return NextResponse.json({
      success: true,
      message:
        "If an account exists with this email, a password reset link has been sent.",
    });
  } catch (error) {
    console.error(
      "Forgot password error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to process your password reset request.",
      },
      {
        status: 500,
      }
    );
  }
}