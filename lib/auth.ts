import { SignJWT,jwtVerify } from "jose";
import { cookies } from "next/headers";
import { connectDB } from "./mongodb";
import { User } from "@/models/User";

const secret=process.env.AUTH_SECRET;
if(!secret) throw new Error("AUTH_SECRET is not configured");
const key=new TextEncoder().encode(secret);
const COOKIE="upscora_session";

export async function createSession(userId:string){
 const token=await new SignJWT({sub:userId}).setProtectedHeader({alg:"HS256"}).setIssuedAt().setExpirationTime("7d").sign(key);
 (await cookies()).set(COOKIE,token,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:60*60*24*7});
}

export async function getCurrentUser(){
 const token=(await cookies()).get(COOKIE)?.value;
 if(!token) return null;
 try{
  const {payload}=await jwtVerify(token,key,{algorithms:["HS256"]});
  if(typeof payload.sub!=="string") return null;
  await connectDB();
  return await User.findById(payload.sub).select("name email createdAt").lean();
 }catch{return null;}
}

export async function destroySession(){(await cookies()).delete(COOKIE);}