import "@/styles/components/cardsearch.css";
import Link from "next/link";

export default function CardV4Tight({ result }) {
  const imageUrl = result.poster_path
    ? `https://image.tmdb.org/t/p/w185${result.poster_path}`
    : `assets/NoCard.png`;

  // Construire le lien en fonction du type de média
  const mediaType = result.media_type || "movie";
  const detailsUrl = `/details/${mediaType}/${result.id}`;

  return (
    <div
      className="card dark:bg v4 tight flex items-start space-x-4 "
      data-object-id={result.id}
      data-media-type={mediaType}
    >
      {/* Section Image */}
      <div className="wrapper">
        <div className="image">
          <div className="poster">
            <Link href={detailsUrl}>
                <img
                  loading="lazy"
                  className="poster w-full"
                  src={imageUrl}
                  alt={result.title || result.name}
                />
            </Link>
          </div>
        </div>
      </div>

      {/* Section Détails */}
      <div className=" details flex-1 flex items-center">
        <div>
          <h3 className="text-lg font-bold text-blue-800" style={{ fontWeight: "bold" }}>
            {result.title || result.name}
            {result.original_title && result.original_title !== result.title && (
              <span className="text-sm text-gray-500">
                {" "}
                ({result.original_title})
              </span>
            )}
          </h3>
          <p className="text-sm text-gray-400 mb-2">
            {result.release_date || result.first_air_date}
          </p>
          {result.overview && (
            <p className="text-sm text-gray-700 line-clamp-3">{result.overview}</p>
          )}
        </div>
      </div>
    </div>
  );
}
