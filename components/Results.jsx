import React from 'react';
import Card from './Card';

export default function Results({ results, category }) {
  let movies = [];
  let shows = [];

  if (category === 'movies') {
    movies = results;
  } else if (category === 'shows') {
    shows = results;
  } else if (category === 'discover') {
    movies = results.movies || [];
    shows = results.shows || [];
  }

  return (
      <div className="p-6">
        {movies.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Movies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-full">
                {movies.map((movie) => (
                    <Card key={movie.id} item={movie} type="movie" />
                ))}
              </div>
            </div>
        )}

        {shows.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">TV Shows</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-full">
                {shows.map((show) => (
                    <Card key={show.id} item={show} type="show" />
                ))}
              </div>
            </div>
        )}
      </div>
  );
}
