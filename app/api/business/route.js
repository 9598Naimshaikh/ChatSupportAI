import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Business from "@/models/Business";
import { getCurrentUser } from "@/lib/auth";

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
        }
      );
    }

    const body = await request.json();

    const {
      businessName,
      businessEmail,
      website,
      businessType,
      description,
      productsServices,
      faqs,
    } = body;

    // Validate required fields
    if (
      !businessName ||
      !businessEmail ||
      !website ||
      !businessType ||
      !description ||
      !productsServices
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    // Check whether this user already has a business
    const existingBusiness = await Business.findOne({
      owner: user._id,
    });

    if (existingBusiness) {
      return NextResponse.json(
        {
          success: false,
          message: "Business already exists.",
        },
        {
          status: 409,
        }
      );
    }

    // Create business
    const business = await Business.create({
      owner: user._id,
      businessName,
      businessEmail,
      website,
      businessType,
      description,
      productsServices,
      faqs: faqs || "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Business information saved successfully.",
        business: {
          id: business._id,
          businessName: business.businessName,
          businessEmail: business.businessEmail,
          website: business.website,
          businessType: business.businessType,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Business API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save business information.",
      },
      {
        status: 500,
      }
    );
  }
};

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

    if (!business) {
      return NextResponse.json(
        {
          success: true,
          business: null,
        },
        {
          status: 200,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        business,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Get business error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch business information.",
      },
      {
        status: 500,
      }
    );
  }
};


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
        }
      );
    }

    const body = await request.json();

    const {
      businessName,
      businessEmail,
      website,
      businessType,
      description,
      productsServices,
      faqs,
    } = body;

    if (
      !businessName ||
      !businessEmail ||
      !website ||
      !businessType ||
      !description ||
      !productsServices
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    const business = await Business.findOne({
      owner: user._id,
    });

    if (!business) {
      return NextResponse.json(
        {
          success: false,
          message: "Business not found.",
        },
        {
          status: 404,
        }
      );
    }

    business.businessName = businessName;
    business.businessEmail = businessEmail;
    business.website = website;
    business.businessType = businessType;
    business.description = description;
    business.productsServices = productsServices;
    business.faqs = faqs || "";

    await business.save();

    return NextResponse.json(
      {
        success: true,
        message: "Business information updated successfully.",
        business,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Update business error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update business information.",
      },
      {
        status: 500,
      }
    );
  }
};

