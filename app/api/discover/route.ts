import { NextResponse } from 'next/server';
import {Movie} from "@/app/entities/Movie";
import {TVShow} from "@/app/entities/TVShow";


const TMDB_API_KEY = process.env.TMDB_API_KEY;

export async function GET() :Promise<NextResponse>{

    const responsetv = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_API_KEY}&language=en-US&page=1`);

    if (!responsetv.ok) {
        const errorData = await responsetv.json();
        console.error('Erreur TMDB:', errorData);
        return NextResponse.json({ error: 'Erreur de récupération des données depuis TMDB' }, { status: responsetv.status });
    }

    const datatv = await responsetv.json();

    const responseM = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&page=1`);

    if (!responseM.ok) {
        const errorData = await responsetv.json();
        console.error('Erreur TMDB:', errorData);
        return NextResponse.json({ error: 'Erreur de récupération des données depuis TMDB' }, { status: responsetv.status });
    }

    const dataM = await responseM.json();

    const movies: Movie[] = dataM.results.map((movie: Movie) => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        release_date: movie.release_date,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
    }));

    const shows: TVShow[] = datatv.results.map((show: TVShow) => ({
        id: show.id,
        name: show.name,
        overview: show.overview,
        first_air_date: show.first_air_date,
        poster_path: show.poster_path,
        backdrop_path: show.backdrop_path,
        vote_average: show.vote_average,
        vote_count: show.vote_count,
    }));

    return NextResponse.json({movies,shows});
}
