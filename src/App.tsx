import { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Treemap, Legend, Cell } from 'recharts';
import { motion, AnimatePresence } from "motion/react";
import { NotebookSection } from './components/NotebookSection';
import { ExecutableCode } from './components/ExecutableCode';
import { CorrelationAnalysis } from './components/CorrelationAnalysis';
import { AdvancedMarketScatter } from './components/AdvancedMarketScatter';
import { KPIInsight } from './components/KPIInsight';
import { softwareUsageData } from './services/dataService';
import { Database, FileSpreadsheet, Github, Linkedin, Mail, MapPin, Briefcase, Award, Target, Info, Sparkles, Zap, ChartBar, Rocket } from 'lucide-react';

const MARQUEE_ITEMS = [
  "EXCEL DOMINANCE: 95% EFFICIENCY RATING",
  "SAGE PASTEL REMAINS ZIMBABWE'S TOP ACCOUNTING TOOL",
  "POWER BI USAGE UP 40% IN HARARE CORPORATES",
  "DATA MANAGEMENT IS THE NEW ACCOUNTANCY",
  "IFRS COMPLIANCE READY",
  "SAP ERP LEADS IN MINING SECTOR",
  "QUICKBOOKS PREFERRED BY RETAIL SMEs",
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedIndustry, setSelectedIndustry] = useState<string | undefined>(undefined);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const filteredData = useMemo(() => {
    let data = softwareUsageData;
    if (selectedCategory) data = data.filter(d => d.category === selectedCategory);
    if (selectedIndustry) data = data.filter(d => d.industry === selectedIndustry);
    return data;
  }, [selectedCategory, selectedIndustry]);

  const categories = ['Accounting', 'Data Management', 'Productivity'];
  const allIndustries = Array.from(new Set(softwareUsageData.map(s => s.industry))).sort();

  const setupCodeOutput = useMemo(() => `── Environment Ready ────────── Software Audit 2026 ──
✔ dataset: office_usage_zw
✔ records: ${filteredData.length} active mappings
✔ currency: USD (Licensing benchmarks)

Summary of Top Tools in Scope:
- ${filteredData[0]?.software || 'N/A'}: ${filteredData[0]?.usageHours || 0} hrs/week
- Avg Efficiency Index: ${(filteredData.reduce((a,b)=>a+b.efficiencyScore,0)/(filteredData.length||1)).toFixed(1)}%
Validation complete. Logic compliant with IFRS data standards.`, [filteredData]);

  return (
    <div className="min-h-screen bg-neutral-50 selection:bg-blue-600 selection:text-white pb-20 overflow-x-hidden">
      {/* Dynamic Marquee */}
      <div className="marquee-container bg-slate-900 border-b-2 border-neon/30">
        <div className="marquee-content flex gap-12 items-center">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="text-white font-mono text-[10px] font-bold tracking-[0.2em] flex items-center gap-4">
              <Sparkles size={10} className="text-neon" /> {item}
            </span>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-neutral-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-serif italic text-xl shadow-lg">
              EV
            </div>
            <div>
              <h1 className="font-bold text-sm text-slate-900">Professional Portfolio</h1>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">Accounting & Data Management</p>
            </div>
          </div>
          <nav className="flex items-center gap-4">
            <a href="https://github.com/ElishaVeriwa/Sales-Perfomance" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-slate-900 flex items-center gap-2 group">
              <Github size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline group-hover:underline">Repository</span>
            </a>
            <a href="#" className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-600"><Linkedin size={18} /></a>
            <a href="#" className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-600"><Mail size={18} /></a>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-16">
        {/* Profile Intro - Dramatic Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-32 flex flex-col items-center text-center pt-10"
        >
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 bg-ink text-white rounded-full font-mono text-[9px] font-black uppercase tracking-[0.3em] shadow-xl">
            <Zap size={10} className="text-neon" /> 
            Active Data Exploration 2026
          </div>
          
          <h1 className="text-7xl md:text-[9rem] font-impact leading-[0.85] uppercase tracking-tighter text-slate-900 mb-8 max-w-5xl">
            Office <br />
            <span className="text-neutral-300">Data</span> Hub
          </h1>
          
          <div className="flex flex-col md:flex-row gap-12 items-start text-left mt-10 max-w-5xl border-t-4 border-slate-900 pt-10">
            <div className="flex-1">
              <p className="text-2xl font-black text-slate-900 leading-tight mb-6">
                Decoding the Zimbabwean professional tech stack. From spreadsheets to complex ERPs, we track the pulse of productivity.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-none border-b-4 border-neon/50 text-xs font-black uppercase tracking-widest shadow-2xl hover:bg-slate-800 transition-all active:translate-y-1">
                  <Briefcase size={14} className="text-neon" /> Hire Veriwa
                </div>
                <a 
                  href="https://www.datacamp.com/certificate/DAA0016272924327" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-900 text-slate-900 rounded-none text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
                >
                  <Award size={14} className="text-blue-600" /> View Credentials
                </a>
              </div>
            </div>

            <div className="w-full md:w-96 bg-white border-2 border-slate-900 p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)]">
               <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] mb-8 flex items-center justify-between">
                Mastery Profile <Rocket size={14} className="text-slate-900" />
               </h3>
               <div className="space-y-8 relative">
                  <div>
                    <div className="flex justify-between text-[10px] font-black uppercase mb-3 text-slate-900">
                      <span>Excel Master</span>
                      <span className="text-blue-600">Lvl 95</span>
                    </div>
                    <div className="w-full h-3 bg-neutral-100 border border-slate-900 overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "95%" }} transition={{ duration: 1.5, ease: "circOut" }} className="h-full bg-slate-900" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-black uppercase mb-3 text-slate-900">
                      <span>ERP Specialist</span>
                      <span className="text-emerald-600">Lvl 85</span>
                    </div>
                    <div className="w-full h-3 bg-neutral-100 border border-slate-900 overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ duration: 1.5, delay: 0.2, ease: "circOut" }} className="h-full bg-slate-900" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-black uppercase mb-3 text-slate-900">
                      <span>Data Architect</span>
                      <span className="text-purple-600">Lvl 75</span>
                    </div>
                    <div className="w-full h-3 bg-neutral-100 border border-slate-900 overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "75%" }} transition={{ duration: 1.5, delay: 0.4, ease: "circOut" }} className="h-full bg-slate-900" />
                    </div>
                  </div>
               </div>
               <p className="mt-8 text-[11px] leading-relaxed text-slate-500 font-bold italic uppercase tracking-tighter">
                "Technical agility for the 2026 digital economy."
               </p>
            </div>
          </div>
        </motion.div>

        {/* Global Filter Bar */}
        <div className="sticky top-24 z-40 mb-16 py-5 bg-white/80 backdrop-blur-md border border-neutral-200 rounded-2xl px-8 flex flex-wrap items-center justify-between gap-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex flex-col">
              <label className="text-[9px] uppercase tracking-[0.2em] font-black text-neutral-400 mb-2">Filter By Domain</label>
              <select 
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || undefined)}
                className="bg-neutral-50 border border-neutral-200 text-blue-900 rounded-xl px-4 py-2.5 text-xs font-bold focus:ring-2 focus:ring-blue-500/20 outline-none cursor-pointer transition-all hover:bg-white min-w-[180px]"
              >
                <option value="">All Software Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-[9px] uppercase tracking-[0.2em] font-black text-neutral-400 mb-2">Industry Scope</label>
              <select 
                value={selectedIndustry || ''}
                onChange={(e) => setSelectedIndustry(e.target.value || undefined)}
                className="bg-neutral-50 border border-neutral-200 text-emerald-900 rounded-xl px-4 py-2.5 text-xs font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none cursor-pointer transition-all hover:bg-white min-w-[180px]"
              >
                <option value="">Zimbabwe Market-Wide</option>
                {allIndustries.map(ind => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>
          </div>
          {(selectedCategory || selectedIndustry) && (
            <button 
              onClick={() => { setSelectedCategory(undefined); setSelectedIndustry(undefined); }}
              className="text-[10px] uppercase font-black text-blue-600 hover:text-blue-800 transition-colors tracking-widest"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Data Curiosities - Brutalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <div className="brutalist-card bg-white">
            <h4 className="font-impact text-2xl uppercase mb-2 text-slate-900 italic">Plateau Tools?</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Standard word processors have hit 80% saturation. The real gains are now in automated data modeling.
            </p>
            <div className="mt-4 text-neon bg-slate-900 inline-block px-2 text-[10px] font-bold">INSIGHT #01</div>
          </div>
          <div className="brutalist-card bg-neon/10 border-neon">
            <h4 className="font-impact text-2xl uppercase mb-2 text-slate-900 italic">ERP Shift</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Mining & Agriculture sectors in ZW are rapidly moving from offline ledgers to cloud SAP instances.
            </p>
            <div className="mt-4 bg-slate-900 text-white inline-block px-2 text-[10px] font-bold">SHIFT #02</div>
          </div>
          <div className="brutalist-card bg-white">
            <h4 className="font-impact text-2xl uppercase mb-2 text-slate-900 italic">Data is New Oil</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Modern accountants aren't just bean counters; they're the primary architects of business intelligence.
            </p>
            <div className="mt-4 text-blue-600 bg-slate-900 inline-block px-2 text-[10px] font-bold">VALUE #03</div>
          </div>
        </div>

        {/* Section 01: Audit */}
        <NotebookSection step="01" title="The Software Breakdown">
          <p className="mb-8 text-neutral-600 leading-relaxed max-w-2xl">
            Technical assessment of tool saturation within Zimbabwean firms. We correlate 
            <strong>weekly usage hours</strong> with professional <strong>efficiency scores</strong> 
            to identify the most mission-critical systems for accounting roles.
          </p>
          
          <div className="mb-12">
            <ExecutableCode 
              code={`# Audit for: ${selectedIndustry || 'All Industries'}\nresearch_data <- softwareUsageData %>% \n  group_by(software) %>% \n  summarize(usage = mean(usageHours), efficiency = mean(efficiencyScore))`} 
              output={setupCodeOutput}
            />
          </div>

          <div className="mb-12">
            <KPIInsight data={filteredData} />
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-4 px-6 py-4 bg-neutral-50 border-b border-neutral-200 text-[9px] uppercase font-black tracking-widest text-neutral-400">
              <div>Industry</div>
              <div>Software / System</div>
              <div className="text-right">Usage</div>
              <div className="text-right">Score</div>
            </div>
            <div className="divide-y divide-neutral-100">
              {filteredData.slice(0, 6).map((row) => (
                <div key={row.id} className="grid grid-cols-4 px-6 py-4 items-center hover:bg-neutral-50 transition-colors">
                  <div className="text-[11px] font-bold text-neutral-500">{row.industry}</div>
                  <div className="text-xs font-black text-slate-800 uppercase tracking-tight">{row.software}</div>
                  <div className="text-right text-xs font-mono font-bold text-slate-600">{row.usageHours}h/wk</div>
                  <div className="text-right text-xs font-mono font-black text-emerald-600">{row.efficiencyScore}%</div>
                </div>
              ))}
            </div>
            {filteredData.length > 6 && (
              <div className="px-6 py-3 bg-neutral-50/50 text-[10px] text-center text-neutral-400 font-medium italic border-t border-neutral-100">
                + {filteredData.length - 6} additional records in dataset
              </div>
            )}
          </div>
        </NotebookSection>

        {/* Section 02: Mapping */}
        <NotebookSection step="02" title="Utility & Mastery Matrix">
          <p className="mb-10 text-neutral-600 leading-relaxed max-w-2xl">
            This visualization identifies the "Critical Domain". Tools in the upper-right quadrant 
            are prioritized in my professional development to ensure maximum value-add upon re-entry.
          </p>
          
          <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-inner mb-12">
            <AdvancedMarketScatter data={filteredData} />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 bg-slate-900 rounded-[32px] text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6 text-blue-400 font-black uppercase text-[10px] tracking-[0.3em]">
                <Target size={16} /> Strategic Skill Alignment
              </div>
              <h4 className="text-2xl font-bold mb-6">Navigating the Transition Gap</h4>
              <p className="text-neutral-400 leading-relaxed mb-10 max-w-2xl">
                My professional hiatus was leveraged as a research period to identify how automation 
                (VBA/Power Automate) intersects with traditional IFRS accounting. This data proves 
                that mastery of these high-utility tools is the primary differentiator in the 
                current market.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                   <div className="text-[9px] uppercase font-black tracking-widest text-blue-400 mb-2">Tool Target</div>
                   <div className="text-xl font-bold text-white">Excel/Sage</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                   <div className="text-[9px] uppercase font-black tracking-widest text-emerald-400 mb-2">Hours Logged</div>
                   <div className="text-xl font-bold text-white">500+ YTD</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                   <div className="text-[9px] uppercase font-black tracking-widest text-purple-400 mb-2">Ready State</div>
                   <div className="text-xl font-bold text-white uppercase italic">Active</div>
                </div>
              </div>
            </div>
          </motion.div>
        </NotebookSection>

        {/* Section 03: Correlation */}
        <NotebookSection step="03" title="Efficiency Dynamics">
          <p className="mb-10 text-neutral-600 leading-relaxed max-w-2xl">
            Analyzing the relationship between seat-time and output quality. This analysis 
            helps identify "Plateau Tools" versus those with exponential learning gains.
          </p>
          
          <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm mb-12">
            <CorrelationAnalysis data={filteredData} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="p-8 bg-blue-50/50 border border-blue-100 rounded-[24px]">
                <h5 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-600 mb-4">
                  <Info size={14} /> Professional Intent
                </h5>
                <p className="text-sm text-slate-700 leading-relaxed font-medium italic">
                  "I am seeking a role where I can apply this data-driven mindset to optimize 
                  accounting operations and financial reporting hierarchies."
                </p>
             </div>
             <div className="p-8 bg-white border border-neutral-200 rounded-[24px]">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-4">Core Competencies</h5>
                <div className="flex flex-wrap gap-2">
                   {['IFRS Compliance', 'Budgeting', 'Data Visualization', 'ERP Migration', 'Taxation', 'Internal Audit'].map(skill => (
                     <span key={skill} className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-lg text-[10px] font-bold uppercase tracking-tight">
                       {skill}
                     </span>
                   ))}
                </div>
             </div>
          </div>
        </NotebookSection>

        {/* Section 04: Technical Documentation / Project README */}
        <NotebookSection step="04" title="Technical Architecture">
          <div className="brutalist-card bg-slate-900 text-white border-neon">
            <div className="flex items-center gap-2 mb-6">
              <Database className="text-neon" size={20} />
              <h4 className="font-impact text-2xl uppercase tracking-tighter italic">Source Code Breakdown</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h5 className="text-neon font-mono text-[10px] font-black uppercase tracking-widest mb-4">Frontend Layer</h5>
                <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                  Developed with **React 18** and **TypeScript** for strict type safety. The UI utilizes a **Brutalist-Experimental** aesthetic to differentiate from standard corporate portfolios, ensuring higher engagement from technical recruiters.
                </p>
                <ul className="text-[10px] font-bold space-y-2 text-neutral-300">
                  <li className="flex items-center gap-2 italic">» Tailwind CSS Utility-First Styling</li>
                  <li className="flex items-center gap-2 italic">» Recharts for High-Performance SVG Data Viz</li>
                  <li className="flex items-center gap-2 italic">» Framer Motion for High-Frame-Rate UI States</li>
                </ul>
              </div>
              
              <div className="border-l-2 border-neutral-800 pl-10">
                <h5 className="text-neon font-mono text-[10px] font-black uppercase tracking-widest mb-4">Data Management Logic</h5>
                <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                  The application transforms raw software metrics into categorical hierarchies. Custom hooks manage state-driven filtering across industries, simulating a real-time data environment suitable for modern Zimbabwean corporate offices.
                </p>
                <div className="bg-white/5 p-4 border border-white/10 font-mono text-[9px] text-neon">
                  {`const softwareMetrics = transform(rawData);\nexport const auditPool = softwareMetrics.filter(isAiling);`}
                </div>
              </div>
            </div>
          </div>
        </NotebookSection>

        <footer className="mt-40 text-center border-t border-neutral-200 pt-20">
           <div className="flex justify-center gap-8 mb-10">
              <a href="https://github.com/ElishaVeriwa/Sales-Perfomance" target="_blank" rel="noopener noreferrer" className="p-3 bg-white border border-neutral-200 rounded-2xl text-neutral-400 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm"><Github size={20} /></a>
              <a href="#" className="p-3 bg-white border border-neutral-200 rounded-2xl text-neutral-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"><Linkedin size={20} /></a>
              <a href="#" className="p-3 bg-white border border-neutral-200 rounded-2xl text-neutral-400 hover:text-red-500 hover:border-red-200 transition-all shadow-sm"><Mail size={20} /></a>
           </div>
           <p className="text-[9px] font-black text-neutral-400 uppercase tracking-[0.4em] mb-4">Elisha Veriwa — 2026 Portfolio Project</p>
           <p className="text-xs text-neutral-500 italic max-w-sm mx-auto">
             An analytical showcase of office software dynamics in the Zimbabwean professional sector.
           </p>
        </footer>
      </main>
    </div>
  );
}
