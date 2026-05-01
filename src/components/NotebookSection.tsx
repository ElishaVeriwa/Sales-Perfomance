import { motion } from "motion/react";
import { ReactNode } from "react";

interface NotebookSectionProps {
  step: string;
  title: string;
  children: ReactNode;
  delay?: number;
}

export const NotebookSection = ({ step, title, children, delay = 0 }: NotebookSectionProps) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative mb-32"
    >
      <span className="section-number">{step}</span>
      <div className="flex items-baseline gap-4 mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <div className="h-[1px] flex-1 bg-line" />
      </div>
      <div className="prose prose-neutral max-w-none">
        {children}
      </div>
    </motion.section>
  );
};
