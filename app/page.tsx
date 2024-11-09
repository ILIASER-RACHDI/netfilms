import Results from '../components/Results';

interface SearchParams {
  categorie?: string;
  type?: string;
}

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const categorie = searchParams.categorie || 'discover' ;
  const type = searchParams.type ;
  let apiUrl;
  if(categorie==='discover'){
     apiUrl = `http://localhost:3000/api/discover`;
  }
 else{ apiUrl = `http://localhost:3000/api/${categorie}/${type}`;}


  console.log("URL de l'API interne :", apiUrl); 

  // Fetch des données depuis l'API interne de Next.js
  const res = await fetch(apiUrl);

 
  const data = await res.json();


  console.log("Résultats de l'API interne :", data); 
return (

    <div>
    <Results results={data} />
  </div>
  );
}
