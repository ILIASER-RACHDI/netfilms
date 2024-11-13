export default async function MoviePage({ params }) {
    const showId = params.id;
    let categorie = params.category;
    const TMDB_API_KEY = process.env.TMDB_API_KEY;

    if(categorie==='show'){
        categorie='tv';
    }

    const showUrl = `https://api.themoviedb.org/3/${categorie}/${showId}?api_key=${TMDB_API_KEY}`;
    const creditsUrl = `https://api.themoviedb.org/3/${categorie}/${showId}/credits?api_key=${TMDB_API_KEY}`;

    // Récupération des données du film
    const res = await fetch(showUrl);
    const show = await res.json();

    // Récupération des données des acteurs
    const creditsRes = await fetch(creditsUrl);
    const creditsData = await creditsRes.json();
    const actors = creditsData.cast || [];

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', color: '#FFFFFF' }}>
            {/* Conteneur pour l'image de fond floutée */}
            <div
                style={{
                    position: 'relative',
                    padding: '20px',
                    overflow: 'hidden',
                }}
            >
                {/* Image de fond floutée */}
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
                        filter: 'blur(20px)',
                        zIndex: -1,
                    }}
                />

                {/* Overlay pour obscurcir légèrement le fond */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 0 }}></div>

                {/* Contenu principal, texte clair et image rectangulaire arrondie non floutée */}
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1, padding: '20px' }}>
                    {/* Image rectangulaire avec coins arrondis */}
                    <img
                        src={`https://image.tmdb.org/t/p/original${show.poster_path}`}
                        alt={show.title}
                        width={200}
                        height={300}
                        style={{ borderRadius: '15px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)' }}
                    />

                    {/* Détails du film */}
                    <div style={{ marginLeft: '20px' }}>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{show.name ||show.title} ({new Date(show.release_date).getFullYear() || new Date(show.first_air_date).getFullYear()})</h1>
                        <p style={{ fontSize: '1.2rem', fontStyle: 'italic' }}>{show.tagline}</p>
                        <p style={{ marginTop: '10px' }}>{show.overview}</p>
                    </div>
                </div>
            </div>

            {/* Section des acteurs avec défilement horizontal */}
            <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#000' }}>Distribution des rôles</h2>
                <div style={{
                    display: 'flex',
                    gap: '15px',
                    overflowX: 'auto', // Défilement horizontal
                    padding: '10px 0',
                }}>
                    {actors.map(actor => (
                        <div key={actor.id} style={{
                            width: '120px',
                            minWidth: '125px',
                            backgroundColor: '#FFFFFF',
                            color: '#000000',
                            borderRadius: '10px',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                            textAlign: 'center',
                            flex: '0 0 auto',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            {/* Image de l'acteur dans la moitié supérieure de la carte */}
                            <div style={{
                                width: '100%',
                                height: '60%', // Image occupe la moitié supérieure
                                overflow: 'hidden',
                                borderTopLeftRadius: '10px',
                                borderTopRightRadius: '10px',
                            }}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                    alt={actor.name}
                                    width={150}
                                    height={150}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderTopLeftRadius: '10px',
                                        borderTopRightRadius: '10px',
                                    }}
                                />
                            </div>
                            {/* Informations de l'acteur dans la moitié inférieure */}
                            <div style={{ padding: '10px', flex: '1' }}>
                                <p style={{ fontWeight: 'bold', fontSize: '1rem', margin: '0' }}>{actor.name}</p>
                                <p style={{ fontSize: '0.9rem', color: '#555', margin: '5px 0 0' }}>{actor.character}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
