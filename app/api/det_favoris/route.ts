import { NextResponse } from 'next/server';

const TMDB_API_KEY = process.env.TMDB_API_KEY;

export async function GET(request: Request): Promise<NextResponse> {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const filmId = url.searchParams.get('filmId');

    if (!category || !filmId) {
        return NextResponse.json(
            { error: 'Les paramètres category et filmId sont requis.' },
            { status: 400 }
        );
    }

    const response = await fetch(
        `https://api.themoviedb.org/3/${category}/${filmId}?api_key=${TMDB_API_KEY}`
    );

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Erreur TMDB:', errorData);
        return NextResponse.json(
            { error: 'Erreur de récupération des données depuis TMDB' },
            { status: response.status }
        );
    }

    const data = await response.json();

    return NextResponse.json({
        id: data.id,
        title: data.title || data.name,
        overview: data.overview,
        release_date: data.release_date || data.first_air_date,
        poster_path: data.poster_path,
        backdrop_path: data.backdrop_path,
        vote_average: data.vote_average,
        vote_count: data.vote_count,
    });
}
