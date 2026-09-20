import mongoose,{Schema,model,models} from "mongoose";

const SubjectSchema=new Schema({
 name:{type:String,required:true,unique:true,trim:true,index:true},
 description:{type:String,default:""},
 topics:[{type:String,trim:true}],
 active:{type:Boolean,default:true,index:true},
},{timestamps:true,versionKey:false});

export const Subject=models.Subject || model("Subject",SubjectSchema);