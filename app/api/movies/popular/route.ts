import {NextResponse } from 'next/server';
import {Movie} from "@/app/entities/Movie";

const TMDB_API_KEY = process.env.TMDB_API_KEY; // Assure-toi d'avoir défini cette variable d'environnement

export async function GET() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
    const data = await response.json();

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
