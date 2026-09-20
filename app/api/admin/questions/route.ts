import {NextResponse} from "next/server";
import {connectDB} from "@/lib/mongodb";
import {requireAdmin} from "@/lib/admin";
import {Question} from "@/models/Question";

export async function GET(request:Request){
 const admin=await requireAdmin();
 if(!admin) return NextResponse.json({error:"Admin access required"},{status:403});
 await connectDB();
 const {searchParams}=new URL(request.url);
 const filter:any={};
 for(const key of ["type","source","subject"]) { const value=searchParams.get(key); if(value) filter[key]=value; }
 const q=searchParams.get("q");
 if(q) filter.$or=[{question:{$regex:q,$options:"i"}},{topic:{$regex:q,$options:"i"}}];
 const items=await Question.find(filter).sort({createdAt:-1}).limit(200).lean();
 return NextResponse.json({items});
}

export async function POST(request:Request){
 const admin=await requireAdmin();
 if(!admin) return NextResponse.json({error:"Admin access required"},{status:403});
 await connectDB();
 const body=await request.json();
 if(!body.type||!body.source||!body.subject||!body.question) return NextResponse.json({error:"type, source, subject and question are required"},{status:400});
 const item=await Question.create(body);
 return NextResponse.json({item},{status:201});
}