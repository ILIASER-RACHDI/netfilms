//import { signIn } from "@/auth.ts"
"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";

export function SignIn() {
  return (
    <form
      action={async (formData) => {
        // Convertir FormData en un objet JavaScript
        const data = Object.fromEntries(formData.entries())
        await signIn("credentials", {
            email: data.email as string,
            password: data.password as string,
            callbackUrl: "/", // Redirection après connexion
          });
      }}
    >

      <Label >Nom d’utilisateur*</Label>
          <Input
            className="mt-2 mb-4 bg-transparent rounded-full"
            type="text"
            id="username"
            name="email"
            placeholder="Nom d’utilisateur"
                                    />
      <Label htmlFor="password">Mot de passe*</Label>
          <Input
            className="mt-2 bg-transparent rounded-full"
            type="password"
            id="password"
            name="password"
            placeholder="Mot de passe"
            />
            <Button
              type="submit"
              style={{
                width: "100%",
                marginTop: "1.5rem",
                backgroundColor: "#4f46e5",
                borderRadius: "9999px",
                color: "white",
                padding: "0.75rem",
                textAlign: "center",
              }}
            >
        Connexion
      </Button>


    </form>
  )
}
