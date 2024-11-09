import React from 'react';
import Link from 'next/link';
import { AiOutlineCompass, AiOutlineVideoCamera } from 'react-icons/ai';
import { BiMovie } from 'react-icons/bi';
import { FaTv } from 'react-icons/fa';
import { BsFillPeopleFill, BsFillStarFill } from 'react-icons/bs';

export default function Header() {
  return (
    <header className="flex flex-col h-screen">
      {/* Top bar with logo and search */}
      <div className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300">
        <div className="flex items-center">
          <AiOutlineVideoCamera size={30} className="mr-2" />
          <Link href="/" className="text-2xl font-bold">Cinetica</Link>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="border px-3 py-1 rounded-lg outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Sidebar menu in a single column */}
      <aside className="w-64 bg-gray-100 h-full p-6">
        {/* Discover Section */}
        <div className="mb-8">
        <Link href="/api/discover" className="text-lg font-semibold flex items-center">
            <AiOutlineCompass className="mr-2" />
            Discover
          </Link>
        </div>

        {/* Movies Section */}
        <div className="mb-8">
          <h3 className="text-gray-500 uppercase text-sm">Movies</h3>
          <ul className="space-y-2 mt-2">
            <li>
              <Link href="/" className="flex items-center text-gray-800">
                <BiMovie className="mr-2" /> Now playing
              </Link>
            </li>
            <li>
              <Link href="/" className="flex items-center text-gray-800">
                <BsFillPeopleFill className="mr-2" /> Popular
              </Link>
            </li>
            <li>
              <Link href="/" className="flex items-center text-gray-800">
                <BsFillStarFill className="mr-2" /> Top Rated
              </Link>
            </li>
          </ul>
        </div>

        {/* TV Shows Section */}
        <div>
          <h3 className="text-gray-500 uppercase text-sm">TV Shows</h3>
          <ul className="space-y-2 mt-2">
            <li>
              <Link href="/" className="flex items-center text-gray-800">
                <FaTv className="mr-2" /> On the air
              </Link>
            </li>
            <li>
              <Link href="/" className="flex items-center text-gray-800">
                <BsFillPeopleFill className="mr-2" /> Popular
              </Link>
            </li>
            <li>
              <Link href="/" className="flex items-center text-gray-800">
                <BsFillStarFill className="mr-2" /> Top Rated
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </header>
  );
}
