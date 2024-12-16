"use client";

import CardV4Tight from "@/my_components/searchCard";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import HeaderPage from "@/my_components/HeaderPage";
import { SkeletonCards } from "@/my_components/skeletonCards";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const currentSearchTerm = searchParams?.get("searchTerm");

    if (!currentSearchTerm) return;

    setLoading(true);
    setError("");

    fetch(`/api/search?searchTerm=${encodeURIComponent(currentSearchTerm)}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMovies(data.movies);
          setShows(data.shows);
        } else {
          setError(data.message || "An error occurred");
        }
      })
      .catch((err) => {
        console.error("Error fetching search data:", err);
        setError("Failed to fetch search results.");
      })
      .finally(() => setLoading(false));
  }, [searchParams]);

  return (
    <Suspense>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4">
          <HeaderPage />
        </div>
        <div className="section-container">
          {!loading && !error && (
            <>
              <div>
                <h2 className="section-title">MOVIE</h2>
                <div className="white_column dark:bg-slate-900">
                  <section className="panel">
                    <div className="serach_results movie">
                      <div className="results">
                        {movies.map((result) => (
                          <CardV4Tight key={result.id} result={result} />
                        ))}
                      </div>
                    </div>
                  </section>
                </div>
              </div>
              <div>
                <h2 className="section-title">TV SHOWS</h2>
                <div>
                  <div className="white_column dark:bg-zinc-900">
                    <section className="panel">
                      <div className="serach_results movie">
                        <div className="results">
                          {shows.map((result) => (
                            <CardV4Tight key={result.id} result={result} />
                          ))}
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </>
          )}
          {error && <div className="text-red-500 text-center mt-4">{error}</div>}
        </div>
      </SidebarInset>
    </SidebarProvider>
    </Suspense>
  );
}
