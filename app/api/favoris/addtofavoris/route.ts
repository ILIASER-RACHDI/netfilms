import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Connexion à la base de données
import { favoris} from "@/lib/schema"; // Tables
import { getServerSession } from "next-auth/next"; // Récupérer la session
import { authOptions } from "@/lib/authOptions"; // Configurations de next-auth

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: "Non autorisé. Connectez-vous." }, { status: 401 });
    }

    const userEmail = session.user.email;

    if (!userEmail) {
      return NextResponse.json({ success: false, message: "Email utilisateur introuvable dans la session." }, { status: 400 });
    }

    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, userEmail),
    });

    if (!user) {
      return NextResponse.json({ success: false, message: "Utilisateur non trouvé." }, { status: 404 });
    }

    const userId = user.id;

    // Lire le corps de la requête
    const { filmId, category } = await req.json();

    if (!filmId || !category) {
      return NextResponse.json({ success: false, message: "filmId et category sont requis." }, { status: 400 });
    }

    // Vérifier si le film est déjà dans les favoris
    const existingFavori = await db.query.favoris.findFirst({
      where: (favoris, { and, eq }) =>
        and(eq(favoris.userId, userId), eq(favoris.filmId, filmId)),
    });

    if (existingFavori) {
      return NextResponse.json({
        success: false,
        message: "Le film est déjà dans les favoris.",
      });
    }

    // Ajouter le favori dans la base de données
    await db.insert(favoris).values({
      userId,
      filmId,
      category,
    });

    return NextResponse.json({ success: true, message: "Favori ajouté avec succès." });
  } catch (error) {
    console.error("Erreur lors de l'ajout du favori :", error);
    return NextResponse.json({ success: false, message: "Erreur serveur." }, { status: 500 });
  }
}
