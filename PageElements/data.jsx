"use client";
import "@/styles/buttons/buttondefilement.css";
import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Results from "@/PageElements/Results";
import { SkeletonCards } from "./skeletonCards";

export default function Mydata() {
  const searchParams = useSearchParams();
  const categorie = searchParams?.get("categorie") || "discover";
  const type = searchParams?.get("type") || "all";

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1); // État pour suivre la page actuelle
  const [loading, setLoading] = useState(false); // État pour suivre le chargement
  const [hasMore, setHasMore] = useState(true); // État pour vérifier s'il reste des pages
  const [showScroll, setShowScroll] = useState(false); // État pour afficher la flèche

  const apiUrl = `/api/${categorie}/${type}?page=${page}`;

  const fetchData = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error("Erreur de récupération des données");
      }
      const json = await res.json();
      if (json.length === 0) {
        setHasMore(false); // Arrêter de charger si aucune donnée supplémentaire
      } else {
        setData((prevData) => [...prevData, ...json]); // Concaténer les résultats
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, loading, hasMore]);

  // Charger les données initiales
  useEffect(() => {
    fetchData();
  }, [page]);

  // Ecouteur pour le scroll
  useEffect(() => {
    const handleScroll = () => {
      // Afficher ou cacher le bouton de retour en haut
      if (window.scrollY > 200) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }

      // Charger la page suivante si on atteint le bas
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 500 &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1); // Charger la page suivante
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  // Fonction pour remonter en haut de la page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };



  return (
    <div>
      {data.length > 0 ? (
        <Results results={data} category={categorie} loading={loading}/>
      ) : (
        <SkeletonCards title={categorie}/>
      )}
      {loading && <SkeletonCards title={""}/>}

      {/* Bouton de retour en haut */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fleche_scroll"
        >
          ↑
        </button>
      )}
    </div>
  );
}
