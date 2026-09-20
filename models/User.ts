import mongoose,{Schema,model,models} from "mongoose";

const UserSchema=new Schema({
 name:{type:String,required:true,trim:true,maxlength:80},
 email:{type:String,required:true,unique:true,lowercase:true,trim:true,index:true},
 passwordHash:{type:String,required:true},
 role:{type:String,enum:["user","admin"],default:"user",index:true},
 createdAt:{type:Date,default:Date.now},
},{versionKey:false});

export const User=models.User || model("User",UserSchema);