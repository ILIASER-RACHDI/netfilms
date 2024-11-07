import { NextResponse } from 'next/server';
import {Movie} from "@/app/entities/Movie";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

export async function GET() {
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`);

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erreur TMDB:', errorData);
            return NextResponse.json({ error: 'Erreur de récupération des données depuis TMDB' }, { status: response.status });
        }

        const data = await response.json();

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
