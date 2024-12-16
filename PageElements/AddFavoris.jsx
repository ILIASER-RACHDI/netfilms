"use client";
import React, { useState } from "react";

export default function AddFavoris({ filmId, category }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddFavori = async () => {
    setLoading(true); // Active l'état de chargement
    setMessage(""); // Réinitialise le message

    try {
      const response = await fetch("/api/favoris/addtofavoris", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filmId, category }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Favori ajouté avec succès !");
      } else {
        setMessage(data.message || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API :", error);
      setMessage("Erreur lors de l'ajout du favori.");
    } finally {
      setLoading(false); // Désactive l'état de chargement
    }
  };

  return (
    <div>
      <button
        onClick={handleAddFavori}
        disabled={loading} // Désactive le bouton pendant le chargement
        style={{
          padding: "10px 20px",
          backgroundColor: loading ? "#6c757d" : "#007bff", // Change la couleur si chargé
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer", // Change le curseur si chargé
        }}
      >
        {loading ? "En cours..." : "Ajouter aux Favoris"}
      </button>
      {message && (
        <p
          style={{
            marginTop: "10px",
            color: message.includes("succès") ? "green" : "red", // Vert pour succès, rouge pour erreur
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
