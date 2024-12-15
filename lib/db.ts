import {drizzle} from "drizzle-orm/postgres-js"
import  postgres from "postgres"
import * as schema from "./schema"

DATABASE_URL = process.env.DATABASE_URL;
const pool = postgres(DATABASE_URL,{max:1})
export const db = drizzle(pool ,{
    schema
})