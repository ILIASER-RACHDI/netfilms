import HeaderDetails from "../../../../components/HeaderDetails";
import ActorsDetails from "../../../../components/ActorsDetails";
import GalleryDetails from "../../../../components/GalleryDetails";
import TrailerDetails from "../../../../components/TrailerDetails";

export default async function MoviePage({ params }) {
    const showId = params.id;
    let category = params.category === 'show' ? 'tv' : params.category;
    const TMDB_API_KEY = process.env.TMDB_API_KEY;

    const showUrl = `https://api.themoviedb.org/3/${category}/${showId}?api_key=${TMDB_API_KEY}`;
    const creditsUrl = `https://api.themoviedb.org/3/${category}/${showId}/credits?api_key=${TMDB_API_KEY}`;
    const videosUrl = `https://api.themoviedb.org/3/${category}/${showId}/videos?api_key=${TMDB_API_KEY}`;
    const imagesUrl = `https://api.themoviedb.org/3/${category}/${showId}/images?api_key=${TMDB_API_KEY}`;

    const show = await (await fetch(showUrl)).json();
    const creditsData = await (await fetch(creditsUrl)).json();
    const actors = creditsData.cast || [];
    const videosData = await (await fetch(videosUrl)).json();
    const imagesData = await (await fetch(imagesUrl)).json();
    const backdrops = imagesData.backdrops || [];

    const trailer = videosData.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
    const videoUrl = trailer ? `https://www.youtube.com/embed/${trailer.key}` : '';

    return (

        <div style={{ fontFamily: 'Arial, sans-serif', color: '#FFFFFF' }}>

            <HeaderDetails show={show} />
            <h2 style={{fontSize: "1.8rem", fontWeight: "bold", color: "black", marginTop:"20px"}}> Média</h2>
            {/* Section défilable pour la bande-annonce et la galerie */}
            <div className="scroll-container">

                <div style={{ flex: '0 0 auto' ,marginTop:"10px"}}>
                    <TrailerDetails videoUrl={videoUrl} />
                </div>
                <GalleryDetails backdrops={backdrops} />
            </div>

            <ActorsDetails actors={actors} />
        </div>
    );
}
