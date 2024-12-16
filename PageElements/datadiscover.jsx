"use client";
import "@/styles/pages/discover.css"
import React, { useState, useEffect } from "react";
import Results from "@/PageElements/Results";
import { Filter_From } from "./filter-form";
import { SkeletonCards } from "./skeletonCards";

export default function MydataDiscover() {
  const categorie = "discover";
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState(""); // Stocker les filtres sous forme de chaîne

  // Fonction de gestion des filtres
  const handleFilters = (selectedFilters) => {
    setFilters(selectedFilters); // Mettre à jour les filtres
    console.log("Filtres sélectionnés :", selectedFilters);
  };

  // Construire l'URL dynamique avec les filtres
  const apiUrl = `/api/discover?filters=${filters}`;

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
    <div className="mr-4">
      {/* Affichage du composant FilterFilm */}
      {<Filter_From onFilterSubmit={handleFilters}/>}
      </div>
      {data ? (
        <Results results={data} category={categorie} loading={false} />
      ) : (
        <SkeletonCards title={"discover"}/>
      )}
    </div>
  );
}
