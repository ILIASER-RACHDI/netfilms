import {NextResponse } from 'next/server';
import {Movie} from "@/app/entities/Movie";

const TMDB_API_KEY = process.env.TMDB_API_KEY; // Assure-toi d'avoir défini cette variable d'environnement

export async function GET(request:Request) {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1"; // Récupérer le paramètre de page
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`);
    const data = await response.json();


    if (!response.ok) {
        const errorData = await response.json();
        console.error("Erreur TMDB:", errorData);
        return NextResponse.json(
          { error: "Erreur de récupération des données depuis TMDB" },
          { status: response.status }
        );
      }

    // Mappe les résultats pour correspondre à l'interface `Movie`
    const movies: Movie[] = data.results.map((movie: Movie) => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        release_date: movie.release_date,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
    }));

    return NextResponse.json(movies);
}
