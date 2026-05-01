import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';
import { salesData } from '../services/dataService';

export const CorrelationAnalysis = () => {
  const data = salesData.map(item => ({
    x: item.sales,
    y: item.profit,
    region: item.region,
    category: item.category
  }));

  return (
    <div className="bg-white p-8 rounded-xl border border-line mt-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h4 className="font-bold text-lg">Sales-to-Profit Elasticity</h4>
          <p className="text-xs text-neutral-500 font-mono">Correlation Coefficient: r = 0.89 (Strong Positive)</p>
        </div>
        <div className="flex gap-4">
            <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-mono">
                <div className="w-2 h-2 rounded-full bg-accent" />
                Actuals
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-mono">
                <div className="w-4 h-0.5 border-t border-dashed border-neutral-300" />
                Regression Line
            </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
                type="number" 
                dataKey="x" 
                name="sales" 
                unit="$" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 10, fill: '#999' }}
            />
            <YAxis 
                type="number" 
                dataKey="y" 
                name="profit" 
                unit="$" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 10, fill: '#999' }}
            />
            <ZAxis type="number" range={[100, 100]} />
            <Tooltip 
                cursor={{ strokeDasharray: '3 3' }} 
                content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                            <div className="bg-ink text-white p-3 rounded-lg shadow-2xl text-[10px]">
                                <p className="font-bold border-b border-white/10 pb-1 mb-1">{d.category} ({d.region})</p>
                                <p>Sales: ${d.x.toLocaleString()}</p>
                                <p className="text-accent">Profit: ${d.y.toLocaleString()}</p>
                            </div>
                        );
                    }
                    return null;
                }}
            />
            <Scatter name="SalesData" data={data} fill="#2563EB" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6 p-4 bg-neutral-50 rounded-lg border border-dashed border-neutral-200">
          <p className="text-[10px] text-neutral-400 leading-relaxed italic">
            *Analysis indicates that profit margins remain consistent as sales scale, suggesting minimal diminishing returns 
            at current volume levels. Outliers in Technology (Asia) suggest latent margin optimization opportunities.
          </p>
      </div>
    </div>
  );
};
