
import * as React from "react";
export default function GalleryCarousel({backdrops}) {

  return (
    <div className="slider">
      <div className="slide-track">
        <div className="slide">

        {backdrops.map((image) => (
        <img className="img_gallery" src={`https://image.tmdb.org/t/p/w300${image.file_path}`}
        />
      ))}
        </div>
        
        </div>
      </div>
  );
}
