import {NextRequest, NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
import connectToMongoDb from '@/app/lib/connect';
import User from '@/models/User';
export async function POST(req: NextRequest){
  try{
    const{username,email,role,number,location }
  }
}
