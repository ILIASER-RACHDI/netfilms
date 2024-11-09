import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { user } from '@/repository/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        if (username !== user.username) {
            return res.status(401).json({ message: 'Nom d’utilisateur incorrect.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            res.status(200).json({ message: 'Connexion réussie' });
        } else {
            res.status(401).json({ message: 'Mot de passe incorrect.' });
        }
    } else {
        res.status(405).json({ message: 'Méthode non autorisée' });
    }
}
