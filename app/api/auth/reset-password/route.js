import crypto from "crypto";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import PasswordResetToken from "@/models/PasswordResetToken";

function hashToken(token) {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}

async function findValidToken(token) {
  if (!token || typeof token !== "string") {
    return null;
  }

  const tokenHash = hashToken(token);

  const resetToken = await PasswordResetToken.findOne({
    tokenHash,
    usedAt: null,
    expiresAt: {
      $gt: new Date(),
    },
  });

  return resetToken;
}

// ==========================================
// VERIFY RESET TOKEN
// GET /api/auth/reset-password?token=...
// ==========================================

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          valid: false,
          message: "Reset token is missing.",
        },
        {
          status: 400,
        }
      );
    }

    const resetToken = await findValidToken(token);

    if (!resetToken) {
      return NextResponse.json(
        {
          success: false,
          valid: false,
          message:
            "This reset link is invalid or has expired.",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      success: true,
      valid: true,
      message: "Reset token is valid.",
    });
  } catch (error) {
    console.error("Reset token verification error:", error);

    return NextResponse.json(
      {
        success: false,
        valid: false,
        message: "Unable to verify reset link.",
      },
      {
        status: 500,
      }
    );
  }
}

// ==========================================
// RESET PASSWORD
// POST /api/auth/reset-password
// ==========================================

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const token = body.token;
    const password = body.password;

    if (!token || !password) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Reset token and new password are required.",
        },
        {
          status: 400,
        }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Password must be at least 6 characters long.",
        },
        {
          status: 400,
        }
      );
    }

    // Find valid token
    const resetToken = await findValidToken(token);

    if (!resetToken) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This reset link is invalid or has expired.",
        },
        {
          status: 400,
        }
      );
    }

    // Find user
    const user = await User.findById(
      resetToken.user
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User account not found.",
        },
        {
          status: 404,
        }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(
      password,
      12
    );

    // Update password
    user.password = hashedPassword;

    await user.save();

    // Mark token as used
    resetToken.usedAt = new Date();

    await resetToken.save();

    // Invalidate any other unused tokens
    await PasswordResetToken.deleteMany({
      user: user._id,
      _id: {
        $ne: resetToken._id,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Password reset successfully. You can now log in with your new password.",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to reset your password.",
      },
      {
        status: 500,
      }
    );
  }
}