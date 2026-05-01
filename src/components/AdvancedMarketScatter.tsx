import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { getMarketMaturityData } from '../services/dataService';
import { Target, TrendingUp, AlertTriangle, Infinity } from 'lucide-react';

export const AdvancedMarketScatter = () => {
  const data = getMarketMaturityData();
  
  const categoryColors: Record<string, string> = {
    'Technology': '#2563EB',
    'Furniture': '#1A1A1A',
    'Office Supplies': '#10B981'
  };

  return (
    <div className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 mt-12 relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
        <div>
          <h3 className="text-white text-xl font-bold flex items-center gap-2">
            Strategic Maturity Matrix
            <span className="text-[10px] bg-white/10 text-white/60 px-2 py-0.5 rounded uppercase tracking-tighter">Multi-Dimensional</span>
          </h3>
          <p className="text-xs text-neutral-500 font-mono mt-1">Axes: Revenue vs Margin % | Bubble Size: Absolute Profit</p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          {Object.entries(categoryColors).map(([cat, color]) => (
            <div key={cat} className="flex items-center gap-2 text-[10px] text-neutral-400 font-mono">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              {cat}
            </div>
          ))}
        </div>
      </div>

      <div className="relative h-[400px] w-full">
        {/* Quadrant Labels */}
        <div className="absolute top-4 right-4 text-[9px] uppercase tracking-widest text-neutral-700 font-bold flex items-center gap-1">
          Cash Cows <TrendingUp size={10} />
        </div>
        <div className="absolute top-4 left-4 text-[9px] uppercase tracking-widest text-neutral-700 font-bold flex items-center gap-1">
          Stars <Target size={10} />
        </div>
        <div className="absolute bottom-4 left-4 text-[9px] uppercase tracking-widest text-neutral-700 font-bold flex items-center gap-1">
          Dogs <AlertTriangle size={10} />
        </div>
        <div className="absolute bottom-4 right-4 text-[9px] uppercase tracking-widest text-neutral-700 font-bold flex items-center gap-1">
          Question Marks <Infinity size={10} />
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
            <XAxis 
              type="number" 
              dataKey="sales" 
              name="Sales" 
              unit="$" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 10, fill: '#525252' }}
              label={{ value: 'Gross Sales Volume', position: 'bottom', offset: 0, fill: '#404040', fontSize: 10, fontWeight: 'bold' }}
            />
            <YAxis 
              type="number" 
              dataKey="margin" 
              name="Margin" 
              unit="%" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 10, fill: '#525252' }}
              label={{ value: 'Profit Margin (%)', angle: -90, position: 'left', fill: '#404040', fontSize: 10, fontWeight: 'bold' }}
            />
            <ZAxis type="number" dataKey="profit" range={[200, 2000]} name="Profit" />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3', stroke: '#404040' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="bg-white p-4 rounded-lg shadow-2xl border border-line min-w-[180px]">
                      <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-2">{d.region}</p>
                      <h5 className="font-bold text-ink mb-3 border-b border-line pb-2">{d.category}</h5>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Sales:</span>
                          <span className="font-mono font-bold">${d.sales.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Margin:</span>
                          <span className="font-mono font-bold text-accent">{d.margin.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-line mt-1">
                          <span className="text-neutral-500">Profit:</span>
                          <span className="font-mono font-bold text-emerald-600">${d.profit.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine x={40000} stroke="#404040" strokeDasharray="5 5" />
            <ReferenceLine y={20} stroke="#404040" strokeDasharray="5 5" />
            <Scatter name="MaturityData" data={data}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={categoryColors[entry.category] || '#ccc'} fillOpacity={0.8} stroke="#fff" strokeWidth={1} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-neutral-800/50 rounded-xl border border-neutral-700">
            <h6 className="text-white text-[10px] font-bold uppercase tracking-widest mb-2">Efficiency Leader</h6>
            <div className="text-xl font-bold text-accent">31.2%</div>
            <p className="text-[9px] text-neutral-500 mt-1 uppercase font-mono">Matabeleland / Technology</p>
        </div>
        <div className="p-4 bg-neutral-800/50 rounded-xl border border-neutral-700">
            <h6 className="text-white text-[10px] font-bold uppercase tracking-widest mb-2">Volume Champion</h6>
            <div className="text-xl font-bold text-white">$61.0k</div>
            <p className="text-[9px] text-neutral-500 mt-1 uppercase font-mono">Matabeleland / Technology</p>
        </div>
        <div className="p-4 bg-neutral-800/50 rounded-xl border border-neutral-700">
            <h6 className="text-white text-[10px] font-bold uppercase tracking-widest mb-2">Stability Index</h6>
            <div className="text-xl font-bold text-emerald-500">High</div>
            <p className="text-[9px] text-neutral-500 mt-1 uppercase font-mono">Strong Clustering Observed</p>
        </div>
      </div>
    </div>
  );
};
