import Results from '../components/Results';

interface SearchParams {
  categorie?: string;
  type?: string;
}

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
    const categorie = searchParams.categorie || 'discover';
    const type = searchParams.type;
    let apiUrl;

    if (categorie === 'discover') {
        apiUrl = `http://localhost:3000/api/discover`;
    } else {
        apiUrl = `http://localhost:3000/api/${categorie}/${type}`;
    }

    console.log("URL de l'API interne :", apiUrl);

    const res = await fetch(apiUrl);
    const data = await res.json();

    return (
        <div>
            <Results results={data} category={categorie} />
        </div>
    );
}
