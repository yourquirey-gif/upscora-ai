"use client";
import { Bot, BrainCircuit, FileQuestion, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { useState } from "react";

const starters=[
 ["Explain a concept","Explain a UPSC topic simply with an example."],
 ["Create a Prelims question","Create one UPSC-level Prelims MCQ and wait for my answer."],
 ["Mains guidance","Give me a structure for a 10-mark Mains answer."],
 ["Revision plan","Make a focused revision plan based on my weak areas."]
];

export default function AIMentor(){
 const [open,setOpen]=useState(false); const [input,setInput]=useState(""); const [messages,setMessages]=useState<{role:"user"|"assistant";text:string}[]>([]); const [loading,setLoading]=useState(false);
 async function send(raw?:string){
  const message=(raw??input).trim(); if(!message||loading)return;
  setInput(""); setMessages(m=>[...m,{role:"user",text:message}]); setLoading(true);
  try{const r=await fetch("/api/ai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message,context:{product:"UPSCora AI",role:"UPSC mentor",language:"Hinglish",style:"exam-focused"}})});const d=await r.json();setMessages(m=>[...m,{role:"assistant",text:d.reply||d.error||"AI response unavailable."}]);}
  catch{setMessages(m=>[...m,{role:"assistant",text:"AI service is not connected yet. Add the OpenRouter environment variables later to enable live responses."}]);}
  finally{setLoading(false);}
 }
 return <div className="fixed bottom-5 right-5 z-50">
 {open?<div className="w-[min(430px,calc(100vw-24px))] overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0e13]/95 shadow-2xl shadow-black/60 backdrop-blur-xl">
  <div className="flex items-center justify-between border-b border-white/10 px-5 py-4"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-black"><Bot size={19}/></div><div><p className="text-sm font-semibold">UPSCora AI</p><p className="text-[11px] text-emerald-300">Preparation Mentor</p></div></div><button onClick={()=>setOpen(false)} className="rounded-lg p-2 text-white/45 hover:bg-white/5"><X size={17}/></button></div>
  <div className="h-[390px] overflow-y-auto p-4">
   {messages.length===0?<div><div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4"><div className="flex items-center gap-2 text-sm font-medium"><Sparkles size={15}/> What are you working on?</div><p className="mt-2 text-xs leading-5 text-white/35">Ask doubts, practice questions, improve answers or plan revision.</p></div><div className="mt-4 grid gap-2">{starters.map(([title,prompt],i)=><button key={title} onClick={()=>send(prompt)} className="flex items-center gap-3 rounded-2xl border border-white/8 p-3 text-left hover:bg-white/[0.04]"><span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5">{i===0?<MessageCircle size={14}/>:i===1?<FileQuestion size={14}/>:<BrainCircuit size={14}/>}</span><div><p className="text-xs font-medium">{title}</p><p className="mt-1 text-[10px] text-white/30">{prompt}</p></div></button>)}</div></div>:<div className="space-y-3">{messages.map((m,i)=><div key={i} className={m.role==="user"?"ml-8 rounded-2xl rounded-br-md bg-white px-4 py-3 text-sm leading-6 text-black":"mr-8 rounded-2xl rounded-bl-md bg-white/[0.05] px-4 py-3 text-sm leading-6 text-white/75"}>{m.text}</div>)}{loading&&<div className="mr-8 rounded-2xl bg-white/[0.05] px-4 py-3 text-xs text-white/40">UPSCora is thinking…</div>}</div>}
  </div>
  <div className="border-t border-white/10 p-3"><div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 p-2"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")send()}} placeholder="Ask your UPSC doubt…" className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-white/25"/><button onClick={()=>send()} disabled={!input.trim()||loading} className="grid h-9 w-9 place-items-center rounded-xl bg-white text-black disabled:opacity-30"><Send size={15}/></button></div><p className="px-1 pt-2 text-[10px] text-white/20">AI responses should be verified for high-stakes exam facts.</p></div>
 </div>:<button onClick={()=>setOpen(true)} className="group grid h-14 w-14 place-items-center rounded-2xl border border-white/15 bg-white text-black shadow-2xl shadow-black/50"><Bot size={22}/><span className="pointer-events-none absolute bottom-16 right-0 w-max rounded-lg border border-white/10 bg-[#0b0e13] px-3 py-2 text-xs text-white/60 opacity-0 transition group-hover:opacity-100">Ask UPSCora AI</span></button>}
 </div>
}