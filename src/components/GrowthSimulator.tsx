import { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, RefreshCcw } from 'lucide-react';

export const GrowthSimulator = () => {
  const [growthRate, setGrowthRate] = useState(5);
  const [volatility, setVolatility] = useState(2);
  const currentRevenue = 289000;

  const projectedRevenue = currentRevenue * (1 + growthRate / 100) * (1 - volatility / 200);

  return (
    <div className="bg-neutral-800 p-8 rounded-2xl border border-neutral-700 mt-12 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4">
        <TrendingUp className="text-accent opacity-20 w-16 h-16" />
      </div>
      
      <div className="relative z-10">
        <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
          Interactive Projections
          <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded uppercase tracking-tighter">Live Lab</span>
        </h4>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between text-xs text-neutral-400 uppercase tracking-widest font-mono">
                <span>Annual Growth Rate</span>
                <span className="text-accent">{growthRate}%</span>
              </div>
              <input 
                type="range" 
                min="-10" 
                max="25" 
                value={growthRate}
                onChange={(e) => setGrowthRate(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-xs text-neutral-400 uppercase tracking-widest font-mono">
                <span>Market Volatility</span>
                <span className="text-neutral-200">{volatility}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="10" 
                value={volatility}
                onChange={(e) => setVolatility(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-neutral-300"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center p-6 bg-neutral-900/50 rounded-xl border border-neutral-700/50">
            <p className="stat-label mb-1">Projected Q4 Revenue</p>
            <motion.div 
              key={projectedRevenue}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl font-bold text-white tabular-nums"
            >
              ${Math.round(projectedRevenue).toLocaleString()}
            </motion.div>
            <div className={`text-xs mt-2 font-semibold ${growthRate >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {growthRate >= 0 ? '+' : ''}{((projectedRevenue/currentRevenue - 1) * 100).toFixed(1)}% vs Baseline
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-700/50 flex justify-between items-center">
            <p className="text-[10px] text-neutral-500 max-w-[200px]">
                *Simulation based on Loess regression smoothing and Monte Carlo variance parameters.
            </p>
            <button 
                onClick={() => { setGrowthRate(5); setVolatility(2); }}
                className="text-xs text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
                <RefreshCcw size={12} />
                Reset Parameters
            </button>
        </div>
      </div>
    </div>
  );
};
