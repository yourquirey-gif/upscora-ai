"use client";
import Link from "next/link";
import { ArrowLeft, BookOpen, FileText, Image as ImageIcon, MessageCircle, Sparkles, UploadCloud, X } from "lucide-react";
import { useState } from "react";

const topics=[
 ["Permanent Settlement","Modern History","Zamindari system, revenue settlement, Cornwallis"],
 ["Charter Acts","Modern History","1813, 1833, 1853 and administrative changes"],
 ["Constitutional Development","Polity","Acts, reforms and evolution of representative institutions"]
];

export default function Notes(){
 const [files,setFiles]=useState<string[]>([]);
 const [tab,setTab]=useState<"overview"|"prelims"|"mains"|"ask">("overview");
 const [question,setQuestion]=useState("");
 const [asked,setAsked]=useState(false);

 function addFiles(list:FileList|null){if(!list)return;setFiles(x=>[...x,...Array.from(list).map(f=>f.name)])}

 return <main className="min-h-screen bg-[#07090d] px-5 text-white">
  <header className="mx-auto flex h-20 max-w-6xl items-center justify-between">
   <Link href="/dashboard" className="flex items-center gap-2 text-sm text-white/50"><ArrowLeft size={16}/> UPSCora</Link>
   <span className="text-sm font-semibold">My Notes</span>
  </header>
  <div className="mx-auto max-w-6xl py-5">
   <div className="flex flex-wrap items-end justify-between gap-5">
    <div><p className="text-xs uppercase tracking-[.2em] text-white/35">Personal knowledge</p><h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Turn your notes into practice.</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-white/45">Upload PDFs or images. UPSCora can organize them, create questions and answer doubts from your own study material.</p></div>
    <label className="flex cursor-pointer items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black"><UploadCloud size={16}/> Upload notes<input type="file" multiple accept=".pdf,image/*" className="hidden" onChange={e=>addFiles(e.target.files)}/></label>
   </div>

   <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_300px]">
    <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-6">
     <div className="flex flex-wrap gap-2 border-b border-white/8 pb-4">
      {([["overview","Overview"],["prelims","Prelims"],["mains","Mains"],["ask","Ask my notes"]] as const).map(([id,label])=><button key={id} onClick={()=>setTab(id)} className={`rounded-xl px-4 py-2 text-sm ${tab===id?"bg-white text-black font-semibold":"text-white/45 hover:bg-white/5"}`}>{label}</button>)}
     </div>

     {tab==="overview"&&<div className="pt-6"><div className="grid gap-3 sm:grid-cols-3"><Stat icon={<FileText size={17}/>} title="Files" value={String(files.length)}/><Stat icon={<BookOpen size={17}/>} title="Topics detected" value={files.length?"3":"0"}/><Stat icon={<Sparkles size={17}/>} title="Questions ready" value={files.length?"12":"0"}/></div><div className="mt-6 rounded-2xl border border-dashed border-white/12 p-8 text-center"><UploadCloud className="mx-auto text-white/25" size={30}/><p className="mt-3 text-sm font-medium">Drop your study material here</p><p className="mt-2 text-xs text-white/35">PDF, JPG, PNG • Multiple files supported</p></div></div>}

     {tab==="prelims"&&<QuestionList type="Prelims" files={files.length}/>}

     {tab==="mains"&&<QuestionList type="Mains" files={files.length}/>}

     {tab==="ask"&&<div className="pt-6"><div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-black"><MessageCircle size={17}/></span><div><p className="text-sm font-semibold">Ask UPSCora from your notes</p><p className="text-xs text-white/35">Answers will be grounded in uploaded material.</p></div></div><textarea value={question} onChange={e=>setQuestion(e.target.value)} placeholder="e.g. Permanent Settlement ki main features mere notes ke according kya hain?" className="mt-5 min-h-32 w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 outline-none placeholder:text-white/25"/><button onClick={()=>setAsked(true)} disabled={!question.trim()||!files.length} className="mt-3 flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black disabled:opacity-30"><Sparkles size={15}/> Ask from notes</button>{asked&&<div className="mt-5 rounded-2xl border border-white/8 bg-white/[0.025] p-5"><p className="text-xs text-white/35">UPSCora answer preview</p><p className="mt-3 text-sm leading-7 text-white/65">Your notes have been received. Once the AI and document-processing environment variables are connected, this answer will be generated directly from the uploaded material with source references.</p></div>}</div></div>}
    </section>

    <aside className="rounded-3xl border border-white/10 bg-white/[0.025] p-5"><p className="text-sm font-semibold">Your files</p>{files.length?<div className="mt-4 space-y-2">{files.map((f,i)=><div key={f+i} className="flex items-center gap-2 rounded-xl border border-white/8 p-3 text-xs text-white/55"><FileText size={14}/><span className="min-w-0 flex-1 truncate">{f}</span><button onClick={()=>setFiles(x=>x.filter((_,n)=>n!==i))}><X size={13}/></button></div>)}</div>:<div className="mt-4 rounded-2xl border border-dashed border-white/10 p-5 text-center"><ImageIcon className="mx-auto text-white/20" size={22}/><p className="mt-2 text-xs text-white/35">No notes uploaded yet.</p></div>}<div className="mt-6 rounded-2xl bg-white/[0.03] p-4"><p className="text-xs font-medium">How it works</p><ol className="mt-3 space-y-2 text-xs leading-5 text-white/40"><li>01 • Upload your notes</li><li>02 • UPSCora extracts topics</li><li>03 • Generate Prelims/Mains practice</li><li>04 • Ask doubts from your material</li></ol></div></aside>
   </div>

   {tab==="overview"&&<div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.025] p-6"><p className="text-xs uppercase tracking-[.18em] text-white/30">Detected topics preview</p><div className="mt-5 grid gap-3 md:grid-cols-3">{topics.map(([a,b,c])=><div key={a} className="rounded-2xl border border-white/8 p-4"><p className="text-sm font-medium">{a}</p><p className="mt-1 text-xs text-white/35">{b}</p><p className="mt-3 text-xs leading-5 text-white/45">{c}</p></div>)}</div></div>}
  </div>
 </main>
}

function Stat({icon,title,value}:{icon:React.ReactNode,title:string,value:string}){return <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4"><div className="flex items-center gap-2 text-xs text-white/35">{icon}{title}</div><p className="mt-2 text-2xl font-semibold">{value}</p></div>}
function QuestionList({type,files}:{type:string,files:number}){return <div className="pt-6"><div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5"><p className="text-xs text-white/35">{type} question generation</p><h2 className="mt-2 text-lg font-semibold">{files?"Questions generated from your notes":"Upload notes to generate questions"}</h2><p className="mt-2 text-sm leading-6 text-white/40">{files?"These are representative question slots. Full AI-generated questions will use your actual notes after document processing is connected.":"Your uploaded material will be used as the only knowledge source for this practice set."}</p></div><div className="mt-4 space-y-3">{files?[1,2,3].map(n=><div key={n} className="rounded-2xl border border-white/8 p-4"><span className="text-xs text-white/30">{type} • Expected Question {n}</span><p className="mt-2 text-sm text-white/65">{type==="Prelims"?"Consider the following statements regarding the topic covered in your notes. Which of the statements given above are correct?":"Discuss the significance of the topic covered in your notes with suitable examples."}</p></div>):null}</div></div>}
