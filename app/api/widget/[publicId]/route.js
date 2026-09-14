import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Chatbot from "@/models/Chatbot";
import Business from "@/models/Business";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { publicId } = await params;

    if (!publicId) {
      return NextResponse.json(
        {
          success: false,
          message: "Chatbot ID is required.",
        },
        {
          status: 400,
        },
      );
    }

    // Find chatbot using public ID
    const chatbot = await Chatbot.findOne({
      publicId,
    }).lean();

    if (!chatbot) {
      return NextResponse.json(
        {
          success: false,
          message: "Chatbot not found.",
        },
        {
          status: 404,
        },
      );
    }

    // Find the business owned by the same user
    const business = await Business.findOne({
      owner: chatbot.owner,
    }).lean();

    if (!business) {
      return NextResponse.json(
        {
          success: false,
          message: "Business information not found.",
        },
        {
          status: 404,
        },
      );
    }

    // Return only public-safe information
    return NextResponse.json(
      {
        success: true,
        chatbot: {
          publicId: chatbot.publicId,
          botName: chatbot.botName,
          welcomeMessage: chatbot.welcomeMessage,
          tone: chatbot.tone,
          primaryColor: chatbot.primaryColor,
          position: chatbot.position,
        },

        business: {
          name: business.businessName,
        },
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  } catch (error) {
    console.error("Public widget config error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load chatbot configuration.",
      },
      {
        status: 500,
      },
    );
  }
}
