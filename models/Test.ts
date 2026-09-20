import mongoose,{Schema,model,models} from "mongoose";

const TestSchema=new Schema({
 title:{type:String,required:true,trim:true},
 type:{type:String,enum:["prelims","mains"],required:true,index:true},
 subject:{type:String,required:true,index:true},
 description:{type:String,default:""},
 durationMinutes:{type:Number,default:15,min:1},
 marksPerQuestion:{type:Number,default:2},
 negativeMarking:{type:Number,default:0.66},
 questionIds:[{type:Schema.Types.ObjectId,ref:"Question"}],
 active:{type:Boolean,default:true,index:true},
},{timestamps:true,versionKey:false});

export const Test=models.Test || model("Test",TestSchema);