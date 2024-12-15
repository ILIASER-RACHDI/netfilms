"use client";
import React, { useState } from "react";

export default function AddFavoris({ filmId, category }) {
  const [message, setMessage] = useState("");

  const handleAddFavori = async () => {
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
    }
  };

  return (
    <div>
      <button
        onClick={handleAddFavori}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Ajouter aux Favoris
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
