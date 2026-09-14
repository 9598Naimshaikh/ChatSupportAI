import { generatePublicId } from "@/lib/publicId";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Chatbot from "@/models/Chatbot";
import { getCurrentUser } from "@/lib/auth";

// ==========================================
// GET CHATBOT CONFIGURATION
// ==========================================

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
        },
      );
    }

    const chatbot = await Chatbot.findOne({
      owner: user._id,
    }).lean();

    if (!chatbot) {
      return NextResponse.json(
        {
          success: true,
          chatbot: null,
        },
        {
          status: 200,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        chatbot,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Get chatbot error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch chatbot configuration.",
      },
      {
        status: 500,
      },
    );
  }
}

// ==========================================
// CREATE CHATBOT CONFIGURATION
// ==========================================

export async function POST(request) {
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
        },
      );
    }

    const body = await request.json();

    const { botName, welcomeMessage, tone, primaryColor, position } = body;

    // Validate required fields
    if (!botName || !welcomeMessage) {
      return NextResponse.json(
        {
          success: false,
          message: "Bot name and welcome message are required.",
        },
        {
          status: 400,
        },
      );
    }

    // Check if chatbot already exists
    const existingChatbot = await Chatbot.findOne({
      owner: user._id,
    });

    if (existingChatbot) {
      return NextResponse.json(
        {
          success: false,
          message: "Chatbot configuration already exists.",
        },
        {
          status: 409,
        },
      );
    }

    // Create chatbot
    const chatbot = await Chatbot.create({
      owner: user._id,
      publicId: generatePublicId(),
      botName,
      welcomeMessage,
      tone: tone || "Professional",
      primaryColor: primaryColor || "#111827",
      position: position || "bottom-right",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Chatbot configuration saved successfully.",
        chatbot,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Create chatbot error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save chatbot configuration.",
      },
      {
        status: 500,
      },
    );
  }
}

// ==========================================
// UPDATE CHATBOT CONFIGURATION
// ==========================================

export async function PUT(request) {
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
        },
      );
    }

    const body = await request.json();

    const { botName, welcomeMessage, tone, primaryColor, position } = body;

    // Validate required fields
    if (!botName || !welcomeMessage) {
      return NextResponse.json(
        {
          success: false,
          message: "Bot name and welcome message are required.",
        },
        {
          status: 400,
        },
      );
    }

    // Find user's chatbot
    const chatbot = await Chatbot.findOne({
      owner: user._id,
    });

    if (!chatbot) {
      return NextResponse.json(
        {
          success: false,
          message: "Chatbot configuration not found.",
        },
        {
          status: 404,
        },
      );
    }

    // Update fields
    chatbot.botName = botName;
    chatbot.welcomeMessage = welcomeMessage;
    chatbot.tone = tone || "Professional";
    chatbot.primaryColor = primaryColor || "#111827";
    chatbot.position = position || "bottom-right";

    await chatbot.save();

    return NextResponse.json(
      {
        success: true,
        message: "Chatbot configuration updated successfully.",
        chatbot,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Update chatbot error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update chatbot configuration.",
      },
      {
        status: 500,
      },
    );
  }
}
