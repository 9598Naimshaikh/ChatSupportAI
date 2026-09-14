import { cookies } from "next/headers";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { verifyToken } from "@/lib/jwt";

export async function GET() {
  try {
    // Get cookies
    const cookieStore = await cookies();

    // Get JWT token
    const token = cookieStore.get("auth_token")?.value;

    // No token
    if (!token) {
      return Response.json(
        {
          success: false,
          authenticated: false,
          message: "Not authenticated",
        },
        { status: 401 }
      );
    }

    // Verify JWT
    const decoded = verifyToken(token);

    if (!decoded) {
      return Response.json(
        {
          success: false,
          authenticated: false,
          message: "Invalid or expired token",
        },
        { status: 401 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Find user
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return Response.json(
        {
          success: false,
          authenticated: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Return current user
    return Response.json({
      success: true,
      authenticated: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Auth check error:", error);

    return Response.json(
      {
        success: false,
        authenticated: false,
        message: "Authentication check failed",
      },
      { status: 500 }
    );
  }
}