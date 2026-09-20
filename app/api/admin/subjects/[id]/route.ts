import {NextResponse} from "next/server";
import {connectDB} from "@/lib/mongodb";
import {requireAdmin} from "@/lib/admin";
import {Subject} from "@/models/Subject";

export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){
 const admin=await requireAdmin(); if(!admin) return NextResponse.json({error:"Admin access required"},{status:403});
 await connectDB(); const {id}=await params;
 const item=await Subject.findByIdAndUpdate(id,await request.json(),{new:true,runValidators:true}).lean();
 if(!item) return NextResponse.json({error:"Subject not found"},{status:404}); return NextResponse.json({item});
}
export async function DELETE(_:Request,{params}:{params:Promise<{id:string}>}){
 const admin=await requireAdmin(); if(!admin) return NextResponse.json({error:"Admin access required"},{status:403});
 await connectDB(); const {id}=await params; await Subject.findByIdAndDelete(id); return NextResponse.json({ok:true});
}