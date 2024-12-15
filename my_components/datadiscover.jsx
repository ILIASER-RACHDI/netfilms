"use client";
import React, { useState, useEffect } from "react";
import Results from "@/my_components/Results";
import { Filter_From } from "./filter-form";

export default function MydataDiscover() {
  const categorie = "discover";
  const [data, setData] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState(""); // Stocker les filtres sous forme de chaîne

  // Fonction de gestion des filtres
  const handleFilters = (selectedFilters) => {
    setFilters(selectedFilters); // Mettre à jour les filtres
    console.log("Filtres sélectionnés :", selectedFilters);
  };

  // Construire l'URL dynamique avec les filtres
  const apiUrl = `http://localhost:3000/api/discover?filters=${filters}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(apiUrl);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    }
    fetchData();
  }, [apiUrl]); // Recharger les données lorsque l'URL change (filtres modifiés)

  return (
    <div>
      {/* Bouton pour afficher/cacher le composant FilterFilm */}
      <button
        onClick={() => setShowFilter((prev) => !prev)}
      >
        {showFilter ? "Close Filters" : "Open Filters"}
      </button>

      {/* Affichage du composant FilterFilm */}
      {showFilter && <Filter_From onFilterSubmit={handleFilters} />}

      {data ? (
        <Results results={data} category={categorie} loading={false} />
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
}
