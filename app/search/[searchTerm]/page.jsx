import Results from '@/components/Results';

export default async function SearchPage({ params }) {
    const searchTerm = params.searchTerm;
    const TMDB_API_KEY = process.env.TMDB_API_KEY;

    // Requête pour les films
    const movieRes = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchTerm}&language=en-US&page=1&include_adult=false`
    );
    const movieData = await movieRes.json();
    const movies = movieData.results || [];

    // Requête pour les émissions de télévision
    const showsRes = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&query=${searchTerm}&language=en-US&page=1&include_adult=false`
    );
    const showsData = await showsRes.json();
    const shows = showsData.results || [];
    
    const results = [...movies, ...shows];
    return (
        <div>
            {
                results && results.length === 0 && (
                    <div className="text-center py-12">
                        No results found for '{searchTerm}'.
                    </div>
                )
            }
            {
                results && results.length > 0 && <Results results={{movies,shows}} />
            }
        </div>
    );
}
