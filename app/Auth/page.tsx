"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthResponse {
    message: string;
    success: boolean;
}

export default function AuthForm() {
    const [isLogged, setIsLogged] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Fonction pour gérer la connexion
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            setError('Nom d’utilisateur et mot de passe sont requis');
            return;
        }

        setLoading(true);
        setError(''); 

        try {
            const response = await fetch('/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data: AuthResponse = await response.json();

            if (response.ok) {
                setIsLogged(true);
                setError('');
                router.push('/');
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Erreur de connexion:', error); // Log de l'erreur
            setError('Erreur de connexion. Veuillez réessayer plus tard.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            {isLogged ? (
                <div className="text-center">
                    <h1>Main application content</h1>
                </div>
            ) : (
                <form onSubmit={handleLogin} className="space-y-4 p-6 max-w-md w-full bg-white rounded shadow-md">
                    <h2 className="text-xl font-bold mb-4">Connexion</h2>
                    {error && <p className="text-red-500">{error}</p>}

                    <input
                        type="text"
                        placeholder="Nom d’utilisateur"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                    />

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>
            )}
        </div>
    );
}
