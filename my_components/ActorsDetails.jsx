export default function ActorsDetails({ actors }) {
  return (
    <section>
      <ol
        className="people scroller"
        style={{
          display: "flex", // Utilise un conteneur flex
          flexWrap: "wrap", // Permet un retour à la ligne si nécessaire
          gap: "10px", // Espace entre les acteurs
          padding: "0", // Supprime les marges du ol
          listStyle: "none", // Supprime les puces
        }}
      >
        {actors.slice(0, 20).map((actor) => (
          <div
            key={actor.id}
            style={{
              width: "120px",
              minWidth: "120px",
              height:"260px",
              maxHeight:"280px",
              marginBottom:"2px",

              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // Légère ombre
              overflow: "hidden",
              textAlign: "center",
            }}
          >
            {/* Image de l'acteur */}
            <img
            src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
            alt={actor.name}
            loading="lazy"
            style={{
                width: "130px", // Largeur fixée
                height: "175px", // Hauteur fixée
                margin: "0 auto",
            }}
/>
            {/* Nom et rôle de l'acteur */}
            <div style={{ padding: "7px" }}>
              <p
                style={{
                  margin: 0,
                  fontWeight: "bold",
                  fontSize:"100",
                  color: "#000000",
                }}
              >
                {actor.name}
              </p>
              <p
                style={{
                  fontSize:"100",
                  color: "#555555",
                }}
              >
                {actor.character}
              </p>
            </div>
          </div>
        ))}
      </ol>
    </section>
  );
}
