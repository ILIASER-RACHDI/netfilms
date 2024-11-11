import Results from '@/components/Results';

export default async function SearchPage({ params }) {
    const searchTerm = params.searchTerm;
    const TMDB_API_KEY = process.env.TMDB_API_KEY;
    const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchTerm}&language=en-US&page=1&include_adult=false`
    );
    const data = await res.json();
    const results = data.results;

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
                results && results.length > 0 && <Results results={results} />
            }
        </div>
    );
}
