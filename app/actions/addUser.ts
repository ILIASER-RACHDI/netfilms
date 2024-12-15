"use server";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

type UserResult = {
  success: boolean;
  message: string;
  data?: {
    id: string;
    email?: string;
  };
};

export async function addUserFromDb(email : string, password: string): Promise<UserResult> {
  try {
    const existedUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existedUser) {
      return {
        success: false,
        message: "user already exists",
      };
    }

    // Insérer le nouvel utilisateur
    const [insertedUser] = await db
      .insert(users)
      .values({
        email: email,
        password: password,
      })
      .returning({ id: users.id, email: users.email });

          

    return {
      success: true,
      message: "User registered successfully",
      data: {
        id: insertedUser.id,
        email: insertedUser.email,
      },
    };
  } catch (error) {
    let errorMessage = "Internal server error";

    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      success: false,
      message: errorMessage,
    };
  }
}
