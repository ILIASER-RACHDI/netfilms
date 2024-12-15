export default function TrailerDetails({ videoUrl }) {
    if (!videoUrl) return null;

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '300px', // Ajuste la hauteur minimale pour l'alignement vertical
                margin: '20px 0',  // Ajoute un espace au-dessus et en-dessous du trailer
            }}
        >
            <div
                style={{
                    textAlign: 'center',
                    width: '80%',  // Largeur fixe
                    height: '400px',  // Hauteur fixe
                    flexShrink: 0,
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                }}
            >
                <iframe
                    src={videoUrl}
                    title="YouTube video"
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}
