"use client";
import { ArrowRight, BrainCircuit, CheckCircle2, FileText, Sparkles, Target, Timer, Upload, BarChart3 } from "lucide-react";

const features=[
  {icon:BrainCircuit,title:"AI UPSC Mentor",text:"Ask doubts, revise concepts and get a study path built around your preparation."},
  {icon:Target,title:"Prelims Practice",text:"UPSC-style MCQs with timer, negative marking, explanations and performance insights."},
  {icon:FileText,title:"Mains Evaluation",text:"Upload your handwritten answer and receive structured examiner-style feedback."},
  {icon:Upload,title:"Study From Your Notes",text:"Upload PDFs or images and turn your own material into Prelims and Mains practice."},
];

export default function Home(){
 return <main className="min-h-screen overflow-hidden bg-[#07090d] text-white">
  <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#07090d]/70 backdrop-blur-xl">
   <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
    <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-black font-black">U</div><span className="text-xl font-bold tracking-tight">UPSC<span className="text-white/55">ora</span><sup className="ml-1 text-[9px]">AI</sup></span></div>
    <div className="hidden items-center gap-8 text-sm text-white/55 md:flex"><a href="#features">Features</a><a href="#how">How it works</a><a href="#tests">Practice</a></div>
    <div className="flex items-center gap-2"><button className="rounded-xl px-4 py-2.5 text-sm text-white/70 hover:bg-white/5">Login</button><button className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black">Sign up</button></div>
   </div>
  </nav>

  <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-40 text-center">
   <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-white/[0.045] blur-3xl"/>
   <div className="relative">
    <div className="mx-auto mb-7 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs text-white/65"><Sparkles size={14}/> AI-powered UPSC preparation</div>
    <h1 className="mx-auto max-w-5xl text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">Prepare smarter.<br/><span className="text-white/45">Think like UPSC.</span></h1>
    <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-white/50 sm:text-lg">One intelligent workspace for Prelims, Mains, your notes, answer evaluation and personalized preparation.</p>
    <div className="mt-9 flex justify-center gap-3"><button className="group flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-semibold text-black">Start preparing <ArrowRight size={17} className="transition group-hover:translate-x-1"/></button><button className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-white/75">Explore features</button></div>
   </div>

   <div className="relative mx-auto mt-20 max-w-5xl rounded-[28px] border border-white/10 bg-[#0d1016] p-2 shadow-2xl shadow-black/50">
    <div className="rounded-[22px] border border-white/5 bg-[#090c11] p-5 text-left">
      <div className="mb-5 flex items-center justify-between"><div><p className="text-xs text-white/40">UPSCora Dashboard</p><p className="mt-1 text-lg font-semibold">Good evening, aspirant.</p></div><div className="rounded-xl border border-white/10 px-3 py-2 text-xs text-white/50">AI Mentor</div></div>
      <div className="grid gap-3 sm:grid-cols-3"><Stat title="Prelims accuracy" value="78%" icon={<Target size={15}/>}/><Stat title="Mains average" value="6.8/10" icon={<FileText size={15}/>}/><Stat title="Tests completed" value="47" icon={<CheckCircle2 size={15}/>}/></div>
      <div className="mt-3 grid gap-3 md:grid-cols-[1.5fr_1fr]"><div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5"><div className="flex justify-between"><span className="text-sm font-medium">Your focus areas</span><span className="text-xs text-white/35">This week</span></div><div className="mt-5 space-y-4">{["Modern History","Economy","Constitutional Law"].map((x,i)=><div key={x}><div className="mb-2 flex justify-between text-xs"><span className="text-white/60">{x}</span><span className="text-white/35">{[61,54,72][i]}%</span></div><div className="h-1.5 rounded-full bg-white/8"><div className="h-full rounded-full bg-white/70" style={{width:[61,54,72][i]+"%"}}/></div></div>)}</div></div><div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5"><p className="text-sm font-medium">Today’s recommendation</p><p className="mt-3 text-sm leading-6 text-white/45">Revise revenue settlements, then attempt a 10-question Modern History test.</p><button className="mt-5 flex items-center gap-2 text-sm font-medium">Start session <ArrowRight size={14}/></button></div></div>
    </div>
   </div>
  </section>

  <section id="features" className="mx-auto max-w-7xl px-6 py-24"><div className="max-w-2xl"><p className="text-xs uppercase tracking-[.22em] text-white/35">Built for serious preparation</p><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">Everything you need to turn preparation into progress.</h2></div><div className="mt-12 grid gap-4 md:grid-cols-2">{features.map(f=><div key={f.title} className="rounded-3xl border border-white/8 bg-white/[0.025] p-7 transition hover:-translate-y-1 hover:bg-white/[0.04]"><div className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5">{f.icon}</div><h3 className="mt-6 text-xl font-semibold">{f.title}</h3><p className="mt-3 max-w-md text-sm leading-6 text-white/45">{f.text}</p></div>)}</div></section>

  <section id="how" className="border-y border-white/8 bg-white/[0.02]"><div className="mx-auto max-w-7xl px-6 py-24"><div className="grid gap-10 md:grid-cols-3">{[{n:"01",t:"Bring your material",d:"Upload your PDFs, photos and study notes."},{n:"02",t:"Practice intelligently",d:"Generate UPSC-style Prelims and Mains questions."},{n:"03",t:"Improve continuously",d:"Track mistakes, weak topics and answer quality."}].map(x=><div key={x.n}><span className="text-xs text-white/30">{x.n}</span><h3 className="mt-5 text-xl font-semibold">{x.t}</h3><p className="mt-2 text-sm leading-6 text-white/40">{x.d}</p></div>)}</div></div></section>

  <section id="tests" className="mx-auto max-w-7xl px-6 py-24"><div className="rounded-[32px] border border-white/10 bg-white/[0.035] p-8 sm:p-12"><div className="max-w-2xl"><p className="text-xs uppercase tracking-[.2em] text-white/35">Your preparation, measured</p><h2 className="mt-4 text-3xl font-semibold sm:text-5xl">Know what to revise next.</h2><p className="mt-5 text-white/45">Performance insights connect every test, mistake and topic so your next study session has a purpose.</p></div><div className="mt-8 flex flex-wrap gap-3 text-xs text-white/50"><span className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2"><BarChart3 size={14}/> Subject analytics</span><span className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2"><Timer size={14}/> Timed tests</span><span className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2"><CheckCircle2 size={14}/> Detailed review</span></div></div></section>

  <footer className="border-t border-white/8"><div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 text-xs text-white/35"><span>© 2026 UPSCora AI</span><span>Prepare with purpose.</span></div></footer>
 </main>
}
function Stat({title,value,icon}:{title:string,value:string,icon:React.ReactNode}){return <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4"><div className="flex items-center gap-2 text-xs text-white/35">{icon}{title}</div><p className="mt-3 text-2xl font-semibold">{value}</p></div>}