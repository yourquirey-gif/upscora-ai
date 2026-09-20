import {NextResponse} from "next/server";
import {connectDB} from "@/lib/mongodb";
import {requireAdmin} from "@/lib/admin";
import {Subject} from "@/models/Subject";

export async function GET(){
 const admin=await requireAdmin(); if(!admin) return NextResponse.json({error:"Admin access required"},{status:403});
 await connectDB(); return NextResponse.json({items:await Subject.find().sort({name:1}).lean()});
}
export async function POST(request:Request){
 const admin=await requireAdmin(); if(!admin) return NextResponse.json({error:"Admin access required"},{status:403});
 await connectDB(); const body=await request.json();
 if(!body.name) return NextResponse.json({error:"Subject name is required"},{status:400});
 const item=await Subject.create({name:body.name,description:body.description||"",topics:body.topics||[]});
 return NextResponse.json({item},{status:201});
}