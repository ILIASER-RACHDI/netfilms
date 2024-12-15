import { NextResponse } from "next/server";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("searchTerm");

  if (!searchTerm) {
    return NextResponse.json(
      { success: false, message: "searchTerm is required" },
      { status: 400 }
    );
  }

  try {
    // Appels API TMDB pour les films et séries
    const [movieRes, showsRes] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchTerm}&language=en-US`
      ),
      fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&query=${searchTerm}&language=en-US`
      ),
    ]);

    const movieData = await movieRes.json();
    const showsData = await showsRes.json();

    return NextResponse.json({
      success: true,
      movies: movieData.results || [],
      shows: showsData.results || [],
    });
  } catch (error) {
    console.error("Error fetching data from TMDB:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch data from TMDB" },
      { status: 500 }
    );
  }
}
