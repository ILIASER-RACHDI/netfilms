import React from 'react';

export default function Results({ results }) {
  const movies = results.movies || (Array.isArray(results) && results) || [];
  const shows = results.shows || (Array.isArray(results) && []) || results;

  return (
    <div>
      {movies.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold my-4">Movies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {movies.map((movie) => (
              <div key={movie.id} className="border p-4 rounded-lg shadow">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || 'No title'}
                  className="w-full h-auto mb-2 rounded-lg"
                />
                <h3 className="text-lg font-semibold">{movie.title || movie.name}</h3>
                <p className="text-sm text-gray-600">Release Date: {movie.release_date || movie.first_air_date}</p>
                <p className="text-sm text-gray-500">Rating: {movie.vote_average} ({movie.vote_count} votes)</p>
            
              </div>
            ))}
          </div>
        </div>
      )}

      {shows.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold my-4">TV Shows</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {shows.map((show) => (
              <div key={show.id} className="border p-4 rounded-lg shadow">
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name || 'No name'}
                  className="w-full h-auto mb-2 rounded-lg"
                />
                <h3 className="text-lg font-semibold">{show.name || show.title}</h3>
                <p className="text-sm text-gray-600">First Air Date: {show.first_air_date || show.release_date}</p>
                <p className="text-sm text-gray-500">Rating: {show.vote_average} ({show.vote_count} votes)</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
