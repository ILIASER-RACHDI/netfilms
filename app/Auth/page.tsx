"use client";
import { useState } from "react";
import { signIn} from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { SignIn } from "@/PageElements/AuthentificationElements/signin-form";
import { SignUp } from "@/PageElements/AuthentificationElements/signup-from";

export default function AuthForm() {
  const [isRegister, setIsRegister] = useState<boolean>(false); // Gère le mode Connexion/Inscription
  const [loading, setLoading] = useState<boolean>(false); // Indique si une action est en cours 
  const [error, setError] = useState<string | null>(null); 


  // Connexion via un fournisseur
  const handleSignInProvider = async (provider: string) => {
    setLoading(true);
    try {
      await signIn(provider, {
        redirect: true,
        callbackUrl: "/",
      });
    } catch (err) {
      console.error("Provider sign-in error:", err);
      setError("An error occurred while signing in with the provider.");
    } finally {
      setLoading(false);
    }
  };
    return (
    <main className="bg-[#26313c] h-screen flex items-center justify-center p-10">
      <div className="grid w-full h-full grid-cols-1 bg-white box-anim md:grid-cols-2">
        {/* Section Connexion/Inscription */}
        <div className="bg-[#16202a] text-white flex items-center justify-center flex-col">
          <div className="my-4 text-center">
            <h1 className="text-3xl font-semibold ">
              {isRegister ? "Créer un compte" : "Connexion"}
            </h1>
            <p className="mt-2 text-xs text-slate-400">
              {isRegister
                ? "Inscrivez-vous pour accéder à vos données."
                : "Connectez-vous pour voir vos informations."}
            </p>
          </div>
          <br />
          {/* Boutons de connexion via les providers */}
          <div className="w-full max-w-xs">
            <Button
              className="flex items-center w-full gap-4 px-12 mb-4 bg-transparent rounded-full"
              variant="outline"
              onClick={() => handleSignInProvider("github")}
              disabled={loading}
            >
              <FaGithub size="25" />
              {isRegister ? "S’inscrire avec Github" : "Connexion avec Github"}
            </Button>
          </div>
          {/* Connexion classique avec email/password */}
                {isRegister ? <SignUp /> : <SignIn />}

                {/* Alternance Connexion/Inscription */}
                <Button
                  className="mt-4 text-sm text-white underline hover:text-indigo-400"
                  variant="link"
                  onClick={() => setIsRegister(!isRegister)}
                >
                  {isRegister
                    ? "Vous avez déjà un compte ? Connectez-vous"
                    : "Pas encore inscrit ? Créez un compte"}
                </Button>
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
        {/* Image côté droit */}
        <div className="relative hidden md:block">
          <Image
            className="object-cover"
            fill={true}
            src="/cinema.jpg"
            alt="cinema"
          />
        </div>
      </div>
    </main>
  );
}
