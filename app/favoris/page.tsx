"use client";
import "@/styles/components/pagewrapper.css"
import React, { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Card from "@/PageElements/Card";
import { SkeletonCards } from "@/PageElements/skeletonCards";
import HeaderPage from "@/PageElements/HeaderPage";

type FavorisResponse = {
  success: true;
  favoris: FavorisType[];
};

type FavorisType = {
  category: string;
  filmId: number;
};

type EnrichedFavorisType = FavorisType & {
  title: string;
  description: string;
};

export default function Favoris() {
  const [favoris, setFavoris] = useState<EnrichedFavorisType[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorisDetails = async () => {
      try {
        const response = await fetch("/api/favoris/getfavoris");
        const data: FavorisResponse = await response.json();

        if (data.success) {
          const favorites = data.favoris;

          // Enrichir chaque favori avec les détails
          const enrichedFavoris = await Promise.all(
            favorites.map(async (favori: FavorisType) => {
              const detailResponse = await fetch(
                `/api/det_favoris?category=${favori.category}&filmId=${favori.filmId}`
              );
              const details = await detailResponse.json();
              return { ...favori, ...details };
            })
          );

          setFavoris(enrichedFavoris);
        } else {
          setMessage("Erreur lors de la récupération des favoris.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des favoris:", error);
        setMessage("Une erreur est survenue.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorisDetails();
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
        <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4">
        <HeaderPage/>
          </header>

          <h2 className="text-2xl font-bold mb-4">Mes Favoris</h2>
          {loading ? (
            <SkeletonCards title={""}/>
          ) : (
            <div className="rounded-md border">
              <div className="page_wrapper">
                {favoris.map((favori) => (
                  <div key={favori.filmId}>
                    <Card item={favori} type={favori.category}/>
                  </div>
                ))}
                {message && <p>{message}</p>}
              </div>
            </div>
          )}
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}