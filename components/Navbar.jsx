"use client";
import React from 'react';
import NavbarItems from './NavbarItems';
import { AiOutlineCompass } from 'react-icons/ai';
import { BiMovie } from 'react-icons/bi';
import { BsFillPeopleFill, BsFillStarFill } from 'react-icons/bs';
import { FaTv } from 'react-icons/fa';

export default function Navbar() {
  return (
    <aside className="w-64 bg-gray-100 h-full p-6">
      {/* Discover Section */}
      <div className="mb-8">
        <NavbarItems title="Discover" param={{ categorie: 'discover', type: 'all' }} Icon={AiOutlineCompass} />
      </div>

      {/* Movies Section */}
      <div className="mb-8">
        <h3 className="text-gray-500 uppercase text-sm">Movies</h3>
        <ul className="space-y-2 mt-2">
          <NavbarItems title="Now Playing" param={{ categorie: 'movies', type: 'now-playing' }} Icon={BiMovie} />
          <NavbarItems title="Popular" param={{ categorie: 'movies', type: 'popular' }} Icon={BsFillPeopleFill} />
          <NavbarItems title="Top Rated" param={{ categorie: 'movies', type: 'top-rated' }} Icon={BsFillStarFill} />
        </ul>
      </div>

      {/* TV Shows Section */}
      <div>
        <h3 className="text-gray-500 uppercase text-sm">TV Shows</h3>
        <ul className="space-y-2 mt-2">
          <NavbarItems title="On the Air" param={{ categorie: 'shows', type: 'on-the-air' }} Icon={FaTv} />
          <NavbarItems title="Popular" param={{ categorie: 'shows', type: 'popular' }} Icon={BsFillPeopleFill} />
          <NavbarItems title="Top Rated" param={{ categorie: 'shows', type: 'top-rated' }} Icon={BsFillStarFill} />
        </ul>
      </div>
    </aside>
  );
}
