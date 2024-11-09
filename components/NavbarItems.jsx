"use client";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function NavbarItems({ title, param, Icon }) {
  const searchParams = useSearchParams();
  const genre = searchParams.get('genre');

  return (
    <div>
      <Link
        href={`/?genre=${param}`}
        className={`flex items-center hover:text-amber-600 font-semibold ${
          genre === param
            ? 'underline underline-offset-8 decoration-4 decoration-amber-500 rounded-lg'
            : ''
        }`}
      >
        <Icon className="mr-2" />
        {title}
      </Link>
    </div>
  );
}