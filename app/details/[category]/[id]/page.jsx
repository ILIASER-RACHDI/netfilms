import HeaderDetails from "../../../../my_components/HeaderDetails";
import ActorsDetails from "../../../../my_components/ActorsDetails";
import TrailerDetails from "../../../../my_components/TrailerDetails";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import GalleryCarousel from "../../../../my_components/GalleryDetails";

export default async function MoviePage({ params }) {
  const showId = params.id;
  let category = params.category === "show" ? "tv" : params.category;
  const TMDB_API_KEY = process.env.TMDB_API_KEY;

  const showUrl = `https://api.themoviedb.org/3/${category}/${showId}?api_key=${TMDB_API_KEY}`;
  const creditsUrl = `https://api.themoviedb.org/3/${category}/${showId}/credits?api_key=${TMDB_API_KEY}`;
  const videosUrl = `https://api.themoviedb.org/3/${category}/${showId}/videos?api_key=${TMDB_API_KEY}`;
  const imagesUrl = `https://api.themoviedb.org/3/${category}/${showId}/images?api_key=${TMDB_API_KEY}`;

  const show = await (await fetch(showUrl)).json();
  const creditsData = await (await fetch(creditsUrl)).json();
  const actors = creditsData.cast || [];
  const videosData = await (await fetch(videosUrl)).json();
  const imagesData = await (await fetch(imagesUrl)).json();
  const backdrops = imagesData.backdrops || [];

  const trailer = videosData.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );
  const videoUrl = trailer
    ? `https://www.youtube.com/embed/${trailer.key}`
    : "";

  const backgroundImage = backdrops.length > 0 ? backdrops[0].file_path : "";

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Arrière-plan flouté */}
      {backgroundImage && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(https://image.tmdb.org/t/p/original${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            alt:"background image",
            filter: "blur(15px)", // Applique le flou
            zIndex: -1,
          }}
        ></div>
      )}
      {/* Superposition sombre pour améliorer le contraste */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Couche semi-transparente
          zIndex: -1,
        }}
      ></div>
      {/* Contenu principal */}
      <div className="bg-white dark:bg-slate-950"
        style={{
          position: "relative",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          maxWidth: "1000px",
          margin: "30px auto",
        }}
      >
        <HeaderDetails show={show} showId={showId} category={category} />
        <section style={{ marginTop: "30px" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "600", marginBottom: "15px" }}>Média</h2>
          <TrailerDetails videoUrl={videoUrl} />
        </section>
        <section style={{ marginTop: "30px" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "600", marginBottom: "15px" }}>Gallery</h2>
          <GalleryCarousel backdrops={backdrops} />
        </section>
        <section style={{ marginTop: "30px" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "600", marginBottom: "15px" }}>Acteurs</h2>
          <ScrollArea className="w-full rounded-md border">
            <div className="flex w-max space-x-4 p-4">
              <ActorsDetails actors={actors} />
              <ScrollBar orientation="horizontal" />
            </div>
          </ScrollArea>
        </section>
      </div>
    </div>
  );
}
