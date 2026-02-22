import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export async function verifyAuth(req: NextRequest) {
    const token = req.headers.get('Authorization');
    if (!token) {
        return null;
    }

    try {
        const parsedToken = token.split(' ')[1];
        if (!parsedToken) {
            return null;
        }
        const decoded = jwt.verify(parsedToken, process.env.JWT_SECRET as string) as { sub: string };
        return decoded.sub;
    } catch (error) {
        return null;
    }
}
