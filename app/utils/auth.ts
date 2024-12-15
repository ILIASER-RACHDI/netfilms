export const isAuthenticated = (): boolean => {
    if (typeof window === 'undefined') return false; // S'assure que le code s'exécute côté client
    return !!localStorage.getItem('authToken'); // Vérifie si un token est présent
  };
// Fonction pour déconnecter l'utilisateur
export const logout = (): void => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("authToken"); // Supprime le token
    }
};

// Fonction pour simuler l'ajout d'un token après une connexion réussie
export const login = (token: string): void => {
    if (typeof window !== "undefined") {
        localStorage.setItem("authToken", token); // Stocke le token
    }
};
