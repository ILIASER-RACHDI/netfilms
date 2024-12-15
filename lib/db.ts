import {drizzle} from "drizzle-orm/postgres-js"
import  postgres from "postgres"
import * as schema from "./schema"

const pool = postgres('postgresql://users_owner:rF0cJzKE8ynD@ep-soft-math-a2m3wwzl.eu-central-1.aws.neon.tech/users?sslmode=require',{max:1})
export const db = drizzle(pool ,{
    schema
})