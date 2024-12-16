import Link from 'next/link';
import React from 'react';

export default function MenuItem({ title, adresse }) {
  return (
    <Link href={adresse} className="flex items-center space-x-2">
      <p>{title}</p>
    </Link>
  );
}
