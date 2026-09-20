"use client";
import Link from "next/link";
import { ArrowLeft, LockKeyhole, Mail, Sparkles, UserRound } from "lucide-react";
import { FormEvent, useState } from "react";

export default function SignupPage(){
 const [loading,setLoading]=useState(false);
 function submit(e:FormEvent){e.preventDefault();setLoading(true);setTimeout(()=>setLoading(false),700);}
 return <main className="min-h-screen bg-[#07090d] px-6 py-8 text-white">
  <div className="mx-auto flex max-w-6xl justify-between"><Link href="/" className="flex items-center gap-2 text-sm text-white/55 hover:text-white"><ArrowLeft size={16}/> Back to UPSCora</Link><div className="flex items-center gap-2 font-semibold"><span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-black">U</span>UPSCora<sup className="text-[8px]">AI</sup></div></div>
  <div className="mx-auto grid min-h-[calc(100vh-90px)] place-items-center py-12"><div className="w-full max-w-md rounded-[30px] border border-white/10 bg-white/[0.035] p-7 shadow-2xl shadow-black/30 sm:p-9">
   <div className="mb-8"><div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5"><Sparkles size={18}/></div><h1 className="text-3xl font-semibold tracking-tight">Start your preparation.</h1><p className="mt-2 text-sm leading-6 text-white/45">Create your UPSCora profile and build your personalized study workspace.</p></div>
   <form onSubmit={submit} className="space-y-4"><label className="block"><span className="mb-2 block text-xs text-white/50">Name</span><div className="flex items-center rounded-xl border border-white/10 bg-black/20 px-3"><UserRound size={16} className="text-white/35"/><input required placeholder="Your name" className="w-full bg-transparent px-3 py-3 text-sm outline-none placeholder:text-white/25"/></div></label><label className="block"><span className="mb-2 block text-xs text-white/50">Email</span><div className="flex items-center rounded-xl border border-white/10 bg-black/20 px-3"><Mail size={16} className="text-white/35"/><input required type="email" placeholder="you@example.com" className="w-full bg-transparent px-3 py-3 text-sm outline-none placeholder:text-white/25"/></div></label><label className="block"><span className="mb-2 block text-xs text-white/50">Password</span><div className="flex items-center rounded-xl border border-white/10 bg-black/20 px-3"><LockKeyhole size={16} className="text-white/35"/><input required type="password" placeholder="Create a password" className="w-full bg-transparent px-3 py-3 text-sm outline-none placeholder:text-white/25"/></div></label><button className="w-full rounded-xl bg-white py-3.5 text-sm font-semibold text-black">{loading?"Creating…":"Create account"}</button></form>
   <p className="mt-6 text-center text-xs text-white/35">Already have an account? <Link href="/login" className="text-white hover:underline">Sign in</Link></p>
  </div></div>
 </main>
}