import {NextResponse} from "next/server";
import {connectDB} from "@/lib/mongodb";
import {requireAdmin} from "@/lib/admin";
import {Test} from "@/models/Test";

export async function GET(){
 const admin=await requireAdmin(); if(!admin) return NextResponse.json({error:"Admin access required"},{status:403});
 await connectDB(); return NextResponse.json({items:await Test.find().sort({createdAt:-1}).lean()});
}
export async function POST(request:Request){
 const admin=await requireAdmin(); if(!admin) return NextResponse.json({error:"Admin access required"},{status:403});
 await connectDB(); const body=await request.json();
 if(!body.title||!body.type||!body.subject) return NextResponse.json({error:"title, type and subject are required"},{status:400});
 const item=await Test.create(body); return NextResponse.json({item},{status:201});
}