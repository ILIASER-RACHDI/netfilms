import React from 'react';
import { AiOutlineVideoCamera } from 'react-icons/ai';
import Link from 'next/link';
import SearchBox from '@/components/SearchBox';
export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300">
      <div className="flex items-center">
        <AiOutlineVideoCamera size={30} className="mr-2" />
        <Link href="/" className="text-2xl font-bold">Cinetica</Link>
      </div>
      <SearchBox/>
    </header>
  );
}