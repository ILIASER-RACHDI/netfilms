export default function TrailerDetails({ videoUrl }) {
    if (!videoUrl) return null;

    return (
        <div style={{
            textAlign: 'center',
            width: '600px',  // Set a fixed width
            height: '300px',  // Set a fixed height
            flexShrink: 0,
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
        }}>
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
    );
}
