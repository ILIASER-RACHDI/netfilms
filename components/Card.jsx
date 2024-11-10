import React from 'react';
import Link from 'next/link';

export default function Card({ item }) {
  const rating = item.vote_average;
  const percentage = Math.round((rating / 10) * 100); 

  const radius = 10; 
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference; 

  return (
    <Link href={`/movie/${item.id}`} passHref>
      <div className="group relative w-48 flex flex-col items-center">
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={item.title || item.name || 'No title'}
          className="w-full h-64 rounded-2xl object-cover mb-2 transition-transform duration-300 ease-in-out hover:scale-105"
        />

        <div className="flex items-center space-x-2 mt-2">
     
          <h3 className="text-sm font-medium">{item.title || item.name}</h3>

        
          <div className="relative w-6 h-6 flex items-center justify-center">
            <svg width="28" height="28" className="transform -rotate-90">
              <circle
                cx="12"
                cy="12"
                r={radius}
                stroke="#e5e7eb" 
                strokeWidth="3"
                fill="transparent"
              />
              <circle
                cx="12"
                cy="12"
                r={radius}
                stroke={percentage >= 70 ? 'green' : percentage >= 50 ? 'orange' : 'red'} 
                strokeWidth="3"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="transition-stroke duration-500 ease-out"
              />
            </svg>
            <span className="absolute text-[8px] font-semibold text-gray-700">{percentage}%</span>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-1">
          {item.release_date || item.first_air_date}
        </p>
      </div>
    </Link>
  );
}
