import { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { Target, TrendingUp, AlertTriangle, Infinity, Monitor } from 'lucide-react';
import { SoftwareMetric } from '../services/dataService';

export const AdvancedMarketScatter = ({ data }: { data: SoftwareMetric[] }) => {
  const categoryColors: Record<string, string> = {
    'Accounting': '#1E3A8A', // Deep Blue
    'Data Management': '#059669', // Emerald
    'Productivity': '#7C3AED' // Violet
  };

  const metrics = useMemo(() => {
    if (!data.length) return null;
    const sortedByEfficiency = [...data].sort((a, b) => b.efficiencyScore - a.efficiencyScore);
    const sortedByUsage = [...data].sort((a, b) => b.usageHours - a.usageHours);
    return {
      efficiency: sortedByEfficiency[0],
      usage: sortedByUsage[0],
      avgEfficiency: data.reduce((acc, curr) => acc + curr.efficiencyScore, 0) / data.length
    };
  }, [data]);

  return (
    <div className="bg-white p-8 rounded-2xl border border-line mt-12 relative overflow-hidden shadow-sm">
      <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
        <div>
          <h3 className="text-ink text-xl font-bold flex items-center gap-2">
            Software Utility Matrix
            <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded uppercase tracking-tighter font-bold">Zimbabwe Office Stack</span>
          </h3>
          <p className="text-xs text-neutral-500 font-mono mt-1 italic">Axes: Weekly Usage (Hrs) x Efficiency Score | Size: Market Impact</p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          {Object.entries(categoryColors).map(([cat, color]) => (
            <div key={cat} className="flex items-center gap-2 text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              {cat}
            </div>
          ))}
        </div>
      </div>

      <div className="relative h-[450px] w-full border border-neutral-50 rounded-xl bg-neutral-50/30 p-4">
        {/* Quadrant Labels */}
        <div className="absolute top-8 right-8 text-[10px] uppercase tracking-widest text-neutral-300 font-black pointer-events-none">
          Mission Critical <TrendingUp size={12} className="inline ml-1 mb-1" />
        </div>
        <div className="absolute top-8 left-8 text-[10px] uppercase tracking-widest text-neutral-300 font-black pointer-events-none">
          Specialized Tools <Target size={12} className="inline ml-1 mb-1" />
        </div>
        <div className="absolute bottom-16 left-20 text-[10px] uppercase tracking-widest text-neutral-300 font-black pointer-events-none">
          Legacy / Overhead <AlertTriangle size={12} className="inline ml-1 mb-1" />
        </div>
        <div className="absolute bottom-16 right-8 text-[10px] uppercase tracking-widest text-neutral-300 font-black pointer-events-none">
          Prioritized Gaps <Infinity size={12} className="inline ml-1 mb-1" />
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis 
              type="number" 
              dataKey="usageHours" 
              name="Usage" 
              unit=" hrs" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 'bold' }}
              domain={[0, 50]}
              label={{ value: 'WEEKLY OFFICE USAGE (HRS)', position: 'insideBottom', offset: -25, fill: '#9ca3af', fontSize: 10, fontWeight: 'black', letterSpacing: '0.1em' }}
            />
            <YAxis 
              type="number" 
              dataKey="efficiencyScore" 
              name="Efficiency" 
              unit="%" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 'bold' }}
              domain={[0, 100]}
              label={{ value: 'SYSTEM EFFICIENCY (%)', angle: -90, position: 'insideLeft', offset: 0, fill: '#9ca3af', fontSize: 10, fontWeight: 'black', letterSpacing: '0.1em' }}
            />
            <ZAxis type="number" dataKey="efficiencyScore" range={[200, 1000]} name="Impact" />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3', stroke: '#cbd5e1' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="bg-white p-4 rounded-xl shadow-2xl border border-line min-w-[200px]">
                      <div className="flex items-center gap-2 mb-3 border-b border-line pb-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: categoryColors[d.category] }} />
                        <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">{d.industry}</p>
                      </div>
                      <h5 className="font-bold text-ink mb-3">{d.software}</h5>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-500 font-medium">Usage Frequency:</span>
                          <span className="font-mono font-bold text-ink">{d.usageHours} hrs/week</span>
                        </div>
                        <div className="flex justify-between items-center bg-neutral-50 p-2 rounded-lg mt-2">
                          <span className="text-neutral-500 font-medium">Efficiency Index:</span>
                          <span className="font-mono font-bold text-accent">{d.efficiencyScore}%</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine x={25} stroke="#cbd5e1" strokeDasharray="5 5" label={{ position: 'top', value: 'AVG USAGE', fill: '#94a3b8', fontSize: 8, fontWeight: 'bold' }} />
            <ReferenceLine y={75} stroke="#cbd5e1" strokeDasharray="5 5" label={{ position: 'right', value: 'BENCHMARK', fill: '#94a3b8', fontSize: 8, fontWeight: 'bold' }} />
            <Scatter name="SoftwareData" data={data} animationBegin={500} animationDuration={1500} animationEasing="ease-out">
              {data.map((entry, index) => {
                const isMax = entry.efficiencyScore === Math.max(...data.map(d => d.efficiencyScore));
                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={categoryColors[entry.category] || '#94a3b8'} 
                    fillOpacity={0.8} 
                    stroke={isMax ? '#000' : '#fff'} 
                    strokeWidth={isMax ? 2 : 1.5} 
                  />
                );
              })}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 bg-neutral-50 rounded-2xl border border-line transition-all hover:shadow-md">
            <h6 className="text-neutral-400 text-[10px] font-black uppercase tracking-widest mb-2">Efficiency Leader</h6>
            <div className="text-2xl font-bold text-accent">{metrics?.efficiency?.efficiencyScore.toFixed(1)}%</div>
            <p className="text-[10px] text-neutral-500 mt-2 uppercase font-bold tracking-tight">
              {metrics?.efficiency?.software} / {metrics?.efficiency?.industry}
            </p>
        </div>
        <div className="p-5 bg-neutral-50 rounded-2xl border border-line transition-all hover:shadow-md">
            <h6 className="text-neutral-400 text-[10px] font-black uppercase tracking-widest mb-2">Usage Ceiling</h6>
            <div className="text-2xl font-bold text-ink">{metrics?.usage?.usageHours} hrs</div>
            <p className="text-[10px] text-neutral-500 mt-2 uppercase font-bold tracking-tight">
              {metrics?.usage?.software} / {metrics?.usage?.industry}
            </p>
        </div>
        <div className="p-5 bg-neutral-50 rounded-2xl border border-line transition-all hover:shadow-md">
            <h6 className="text-neutral-400 text-[10px] font-black uppercase tracking-widest mb-2">Stack Stability</h6>
            <div className="text-2xl font-bold text-emerald-600">High</div>
            <p className="text-[10px] text-neutral-500 mt-2 uppercase font-bold tracking-tight">
              Avg. Efficiency: {metrics?.avgEfficiency.toFixed(1)}%
            </p>
        </div>
      </div>
    </div>
  );
};

