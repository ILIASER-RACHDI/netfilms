import { NextResponse } from 'next/server';
import {TVShow} from "@/app/entities/TVShow";


const TMDB_API_KEY = process.env.TMDB_API_KEY;

export async function GET() {
        const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=1`);

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erreur TMDB:', errorData);
            return NextResponse.json({ error: 'Erreur de récupération des données depuis TMDB' }, { status: response.status });
        }

        const data = await response.json();

        const shows: TVShow[] = data.results.map((show: TVShow) => ({
            id: show.id,
            name: show.name,
            overview: show.overview,
            first_air_date: show.first_air_date,
            poster_path: show.poster_path,
            backdrop_path: show.backdrop_path,
            vote_average: show.vote_average,
            vote_count: show.vote_count,
        }));

        return NextResponse.json(shows);
}
