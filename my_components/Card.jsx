import React from 'react';
import Link from 'next/link';

export default function Card({ item, type }) {
  const URL = `/details/${type}/${item.id}`;
  const defaultImageUrl = "/assets/NoCard.png";

  return (
  
   <div >
         <Link href={URL} passHref>
         <img className='card-container'
            src={
              item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : defaultImageUrl 
              }
            width={150}
            height={200}
          />
          </Link>
        <div className="p-2 text-center">
        </div>
  </div>
    
  );
}
 