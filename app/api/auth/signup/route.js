import { generateToken } from "@/lib/jwt";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import dns from "dns";
import { cookies } from "next/headers";

dns.setServers([
    "2.2.2.2",
    "9.9.9.9"
]);

export async function POST(request) {
    try {
        // Connect to MongoDB.
        await connectDB();

        // Get data from request 
        const {name, email, password} = await request.json();

        // basic validation.
        if (!name || !email || !password) {
            return Response.json(
                {
                    success: false,
                    message: "All fields are required",
                },
                {status: 400}
            )
        };

        // Check password length 
        if (password.length < 6) {
            return Response.json(
                {
                    success: false,
                    message: "Password must be atleast 6 characters.",
                },
                {status: 400}
            )
        }

        // Convert email to lowercase.
        const normalizedEmail = email.toLowerCase().trim();

        // Check if user already exists
        const existingUser = await User.findOne({email: normalizedEmail});

        if (existingUser) {
            return Response.json(
                {
                    success: false,
                    message: "User with this email already exists",
                },
                {status: 409}
            );
        }

        // Hash password using bcryptjs
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new User.
        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
        });

        // Generate JWT
        const token = generateToken(user);

        // Store JWT in HttpOnly cookie
        const cookieStore = await cookies();

        cookieStore.set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        });

        // Return response without password
        return Response.json(
            {
                success: true,
                message: "Account Created Successfully.",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
            },
            {status: 201}
        )
    } catch (error) {
        console.log("Signup error: ", error);

        return Response.json(
            {
                success: false,
                message: "Something went wrong while creating the account",
            },
            {status: 500}
        )
    }
}
