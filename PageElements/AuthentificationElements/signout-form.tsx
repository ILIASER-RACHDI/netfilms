"use client";

import { signOut } from "next-auth/react";

export function SignOut() {
  return (
    <form
      action={async () => {
        await signOut({
          callbackUrl: "/Auth", // Meme si cela est traite dans le middleware
        });
        
      }}
        >
      <button
        type="submit" >
        Sign Out
      </button>
    </form>
  );
}
