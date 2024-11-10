import React from 'react';
import { AiOutlineVideoCamera } from 'react-icons/ai';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300">
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
    </header>
  );
}
