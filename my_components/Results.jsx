import React from 'react';
import Card from './Card';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Results({ results, category ,loading}) {
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
    <div>
      {/* Movies Section */}
      {category === 'discover' && shows.length > 0 && (
        <div className="section-container">
          <h2 className="section-title">Movies</h2>
          <ScrollArea className="scroll-area">
            <div className="scroll-content">
              {movies.map((movie) => (
                <figure key={movie.id} className="card-wrapper">
                    <Card item={movie} type="movie" loading={loading}/>
                </figure>
              ))}
            </div>
            <ScrollBar className="scrollbar" orientation="horizontal" />
          </ScrollArea>
        </div>
      )}


      {/* Shows Section */}
      {category === 'discover' && shows.length > 0 && (
        <div className="section-container">
          <h2 className="section-title">Shows</h2>
          <ScrollArea className="scroll-area">
            <div className="scroll-content">
              {shows.map((show) => (
                <figure key={show.id} className="card-wrapper">
                    <Card item={show} type="show"  loading={loading}/>
                </figure>
              ))}
            </div>
            <ScrollBar className="scrollbar" orientation="horizontal" />
          </ScrollArea>
        </div>
      )}

      {/* Movies Section */}
      {category === 'movies' && (
        <div>
          <h2 className="section-title dark:bg-orange-300">Movies</h2>
          <div className="page_wrapper">
            {movies.map((movie) => (
                <Card item={movie} type="movie"  loading={loading}/>
            ))}
            
            </div>
          </div>
      )}

      {/* shows section */}
      {category === 'shows' && (
        <div>
          <h2 className="section-title">Shows</h2>
          <div className="page_wrapper">
          {shows.map((show) => (
              <Card item={show} type="show" loading={loading}/>
            ))}
            
            </div>
          </div>
      )}

    </div>
  );
}



