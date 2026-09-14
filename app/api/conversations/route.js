import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/auth";

import Conversation from "@/models/Conversation";

export async function GET() {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const conversations = await Conversation.find({
      owner: user._id,
    })
      .sort({
        updatedAt: -1,
      })
      .lean();

    return NextResponse.json(
      {
        success: true,
        conversations,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Get conversations error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch conversations.",
      },
      {
        status: 500,
      }
    );
  }
}