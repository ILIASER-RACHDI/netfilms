
export default function ActorsDetails({ actors }) {
    return (
        <div>
        <h2
            style={{
                fontSize: "1.8rem",
                fontWeight: "bold",
                color: "black",
                marginBottom: "20px",
                marginTop: "20px",
            }}
        >
            Acteurs
        </h2>
    <div className={"scroll-container"}>
        {actors.map((actor) => (
            <div
                key={actor.id}
                style={{
                    width: "150px",
                    minWidth: "150px",
                    backgroundColor: "#FFFFFF",
                            borderRadius: "10px",
                            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // Légère ombre
                            overflow: "hidden",
                            textAlign: "center",
                        }}
                    >
                        {/* Image de l'acteur */}
                        <img
                            src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                            alt={actor.name}
                            style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover",
                            }}
                        />
                        {/* Nom et rôle de l'acteur */}
                        <div style={{ padding: "10px" }}>
                            <p
                                style={{
                                    margin: 0,
                                    fontWeight: "bold",
                                    fontSize: "1rem",
                                    color: "#000000",
                                }}
                            >
                                {actor.name}
                            </p>
                            <p
                                style={{
                                    margin: "5px 0 0",
                                    fontSize: "0.9rem",
                                    color: "#555555",
                                }}
                            >
                                {actor.character}
                            </p>
                        </div>
                    </div>
                ))}
        </div>
        </div>
    );
}
