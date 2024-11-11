'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBox() {
    const router = useRouter();
    const [search, setSearch] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.trim()) {
            router.push(`/search/${search}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center">
            <input
                type="text"
                placeholder="Search keywords..."
                className="w-full h-12 rounded-full placeholder-gray-500 outline-none bg-gray-100 px-4 text-gray-800"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button
                type="submit"
                className="ml-2 bg-amber-500 text-white px-6 py-2 rounded-full hover:bg-amber-600 disabled:bg-gray-400"
                disabled={!search.trim()}
            >
                Search
            </button>
        </form>
    );
}
