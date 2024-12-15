'use server'
import { db } from "@/lib/db"
import { users } from "@/lib/schema"
import { eq } from "drizzle-orm"

type GetUserResult = {
    success?: boolean;
    message: string;
    data?: {
      id?: string;
      email?: string;
    };
  };

export async function getUserFromDb(email: string, password: string): Promise<GetUserResult> {
    try {
        const existedUsers = await db.query.users.findFirst({ 
            where: eq(users.email, email)
        })

        if(!existedUsers){
            return {
                success : false,
                message : "User not found",
            }
        }

        if(existedUsers.password !== password){ // hash the password here 
            return {
                success : false,
                message : "Password incorrect",
            }
        }
        return {
            success: true,
            message: "User authenticated",
            data: {
              id: existedUsers.id,
              email: existedUsers.email,
            },
          };

    } catch (error) {
        let errorMessage = "Internal server error";

        if (error instanceof Error) {
          errorMessage = error.message;
        }
        return {
            success: false,
            message : errorMessage,
        }
    }
}
