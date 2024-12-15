import AddFavoris from "./AddFavoris";

// HeaderDetails.js
export default function HeaderDetails({ show , showId , category}) {
    return (
        <div style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#2b2b2b', padding: '40px', borderRadius: '3px' }}>
            {/* Image de fond */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${show.backdrop_path || show.poster_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(10px)',
                    zIndex: -1,
                }}
            />
            {/* Overlay */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)', zIndex: 0 }}></div>

            <div style={{ display: 'flex', alignItems: 'flex-start', position: 'relative', zIndex: 1, gap: '20px' }}>
                {/* Affiche du film */}
                <div style={{ flex: '0 0 auto' }}>
                    <img
                        src={`https://image.tmdb.org/t/p/original${show.poster_path}`}
                        alt={show.title || show.name}
                        style={{
                            borderRadius: '8px',
                            width: '240px',
                            height: '360px',
                            objectFit: 'cover',
                            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.5)',
                            marginBottom: '10px',
                        }}
                    />
                    <div>
                    <AddFavoris filmId={showId} category={category} />
                    </div>
                </div>


                {/* Détails */}
                <div style={{ flex: 1, color: '#fff' }}>
                    <h1 style={{ fontSize: '2.8rem', fontWeight: 'bold', marginBottom: '10px' }}>
                        {show.name || show.title} ({new Date(show.release_date || show.first_air_date).getFullYear()})
                    </h1>
                    <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: '#ffcc00', marginBottom: '20px' }}>{show.tagline || 'Aucune tagline disponible'}</p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                backgroundColor: '#121200',
                                color: '#fff',
                                fontWeight: 'bold',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                            }}
                        >
                            {Math.round(show.vote_average * 10)}%
                        </div>
                        <span style={{ fontSize: '1rem', color: '#ccc' }}>
                            {show.vote_count} évaluations
                        </span>
                    </div>

                    <p style={{ lineHeight: '1.6', marginBottom: '20px', color: '#ddd' }}>
                        {show.overview || 'Aucune description disponible.'}
                    </p>

                    {/* Informations supplémentaires */}
                    <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', color: '#ccc' }}>
                        <div>
                            <strong>Date de sortie :</strong> {new Date(show.release_date || show.first_air_date).toLocaleDateString()}
                        </div>
                        <div>
                            <strong>Durée :</strong> {show.runtime || show.episode_run_time?.[0] || 'N/A'} minutes
                        </div>
                        <div>
                            <strong>Genres :</strong> {show.genres?.map((genre) => genre.name).join(', ') || 'Non spécifié'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
