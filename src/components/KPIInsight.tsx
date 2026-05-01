import { motion } from 'motion/react';
import { Zap, AlertCircle, ArrowUpRight } from 'lucide-react';
import { SalesRecord } from '../services/dataService';

interface KPIInsightProps {
  data: SalesRecord[];
}

export const KPIInsight = ({ data }: KPIInsightProps) => {
  const totalSales = data.reduce((acc, curr) => acc + curr.sales, 0);
  const totalProfit = data.reduce((acc, curr) => acc + curr.profit, 0);
  const margin = (totalProfit / totalSales) * 100;

  const getInsight = () => {
    if (margin > 25) return { 
        label: "High Efficiency", 
        desc: "Margins are exceeding target by 5%+", 
        icon: <Zap className="text-amber-500" size={14} />,
        color: "bg-amber-50 border-amber-200"
    };
    if (margin < 15) return { 
        label: "Margin Compression", 
        desc: "High volume but narrow profitability window.", 
        icon: <AlertCircle className="text-red-500" size={14} />,
        color: "bg-red-50 border-red-200"
    };
    return { 
        label: "Stable Equilibrium", 
        desc: "Revenue growth perfectly matched with margin.", 
        icon: <Zap className="text-blue-500" size={14} />,
        color: "bg-blue-50 border-blue-200"
    };
  };

  const insight = getInsight();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`p-4 rounded-xl border flex items-center gap-4 ${insight.color} transition-colors`}
    >
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
        {insight.icon}
      </div>
      <div className="flex-1">
        <h5 className="text-xs font-bold uppercase tracking-widest">{insight.label}</h5>
        <p className="text-[10px] text-neutral-500">{insight.desc}</p>
      </div>
      <div className="text-right">
        <div className="text-lg font-bold font-mono">{margin.toFixed(1)}%</div>
        <div className="text-[8px] uppercase tracking-widest text-neutral-400 font-semibold flex items-center justify-end gap-0.5">
            Avg Margin <ArrowUpRight size={8} />
        </div>
      </div>
    </motion.div>
  );
};
