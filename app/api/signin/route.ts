'use server';

import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email and password are required" }), {
        status: 400,
      });
    }

    // Rechercher l'utilisateur dans la base de données
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // Comparer directement le mot de passe en clair
    if (user.password !== password) {
      return new Response(JSON.stringify({ error: "Invalid password" }), {
        status: 401,
      });
    }

    // Si tout est correct, retourner une réponse de succès
    return new Response(
      JSON.stringify({ success: true, message: "Logged in successfully" }),
      { status: 200 }
    );
  } catch (error) {
    let errorMessage = "Internal server error";

    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return new Response(JSON.stringify(errorMessage), {
      status: 500,
    });
  }
}
