import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import connectDB from '@/lib/db';
import UserModel from '@/models/User';

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const token = sign({ sub: user._id }, process.env.JWT_SECRET as string, {
            expiresIn: '7d',
        });

        return NextResponse.json({ accessToken: token });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ message: 'Error while logging in' }, { status: 500 });
    }
}
