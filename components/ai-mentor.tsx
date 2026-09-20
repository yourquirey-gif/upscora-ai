"use client";
import { Bot, Send, X, Sparkles } from "lucide-react";
import { useState } from "react";

export default function AIMentor(){
 const [open,setOpen]=useState(false);
 const [input,setInput]=useState("");
 const [messages,setMessages]=useState<{role:"user"|"assistant";text:string}[]>([]);
 const [loading,setLoading]=useState(false);
 async function send(){
  const message=input.trim(); if(!message||loading)return;
  setInput(""); setMessages(m=>[...m,{role:"user",text:message}]); setLoading(true);
  try{
   const r=await fetch("/api/ai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message})});
   const d=await r.json();
   setMessages(m=>[...m,{role:"assistant",text:d.reply||d.error||"Something went wrong."}]);
  }catch{setMessages(m=>[...m,{role:"assistant",text:"Unable to reach the AI service right now."}]);}
  finally{setLoading(false);}
 }
 return <div className="fixed bottom-5 right-5 z-50">{open?
  <div className="w-[min(380px,calc(100vw-32px))] overflow-hidden rounded-3xl border border-white/10 bg-[#0b0e13]/95 shadow-2xl shadow-black/60 backdrop-blur-xl">
   <div className="flex items-center justify-between border-b border-white/10 px-4 py-4"><div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-xl bg-white text-black"><Bot size={18}/></div><div><p className="text-sm font-semibold">UPSCora AI</p><p className="text-[11px] text-white/35">Your preparation mentor</p></div></div><button onClick={()=>setOpen(false)} className="rounded-lg p-2 text-white/45 hover:bg-white/5 hover:text-white"><X size={17}/></button></div>
   <div className="h-80 space-y-3 overflow-y-auto p-4">
    {messages.length===0&&<div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm leading-6 text-white/50"><div className="mb-2 flex items-center gap-2 text-white"><Sparkles size={14}/> What can I help with?</div>Ask a doubt, generate a Prelims question, evaluate an approach, or build a revision plan.</div>}
    {messages.map((m,i)=><div key={i} className={m.role==="user"?"ml-8 rounded-2xl rounded-br-md bg-white px-4 py-3 text-sm text-black":"mr-8 rounded-2xl rounded-bl-md bg-white/[0.05] px-4 py-3 text-sm leading-6 text-white/75"}>{m.text}</div>)}
    {loading&&<div className="mr-8 rounded-2xl bg-white/[0.05] px-4 py-3 text-xs text-white/40">Thinking…</div>}
   </div>
   <div className="border-t border-white/10 p-3"><div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 p-2"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")send()}} placeholder="Ask UPSCora AI…" className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-white/25"/><button onClick={send} className="grid h-9 w-9 place-items-center rounded-xl bg-white text-black disabled:opacity-30" disabled={!input.trim()||loading}><Send size={15}/></button></div></div>
  </div>:
  <button onClick={()=>setOpen(true)} className="group grid h-14 w-14 place-items-center rounded-2xl border border-white/15 bg-white text-black shadow-2xl shadow-black/50"><Bot size={22}/><span className="pointer-events-none absolute bottom-16 right-0 w-max rounded-lg border border-white/10 bg-[#0b0e13] px-3 py-2 text-xs text-white/60 opacity-0 transition group-hover:opacity-100">Ask UPSCora AI</span></button>
 }</div>
}