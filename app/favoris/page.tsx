"use client";
import React, { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Breadcrumb, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import CommandDialogDemo from "@/my_components/command";
import { ModeToggle } from "@/my_components/ModeToggle";
import Card from "@/my_components/Card";
import { SkeletonCards } from "@/my_components/skeletonCards";

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
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <ModeToggle />
                  <CommandDialogDemo />
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          <h2 className="text-2xl font-bold mb-4">Mes Favoris</h2>
          {loading ? (
            <SkeletonCards title={""}/>
          ) : (
            <div className="rounded-md border">
              <div className="page_wrapper">
                {favoris.map((favori) => (
                  <div key={favori.filmId}>
                    <Card item={favori} type={favori.category} loading={false}/>
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