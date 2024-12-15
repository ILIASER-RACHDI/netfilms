import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Charge les variables d'environnement depuis .env
dotenv.config();

export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/schema.ts",
  out: "./drizzle",
  dbCredentials:{
    url: 'postgresql://users_owner:rF0cJzKE8ynD@ep-soft-math-a2m3wwzl.eu-central-1.aws.neon.tech/users?sslmode=require',
  }
});
