import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { createSession } from "@/lib/auth";

export const runtime="nodejs";

export async function POST(req:Request){
 try{
  const body=await req.json();
  const name=String(body?.name||"").trim();
  const email=String(body?.email||"").trim().toLowerCase();
  const password=String(body?.password||"");
  if(name.length<2||name.length>80) return NextResponse.json({error:"Please enter a valid name."},{status:400});
  if(!/^\\S+@\\S+\\.\\S+$/.test(email)) return NextResponse.json({error:"Please enter a valid email."},{status:400});
  if(password.length<8) return NextResponse.json({error:"Password must be at least 8 characters."},{status:400});
  await connectDB();
  const existing=await User.findOne({email});
  if(existing) return NextResponse.json({error:"An account with this email already exists."},{status:409});
  const passwordHash=await bcrypt.hash(password,12);
  const user=await User.create({name,email,passwordHash});
  await createSession(String(user._id));
  return NextResponse.json({ok:true,user:{name:user.name,email:user.email}});
 }catch{return NextResponse.json({error:"Unable to create account right now."},{status:500});}
}