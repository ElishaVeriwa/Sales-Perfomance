import { motion } from 'motion/react';
import { Zap, AlertCircle, ArrowUpRight, Cpu } from 'lucide-react';
import { SoftwareMetric } from '../services/dataService';

interface KPIInsightProps {
  data: SoftwareMetric[];
}

export const KPIInsight = ({ data }: KPIInsightProps) => {
  const totalHours = data.reduce((acc, curr) => acc + curr.usageHours, 0);
  const avgEfficiency = data.reduce((acc, curr) => acc + curr.efficiencyScore, 0) / (data.length || 1);

  const getInsight = () => {
    if (avgEfficiency > 85) return { 
        label: "Market Dominance", 
        desc: "Software stack is highly optimized for delivery.", 
        icon: <Zap className="text-amber-500" size={14} />,
        color: "bg-amber-50 border-amber-200"
    };
    if (avgEfficiency < 75) return { 
        label: "Training Opportunity", 
        desc: "Significant room for skills-based efficiency gains.", 
        icon: <AlertCircle className="text-red-500" size={14} />,
        color: "bg-red-50 border-red-200"
    };
    return { 
        label: "Standard Implementation", 
        desc: "Tools are meeting core reporting requirements.", 
        icon: <Cpu className="text-blue-500" size={14} />,
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
        <div className="text-lg font-bold font-mono">{avgEfficiency.toFixed(1)}%</div>
        <div className="text-[8px] uppercase tracking-widest text-neutral-400 font-semibold flex items-center justify-end gap-0.5">
            Avg Efficiency <ArrowUpRight size={8} />
        </div>
      </div>
    </motion.div>
  );
};
