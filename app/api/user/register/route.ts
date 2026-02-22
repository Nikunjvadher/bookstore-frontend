import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import connectDB from '@/lib/db';
import UserModel from '@/models/User';

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = sign({ sub: newUser._id }, process.env.JWT_SECRET as string, {
            expiresIn: '7d',
        });

        return NextResponse.json({ id: newUser._id, accessToken: token }, { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ message: 'Error while creating user' }, { status: 500 });
    }
}
