import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export const runtime="nodejs";

export async function POST(req:Request){
 const user=await getCurrentUser();
 if(!user) return NextResponse.json({error:"Authentication required."},{status:401});
 const body=await req.json();
 const message=String(body?.message||"").trim();
 if(!message||message.length>12000) return NextResponse.json({error:"Message is required and must be under 12,000 characters."},{status:400});
 const apiKey=process.env.OPENROUTER_API_KEY;
 const model=process.env.OPENROUTER_MODEL;
 if(!apiKey||!model) return NextResponse.json({error:"AI service is not configured yet."},{status:503});
 const response=await fetch("https://openrouter.ai/api/v1/chat/completions",{method:"POST",headers:{"Authorization":`Bearer ${apiKey}`,"Content-Type":"application/json","X-Title":"UPSCora AI"},body:JSON.stringify({model,messages:[{role:"system",content:"You are UPSCora AI, a neutral UPSC preparation mentor. Explain concepts clearly, create UPSC-standard Prelims and Mains practice, and focus on the user's preparation context. Do not claim content is an official UPSC question unless it is explicitly sourced as a PYQ."},{role:"user",content:message}],temperature:0.3})});
 if(!response.ok) return NextResponse.json({error:"AI provider request failed."},{status:502});
 const data=await response.json();
 return NextResponse.json({reply:data?.choices?.[0]?.message?.content??"No response generated."});
}