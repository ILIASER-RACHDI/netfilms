import { addUserFromDb } from "@/app/actions/addUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export function SignUp() {
  return (
    <form
      action={async (formData) => {
        // Convertir FormData en un objet JavaScript
        const data = Object.fromEntries(formData.entries());
        const email = data.email as string;
        const password = data.password as string;

        // Validation côté client
        if (!email || !password) {
          alert("Both email and password are required.");
          return;
        }

        // Appel à la fonction pour ajouter l'utilisateur
        const response = await addUserFromDb(email, password);

        if (!response.success) {
          alert(`Error: ${response.message}`);
          return;
        }

        // Succès
        alert("User registered successfully!");
      }}
    >
      <Label>Nom d’utilisateur*</Label>
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
              S'inscrire
      </Button>
    </form>
  );
}
