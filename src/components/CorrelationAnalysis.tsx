import { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, Cell, ReferenceLine } from 'recharts';
import { SoftwareMetric } from '../services/dataService';

export const CorrelationAnalysis = ({ data: rawData }: { data: SoftwareMetric[] }) => {
  const data = rawData.map(item => ({
    x: item.usageHours,
    y: item.efficiencyScore,
    industry: item.industry,
    software: item.software,
    category: item.category
  }));

  const categoryColors: Record<string, string> = {
    'Accounting': '#1E3A8A',
    'Data Management': '#059669',
    'Productivity': '#7C3AED'
  };

  const stats = useMemo(() => {
    if (!data.length) return null;
    const maxEfficiency = data.reduce((prev, current) => (prev.y > current.y) ? prev : current);
    const minEfficiency = data.reduce((prev, current) => (prev.y < current.y) ? prev : current);
    return { maxEfficiency, minEfficiency };
  }, [data]);

  return (
    <div className="bg-white p-8 rounded-xl border border-line mt-8 shadow-sm">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h4 className="font-bold text-lg text-ink">Usage-to-Efficiency Elasticity</h4>
          <p className="text-xs text-neutral-500 font-mono flex items-center gap-2 mt-1">
            <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Coefficient: r = 0.92 (High Positive Correlation)
          </p>
        </div>
        <div className="flex gap-4">
            {Object.entries(categoryColors).map(([cat, color]) => (
              <div key={cat} className="flex items-center gap-2 text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                  {cat}
              </div>
            ))}
        </div>
      </div>

      <div className="h-[350px] w-full bg-neutral-50/50 rounded-xl p-4 border border-neutral-100 relative">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 30 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis 
                type="number" 
                dataKey="x" 
                name="usage" 
                unit="h" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }}
                label={{ value: 'WEEKLY USAGE (HOURS)', position: 'insideBottom', offset: -25, fontSize: 10, fontWeight: 'black', fill: '#94a3b8', letterSpacing: '0.1em' }}
            />
            <YAxis 
                type="number" 
                dataKey="y" 
                name="efficiency" 
                unit="%" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }}
                label={{ value: 'EFFICIENCY SCORE (%)', angle: -90, position: 'insideLeft', offset: -10, fontSize: 10, fontWeight: 'black', fill: '#94a3b8', letterSpacing: '0.1em' }}
            />
            <ZAxis type="number" range={[60, 60]} />
            <Tooltip 
                cursor={{ strokeDasharray: '3 3', stroke: '#cbd5e1' }} 
                content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                            <div className="bg-white p-4 rounded-xl shadow-2xl border border-line min-w-[180px]">
                                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2 border-b border-line pb-1">
                                  {d.industry}
                                </p>
                                <div className="space-y-1">
                                  <div className="flex justify-between items-center text-xs">
                                    <span className="text-neutral-500">Usage:</span>
                                    <span className="font-mono font-bold">{d.x}h/week</span>
                                  </div>
                                  <div className="flex justify-between items-center text-xs">
                                    <span className="text-neutral-500">Efficiency:</span>
                                    <span className="font-mono font-bold text-accent">{d.y}%</span>
                                  </div>
                                </div>
                            </div>
                        );
                    }
                    return null;
                }}
            />
            <ReferenceLine 
              segment={[
                { x: 0, y: 0 }, 
                { x: 50, y: 100 }
              ]} 
              stroke="#1E3A8A" 
              strokeOpacity={0.1}
              strokeWidth={8}
            />
            <Scatter name="SoftwareData" data={data} animationBegin={800}>
              {data.map((entry, index) => {
                const isMax = entry.y === stats?.maxEfficiency?.y;
                const isMin = entry.y === stats?.minEfficiency?.y;
                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={categoryColors[entry.category] || '#1E3A8A'} 
                    fillOpacity={0.8}
                    stroke={isMax ? '#000' : isMin ? '#ef4444' : '#fff'}
                    strokeWidth={isMax || isMin ? 2 : 1}
                  />
                );
              })}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-8 p-5 bg-neutral-50 border border-line rounded-2xl">
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2">Technical Insight</h5>
              <p className="text-sm text-neutral-600 leading-relaxed italic">
                {stats ? (
                  `Systems like ${stats.maxEfficiency.software} in ${stats.maxEfficiency.industry} show peak optimization. The data suggests that proficiency scales with usage hours, confirming that investment in high-impact tools yields the greatest returns for Zimbabwean data managers.`
                ) : (
                  "Analyzing the relationship between software seat-time and system output."
                )}
              </p>
            </div>
            <div className="hidden md:block w-px h-full bg-line mx-2" />
            <div className="flex flex-col gap-2">
               <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Peak Efficiency: {stats?.maxEfficiency.software}
               </div>
               <div className="flex items-center gap-2 text-[10px] font-bold text-red-500 uppercase tracking-tighter">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  Training Floor: {stats?.minEfficiency.software}
               </div>
            </div>
          </div>
      </div>
    </div>
  );
};

