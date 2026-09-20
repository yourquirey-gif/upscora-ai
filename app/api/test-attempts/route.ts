import {NextResponse} from "next/server";
import {connectDB} from "@/lib/mongodb";
import {getCurrentUser} from "@/lib/auth";
import {TestAttempt} from "@/models/TestAttempt";
export async function POST(request:Request){const user=await getCurrentUser();if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});await connectDB();const body=await request.json();const item=await TestAttempt.create({userId:user._id,testType:body.testType,title:body.title,score:body.score,maxScore:body.maxScore,accuracy:body.accuracy,correct:body.correct,wrong:body.wrong,unattempted:body.unattempted,answers:body.answers||[]});return NextResponse.json({item},{status:201});}