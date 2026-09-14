import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/auth";

import Business from "@/models/Business";
import Chatbot from "@/models/Chatbot";
import Conversation from "@/models/Conversation";

import { generateAIResponse } from "@/lib/gemini";

export async function POST(request) {
  try {
    await connectDB();

    // ==========================================
    // 1. CHECK AUTHENTICATION
    // ==========================================

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

    // ==========================================
    // 2. GET REQUEST DATA
    // ==========================================

    const body = await request.json();

    const { message, sessionId } = body;

    if (!message || !message.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Message is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!sessionId || !sessionId.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Session ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================
    // 3. GET BUSINESS
    // ==========================================

    const business = await Business.findOne({
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

    // ==========================================
    // 4. GET CHATBOT CONFIGURATION
    // ==========================================

    const chatbot = await Chatbot.findOne({
      owner: user._id,
    }).lean();

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

    // ==========================================
    // 5. FIND OR CREATE CONVERSATION
    // ==========================================

    let conversation = await Conversation.findOne({
      owner: user._id,
      business: business._id,
      sessionId: sessionId.trim(),
    });

    if (!conversation) {
      conversation = await Conversation.create({
        owner: user._id,
        business: business._id,
        sessionId: sessionId.trim(),
        messages: [],
      });
    }

    // ==========================================
    // 6. GET PREVIOUS MESSAGES
    // ==========================================

    const previousMessages = conversation.messages.map(
      (item) => ({
        role: item.role,
        content: item.content,
      })
    );

    // ==========================================
    // 7. SAVE USER MESSAGE
    // ==========================================

    conversation.messages.push({
      role: "user",
      content: message.trim(),
    });

    // ==========================================
    // 8. BUILD AI PROMPT
    // ==========================================

    const conversationHistory = previousMessages
      .map((item) => {
        const speaker =
          item.role === "user" ? "Customer" : "Assistant";

        return `${speaker}: ${item.content}`;
      })
      .join("\n");

    const prompt = `
You are an AI customer support assistant for a business.

Your job is to answer customer questions using ONLY the business information provided below.

If the answer is not available in the business information, politely say that you do not have enough information and suggest contacting the business directly.

Do not invent products, prices, policies, services, contact information, working hours, or any other business details.

Keep your response clear, helpful, and concise.

Assistant name:
${chatbot.botName}

Assistant tone:
${chatbot.tone}

Business Name:
${business.businessName}

Business Type:
${business.businessType}

Business Description:
${business.description}

Products and Services:
${business.productsServices}

Frequently Asked Questions:
${business.faqs || "No FAQs provided."}

Previous Conversation:
${conversationHistory || "No previous conversation."}

Current Customer Question:
${message.trim()}
`;

    // ==========================================
    // 9. GET GEMINI RESPONSE
    // ==========================================

    const answer = await generateAIResponse(prompt);

    // ==========================================
    // 10. SAVE AI MESSAGE
    // ==========================================

    conversation.messages.push({
      role: "assistant",
      content: answer,
    });

    await conversation.save();

    // ==========================================
    // 11. RETURN RESPONSE
    // ==========================================

    return NextResponse.json(
      {
        success: true,
        answer,
        sessionId: conversation.sessionId,
        conversationId: conversation._id,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("AI chat error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate AI response.",
      },
      {
        status: 500,
      }
    );
  }
}