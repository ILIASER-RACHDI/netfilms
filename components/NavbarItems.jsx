// components/NavbarItems.jsx
"use client";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function NavbarItems({ title, param, Icon }) {
  const searchParams = useSearchParams();
  const categorie = searchParams.get('categorie');
  const type = searchParams.get('type');

  return (
    <div>
      <Link
        href={`/?categorie=${param.categorie}&type=${param.type}`}
        className={`flex items-center hover:text-amber-600 font-semibold ${
          categorie === param.categorie && type === param.type
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
