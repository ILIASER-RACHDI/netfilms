import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existedUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existedUser) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash the password using bcrypt.hashSync
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    if(password==hashedPassword) {
      console.error("Passwords are the same. This is a potential security risk.");
      return NextResponse.json(
        { success: false, message: "Passwords are the same. This is a potential security risk." },
        { status: 400 }
      );  // Return an error message if the passwords are the same for security reasons. Otherwise, proceed to the registration.  // If the passwords are the same, it is a potential security risk. The user should be informed about this.
    }

    // Insert the new user into the database
    await db.insert(users).values({
      email: email,
      password: hashedPassword,
    });

    return NextResponse.json({ success: true, message: "User registered" });
  } catch (error) {
    console.error("Error during user registration:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
