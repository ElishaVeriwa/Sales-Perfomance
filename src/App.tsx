import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { motion } from "motion/react";
import { NotebookSection } from './components/NotebookSection';
import { CodeSnippet } from './components/CodeSnippet';
import { getAggregatedByRegion, getMonthlyTrends, salesData } from './services/dataService';
import { Database, FileSpreadsheet, GitBranch, Github, Linkedin, Mail } from 'lucide-react';

const regionData = getAggregatedByRegion();
const trendData = getMonthlyTrends();

export default function App() {
  return (
    <div className="min-h-screen bg-bg selection:bg-accent selection:text-white">
      {/* Header / Portfolio Intro */}
      <header className="border-b border-line bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-ink rounded-lg flex items-center justify-center text-white font-display italic text-xl">
              S
            </div>
            <div>
              <h1 className="font-semibold text-sm">SaleInsight Portfolio</h1>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">Ver: 2.0.4 - STABLE</p>
            </div>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#" className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-600"><Github size={18} /></a>
            <a href="#" className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-600"><Linkedin size={18} /></a>
            <a href="#" className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-600"><Mail size={18} /></a>
          </nav>
        </div>
      </header>

      <main className="notebook-container">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-32"
        >
          <div className="flex items-center gap-2 mb-4 text-accent font-mono text-xs font-semibold uppercase tracking-widest">
            <Database size={14} />
            Data Science Project Portfolio
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-8">
            Global Sales Ecosystem: <br />
            <span className="text-neutral-400 font-display italic">Performance & Profitability</span>
          </h1>
          <p className="text-xl text-neutral-600 leading-relaxed max-w-2xl">
            A comprehensive exploratory data analysis (EDA) using high-fidelity sales logs. 
            This notebook documents the methodologies used to identify high-growth regions 
            and seasonal volatility.
          </p>
        </motion.div>

        {/* Step 01: Environment & Setup */}
        <NotebookSection step="01" title="Environment & Ingestion">
          <p className="mb-4 text-neutral-600">
            Before diving into the analysis, we initialize the environment with the necessary packages 
            and load our raw dataset containing transaction-level records.
          </p>
          <CodeSnippet code={`library(tidyverse)\nlibrary(scales)\n\n# Load 2025 Global Sales Ledger\nsales_raw <- read_csv("global_sales_2025.csv")\nsummary(sales_raw)`} />
          
          <div className="data-grid bg-white">
            <div className="data-row bg-neutral-50 border-b border-line text-[10px] uppercase font-bold tracking-widest text-neutral-500">
              <div>Region</div>
              <div>Category</div>
              <div className="text-right">Sales ($)</div>
              <div className="text-right">Profit ($)</div>
            </div>
            {salesData.slice(0, 4).map((row) => (
              <div key={row.id} className="data-row font-mono text-sm">
                <div className="font-sans font-medium">{row.region}</div>
                <div className="text-neutral-500">{row.category}</div>
                <div className="text-right font-semibold">${row.sales.toLocaleString()}</div>
                <div className="text-right text-emerald-600 font-semibold">+${row.profit.toLocaleString()}</div>
              </div>
            ))}
            <div className="p-4 text-[10px] text-center text-neutral-400 italic">
              Showing first 4 of 2,450 records
            </div>
          </div>
        </NotebookSection>

        {/* Step 02: Regional Distribution */}
        <NotebookSection step="02" title="Regional Distribution Analysis">
          <p className="mb-6 text-neutral-600">
            We aggregate sales performance across major geographical sectors to understand primary revenue drivers. 
            Asia currently leads in volume, though North America maintains higher margins in Technology.
          </p>
          
          <div className="h-[350px] w-full bg-white p-8 rounded-xl border border-line mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#666' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#666' }}
                  tickFormatter={(val) => `$${val/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  cursor={{ fill: '#f8f9fa' }}
                />
                <Bar dataKey="sales" fill="#1A1A1A" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="profit" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-white border border-line rounded-xl">
              <div className="stat-label">Highest Growth</div>
              <div className="text-3xl font-bold">Asia Pacific</div>
              <div className="text-emerald-500 text-sm font-semibold mt-1">↑ 14.2% YoY</div>
            </div>
            <div className="p-6 bg-white border border-line rounded-xl">
              <div className="stat-label">Market Leader</div>
              <div className="text-3xl font-bold">North America</div>
              <div className="text-neutral-500 text-sm font-semibold mt-1">42% Net Revenue</div>
            </div>
          </div>
        </NotebookSection>

        {/* Step 03: Monthly Momentum */}
        <NotebookSection step="03" title="Temporal Performance Momentum">
          <p className="mb-6 text-neutral-600">
            Visualizing monthly trends reveals a strong Q1 closure. We utilize a dual-axis trend line to correlate 
            gross revenue with bottom-line profitability fluctuations.
          </p>

          <div className="h-[350px] w-full bg-white p-8 rounded-xl border border-line mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#666' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#666' }}
                  tickFormatter={(val) => `$${val/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                <Line type="monotone" dataKey="profit" stroke="#1A1A1A" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <CodeSnippet code={`# Time Series forecasting for Q3\nsales_ts <- trendData %>% mutate(month = as.Date(paste0(date, "-01")))\nggplot(sales_ts, aes(x=month, y=sales)) + \n  geom_smooth(method="loess", se=FALSE, color="#2563EB")`} />
        </NotebookSection>

        {/* Step 04: Conclusion */}
        <NotebookSection step="04" title="Strategic Conclusions">
          <div className="p-8 bg-neutral-900 text-white rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <FileSpreadsheet size={120} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Key Findings</h3>
            <ul className="space-y-4 text-neutral-300">
              <li className="flex gap-3">
                <span className="text-accent font-bold">01.</span>
                <span>Technology remains the dominant vertical, accounting for 48% of total profit margins globally.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">02.</span>
                <span>Operational costs in Europe are currently 12% higher than similar North American operations due to logistics shifts.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">03.</span>
                <span>Forecasting models suggest a potential 8% revenue drop in Q3 unless emerging markets are expanded.</span>
              </li>
            </ul>
            <div className="mt-8 flex gap-4">
              <button className="px-6 py-3 bg-accent hover:bg-blue-600 transition-colors rounded-lg font-semibold text-sm">Download Full Report</button>
              <button className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-lg font-semibold text-sm">View Raw Dataset</button>
            </div>
          </div>
        </NotebookSection>
      </main>

      <footer className="py-20 border-t border-line text-center text-neutral-400 text-sm">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-center items-center gap-2 mb-4">
            <GitBranch size={14} />
            <span className="font-mono">branch: production - main</span>
          </div>
          <p>© 2026 SalesInsight Analytics Portfolio. Built with React, Recharts & R Methodology.</p>
        </div>
      </footer>
    </div>
  );
}
