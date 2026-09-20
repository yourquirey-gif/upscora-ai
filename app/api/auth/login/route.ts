import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { createSession } from "@/lib/auth";

export const runtime="nodejs";

export async function POST(req:Request){
 try{
  const body=await req.json();
  const email=String(body?.email||"").trim().toLowerCase();
  const password=String(body?.password||"");
  await connectDB();
  const user=await User.findOne({email});
  if(!user || !(await bcrypt.compare(password,user.passwordHash))) return NextResponse.json({error:"Invalid email or password."},{status:401});
  await createSession(String(user._id));
  return NextResponse.json({ok:true,user:{name:user.name,email:user.email}});
 }catch{return NextResponse.json({error:"Unable to sign in right now."},{status:500});}
}