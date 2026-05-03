import { useState, useEffect } from 'react';
import { Terminal, Play, CheckCircle2, RotateCcw, Loader2, Code2, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ExecutableCodeProps {
  code: string;
  output?: string;
}

export const ExecutableCode = ({ code, output = "Script executed successfully." }: ExecutableCodeProps) => {
  const [status, setStatus] = useState<'idle' | 'running' | 'completed'>('idle');
  const [showConsole, setShowConsole] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleRun = () => {
    setStatus('running');
    setShowConsole(true);
    setIsExpanded(true); // Automatically expand if they run it manually
    setTimeout(() => {
      setStatus('completed');
    }, 1500);
  };

  const handleReset = () => {
    setStatus('idle');
    setShowConsole(false);
  };

  return (
    <div className="group relative rounded-xl border border-line overflow-hidden bg-bg/50 backdrop-blur-sm transition-all hover:border-accent/30 shadow-sm">
      {/* Header / Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-line bg-neutral-50/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/20 border border-red-400/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/20 border border-amber-400/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/20 border border-emerald-400/40" />
          </div>
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest ml-2">r-kernel-v4.1</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold rounded-md transition-all ${isExpanded ? 'bg-ink text-white' : 'bg-white border border-line text-neutral-500 hover:border-neutral-300'}`}
          >
            <Code2 size={10} />
            {isExpanded ? 'HIDE SOURCE' : 'VIEW SOURCE'}
            {isExpanded ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
          </button>

          {status === 'idle' && (
            <button 
              onClick={handleRun}
              className="flex items-center gap-1.5 px-3 py-1 bg-accent text-white text-[10px] font-bold rounded-md hover:bg-blue-600 transition-colors shadow-sm"
            >
              <Play size={10} fill="currentColor" />
              RUN CELL
            </button>
          )}
          {status === 'running' && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-neutral-100 text-neutral-500 text-[10px] font-bold rounded-md">
              <Loader2 size={10} className="animate-spin" />
              EXECUTING...
            </div>
          )}
          {status === 'completed' && (
            <div className="flex items-center gap-2">
               <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md border border-emerald-100">
                <CheckCircle2 size={10} />
                SUCCESS
              </div>
              <button 
                onClick={handleReset}
                className="p-1 hover:bg-neutral-100 rounded text-neutral-400 transition-colors"
                title="Restart Kernel"
              >
                <RotateCcw size={12} />
              </button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="relative border-b border-line/50"
          >
            <div className="absolute top-4 left-4 text-neutral-400">
              <Terminal size={12} />
            </div>
            <pre className="p-6 pl-10 text-sm font-mono leading-relaxed overflow-x-auto selection:bg-accent/20">
              <code className="text-blue-500/80 block mb-1"># R Source</code>
              <span className="text-ink">{code}</span>
            </pre>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showConsole && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-line bg-neutral-900 overflow-hidden"
          >
            <div className="px-10 py-6 font-mono text-xs">
              <div className="flex items-center gap-2 text-neutral-500 mb-2 border-b border-white/5 pb-2">
                <span className="text-emerald-500">&gt;</span>
                <span>Console Output</span>
                {status === 'running' && <span className="w-1 h-3 bg-neutral-600 animate-pulse" />}
              </div>
              
              {status === 'running' ? (
                <div className="text-neutral-500 italic">Processing batch frames...</div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-neutral-300 whitespace-pre-wrap leading-relaxed"
                >
                  {output}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
