"use client";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, FileUp, Sparkles, UploadCloud } from "lucide-react";
import { useState } from "react";

const rubric=[
 ["Introduction","Context, definition and direct entry into the issue"],
 ["Structure","Logical flow, headings, balance and coherence"],
 ["Body","Arguments, dimensions, examples, data and analysis"],
 ["Conclusion","Balanced, practical and forward-looking closure"],
 ["Directive","Whether the answer actually addresses the command"],
 ["Presentation","Language, clarity, relevance and time-efficient writing"]
];

export default function Mains(){
 const [answer,setAnswer]=useState("");
 const [submitted,setSubmitted]=useState(false);
 const [file,setFile]=useState("");
 const wordCount=answer.trim()?answer.trim().split(/\s+/).length:0;
 const marks=Math.min(10,Math.max(0,Math.round(5+(wordCount>130?1:0)+(wordCount>80?1:0)+(answer.includes("however")||answer.includes("therefore")?1:0))));
 return <main className="min-h-screen bg-[#07090d] px-5 text-white">
 <header className="mx-auto flex h-20 max-w-6xl items-center justify-between"><Link href="/dashboard" className="flex items-center gap-2 text-sm text-white/50"><ArrowLeft size={16}/> UPSCora</Link><span className="text-sm font-semibold">Mains Evaluation</span></header>
 <div className="mx-auto max-w-6xl py-5"><div><p className="text-xs uppercase tracking-[.2em] text-white/35">Mains • GS-II</p><h1 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight sm:text-4xl">Write like the examiner is reading.</h1><p className="mt-3 max-w-3xl text-sm leading-6 text-white/45">Submit your answer and UPSCora will evaluate structure, content, directive compliance and presentation.</p></div>
 <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_310px]">
 <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6">
 <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5"><span className="text-xs text-white/35">Question • 10 marks • 150 words</span><p className="mt-3 text-sm leading-7 text-white/80">“Cooperative federalism is essential for achieving inclusive and sustainable development in India.” Discuss the statement with suitable examples.</p></div>
 <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><label className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-xs text-white/55"><UploadCloud size={15}/> Upload handwritten copy<input type="file" accept="image/*,.pdf" className="hidden" onChange={e=>setFile(e.target.files?.[0]?.name||"")}/></label>{file&&<span className="text-xs text-emerald-300">{file}</span>}</div>
 <textarea value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Type your answer here…\n\nTip: Start with a crisp introduction, use 2–4 dimensions in the body, add examples/data, and finish with a balanced conclusion." className="mt-4 min-h-[390px] w-full resize-y rounded-2xl border border-white/10 bg-black/20 p-5 text-sm leading-7 text-white outline-none placeholder:text-white/25 focus:border-white/25"/>
 <div className="mt-3 flex items-center justify-between text-xs text-white/35"><span>{wordCount} words</span><button onClick={()=>setSubmitted(true)} disabled={!answer.trim()&&!file} className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-black disabled:opacity-30"><Sparkles size={15}/> Evaluate answer</button></div>
 </section>
 <aside className="rounded-3xl border border-white/10 bg-white/[0.025] p-5"><p className="text-sm font-semibold">Evaluation rubric</p><div className="mt-5 space-y-3">{rubric.map(([a,b])=><div key={a} className="rounded-2xl border border-white/8 p-4"><p className="text-sm">{a}</p><p className="mt-1 text-xs leading-5 text-white/35">{b}</p></div>)}</div></aside>
 </div>
 {submitted&&<section className="mt-5 rounded-3xl border border-white/10 bg-white/[0.025] p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[.18em] text-white/35">Evaluation preview</p><h2 className="mt-2 text-2xl font-semibold">AI Examiner Report</h2></div><div className="rounded-2xl bg-white px-5 py-3 text-center text-black"><p className="text-xs opacity-50">Marks</p><p className="text-2xl font-bold">{marks}/10</p></div></div><div className="mt-6 grid gap-3 md:grid-cols-2">{rubric.map(([a])=><div key={a} className="flex items-center gap-3 rounded-2xl border border-white/8 p-4"><CheckCircle2 size={16} className="text-emerald-300"/><div><p className="text-sm">{a}</p><p className="mt-1 text-xs text-white/40">{answer? "Good foundation. Add more specific examples and sharper analysis for a higher score.":"Handwritten submission received. Detailed AI extraction will run after AI/file services are connected."}</p></div></div>)}</div><div className="mt-5 rounded-2xl border border-amber-300/10 bg-amber-300/[0.03] p-5"><p className="text-sm font-medium">Improve next</p><p className="mt-2 text-sm leading-6 text-white/45">Focus on concrete examples, recent government initiatives, constitutional dimensions and a more solution-oriented conclusion. This preview becomes full AI-powered evaluation after the AI environment variables are configured.</p></div></section>}
 </div></main>
}