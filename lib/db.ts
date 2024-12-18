import {drizzle} from "drizzle-orm/postgres-js"
import  postgres from "postgres"
import * as schema from "./schema"

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

const pool = postgres(process.env.DATABASE_URL,{max:1})
export const db = drizzle(pool ,{
    schema
})