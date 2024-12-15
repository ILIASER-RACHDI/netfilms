import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Connexion à la base de données
import { getServerSession } from "next-auth/next"; // Récupérer la session
import { authOptions } from "@/lib/authOptions"; // Configurations de next-auth

export async function GET() {
  try {
    // Récupérer la session utilisateur
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: "Non autorisé. Connectez-vous." }, { status: 401 });
    }

    const userEmail = session.user.email;

    if (!userEmail) {
      return NextResponse.json({ success: false, message: "Email utilisateur introuvable dans la session." }, { status: 400 });
    }

    // Récupérer l'utilisateur dans la base de données
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, userEmail),
    });

    if (!user) {
      return NextResponse.json({ success: false, message: "Utilisateur non trouvé." }, { status: 404 });
    }

    const userId = user.id;

    // Récupérer les favoris de l'utilisateur
    const userFavoris = await db.query.favoris.findMany({
      where: (favoris, { eq }) => eq(favoris.userId, userId),
    });

    return NextResponse.json({
      success: true,
      favoris: userFavoris, // Contient les IDs des films et leurs catégories
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des favoris :", error);
    return NextResponse.json({ success: false, message: "Erreur serveur." }, { status: 500 });
  }
}
