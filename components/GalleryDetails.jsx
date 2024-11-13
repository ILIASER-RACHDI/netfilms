// GalleryDetails.js
export default function GalleryDetails({ backdrops }) {
    if (!backdrops.length) return null;

    return (
        <div style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
        }}>
            {backdrops.slice(0, 10).map((image, index) => (
                <img
                    key={index}
                    src={`https://image.tmdb.org/t/p/w300${image.file_path}`}
                    alt={`Scene ${index + 1}`}
                    style={{
                        width: '600px',  // Same width as trailer
                        height: '300px',  // Same height as trailer
                        objectFit: 'cover',
                        borderRadius: '10px',
                        flexShrink: 0,
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
                    }}
                />
            ))}
        </div>
    );
}
