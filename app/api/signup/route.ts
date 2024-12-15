import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe déjà
    const existedUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existedUser) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 400 }
      );
    }

    // Ajouter un nouvel utilisateur
    await db.insert(users).values({
      email: email,
      password: password,
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
