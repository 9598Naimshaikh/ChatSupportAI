import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/auth";

import Business from "@/models/Business";
import Chatbot from "@/models/Chatbot";

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

    const business = await Business.findOne({
      owner: user._id,
    }).lean();

    const chatbot = await Chatbot.findOne({
      owner: user._id,
    }).lean();

    if (!business) {
      return NextResponse.json(
        {
          success: false,
          message: "Business information not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (!chatbot) {
      return NextResponse.json(
        {
          success: false,
          message: "Chatbot configuration not found.",
        },
        {
          status: 404,
        }
      );
    }

    const context = {
      business: {
        name: business.businessName,
        email: business.businessEmail,
        website: business.website,
        type: business.businessType,
        description: business.description,
        productsServices: business.productsServices,
        faqs: business.faqs || "",
      },

      chatbot: {
        name: chatbot.botName,
        welcomeMessage: chatbot.welcomeMessage,
        tone: chatbot.tone,
      },
    };

    return NextResponse.json(
      {
        success: true,
        context,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("AI context error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to prepare AI context.",
      },
      {
        status: 500,
      }
    );
  }
}