import {
    integer,
    pgTable,
    primaryKey,
    text,
    timestamp,
  } from "drizzle-orm/pg-core";
  
  // Table des utilisateurs
  export const users = pgTable("user", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()), // Génère un UUID par défaut pour l'ID
    email: text("email").unique().notNull(), // Email unique
    password: text("password"), // Mot de passe
    name: text("name"), // Nom de l'utilisateur
    emailVerified: timestamp("emailVerified", { mode: "date" }), // Date de vérification de l'email
    image: text("image"), // Image de l'utilisateur
  });
  export const favoris = pgTable("favoris", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()), // ID unique pour chaque favori
    userId: text("userId").references(() => users.id), // ID de l'utilisateur
    filmId: text("filmId"), // ID du film
    category: text("category"), // Catégorie du film
  });
  
  
  // Table des comptes
  export const account = pgTable(
    "account",
    {
      userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }), // Référence à l'utilisateur
      type: text("type").$type<"oauth" | "credentials">().notNull(), // Type de compte (OAuth, Credentials)
      provider: text("provider").notNull(), // Provider (ex : GitHub, Google)
      providerAccountId: text("providerAccountId").notNull(), // ID du compte côté provider
      refresh_token: text("refresh_token"), // Token pour rafraîchir l'accès
      access_token: text("access_token"), // Token d'accès
      expires_at: integer("expires_at"), // Expiration du token
      token_type: text("token_type"), // Type du token
      scope: text("scope"), // Portée (scope) du token
      id_token: text("id_token"), // ID Token (pour OpenID Connect)
      session_state: text("session_state"), // État de session
    },
    (account) => ({
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId], // Clé primaire composée
      }),
    })
  );
  
  // Table des sessions
  export const session = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(), // Token de session (clé primaire)
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }), // Référence à l'utilisateur
    expires: timestamp("expires", { mode: "date" }).notNull(), // Expiration de la session
  });
  
  // Table des tokens de vérification
  export const verificationTokens = pgTable(
    "verificationToken",
    {
      identifier: text("identifier").notNull(), // Identifiant unique
      token: text("token").notNull(), // Token
      expires: timestamp("expires", { mode: "date" }).notNull(), // Expiration du token
    },
    (verificationToken) => ({
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token], // Clé primaire composée
      }),
    })
  );
  