import { NextResponse } from "next/server";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "movie"; // par défaut "movie"
  const showId = searchParams.get("id");

  if (!showId) {
    return NextResponse.json({ error: "Missing required parameter: id" }, { status: 400 });
  }

  try {
    const showUrl = `https://api.themoviedb.org/3/${category}/${showId}?api_key=${TMDB_API_KEY}`;
    const creditsUrl = `https://api.themoviedb.org/3/${category}/${showId}/credits?api_key=${TMDB_API_KEY}`;
    const videosUrl = `https://api.themoviedb.org/3/${category}/${showId}/videos?api_key=${TMDB_API_KEY}`;
    const imagesUrl = `https://api.themoviedb.org/3/${category}/${showId}/images?api_key=${TMDB_API_KEY}`;

    // Fetch data in parallel
    const [showRes, creditsRes, videosRes, imagesRes] = await Promise.all([
      fetch(showUrl),
      fetch(creditsUrl),
      fetch(videosUrl),
      fetch(imagesUrl),
    ]);

    if (!showRes.ok || !creditsRes.ok || !videosRes.ok || !imagesRes.ok) {
      throw new Error("Failed to fetch data from TMDb API");
    }

    const show = await showRes.json();
    const creditsData = await creditsRes.json();
    const videosData = await videosRes.json();
    const imagesData = await imagesRes.json();

    const response = {
      show,
      credits: creditsData,
      videos: videosData,
      images: imagesData
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching data from TMDb API:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
