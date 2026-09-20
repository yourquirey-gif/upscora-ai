import {NextResponse} from "next/server";
import {connectDB} from "@/lib/mongodb";
import {Test} from "@/models/Test";
export async function GET(){await connectDB();const items=await Test.find({active:true}).sort({createdAt:-1}).lean();return NextResponse.json({items});}