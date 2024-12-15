import React from 'react';
import Link from 'next/link';

export default function Card({ item, type ,loading }) {
  const URL = `/details/${type}/${item.id}`;
  const title = item.title || item.name || 'No title';
  const date = item.release_date || item.first_air_date || 'No date';

  return (
    
   <div >
         <Link href={URL} passHref>
         <img className='card-container'
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            width={150}
            height={200}
          />
          </Link>
        <div className="p-2 text-center">
        </div>
  </div>
    
  );
}
 