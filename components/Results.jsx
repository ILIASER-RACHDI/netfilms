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
              <h2 className="text-2xl font-bold mb-8">Movies</h2>
              {category === 'discover' ? (
                  <div className="scroll-container">
                    {movies.map((movie) => (
                        <Card key={movie.id} item={movie} type="movie" />
                    ))}
                  </div>
              ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-full">
                    {movies.map((movie) => (
                        <Card key={movie.id} item={movie} type="movie" />
                    ))}
                  </div>
              )}
            </div>
        )}

        {shows.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-8">TV Shows</h2>
              {category === 'discover' ? (
                  <div className="scroll-container scroll-space">
                    {shows.map((show) => (
                        <Card key={show.id} item={show} type="show" />
                    ))}
                  </div>
              ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-full">
                    {shows.map((show) => (
                        <Card key={show.id} item={show} type="show" />
                    ))}
                  </div>
              )}
            </div>
        )}
      </div>
  );
}
