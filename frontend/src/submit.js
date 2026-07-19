// submit.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSelector } from 'react-redux';

const STATUS = { idle: 'idle', loading: 'loading', success: 'success', error: 'error' };

export const SubmitButton = () => {
  const [status, setStatus] = useState(STATUS.idle);

  const nodes = useSelector((state) => state.pipeline.nodes);
  const edges = useSelector((state) => state.pipeline.edges);

  const handleSubmit = async () => {
    if (status === STATUS.loading) return;
    setStatus(STATUS.loading);
    try {
      const res = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setStatus(STATUS.success);
      setTimeout(() => {
        setStatus(STATUS.idle);
        alert(
          `Pipeline Analysis\n\n` +
          `Nodes:  ${data.num_nodes}\n` +
          `Edges:  ${data.num_edges}\n` +
          `Is DAG: ${data.is_dag ? 'Yes' : 'No — cycle detected'}`
        );
      }, 700);
    } catch (err) {
      setStatus(STATUS.error);
      setTimeout(() => {
        setStatus(STATUS.idle);
        alert(`Submit failed:\n${err.message}`);
      }, 700);
    }
  };

  const config = {
    idle: { label: 'Submit Pipeline', Icon: Send, bg: 'from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700' },
    loading: { label: 'Analyzing...', Icon: Loader2, bg: 'from-indigo-400 to-violet-400' },
    success: { label: 'Done!', Icon: CheckCircle2, bg: 'from-emerald-500 to-teal-500' },
    error: { label: 'Error', Icon: AlertCircle, bg: 'from-rose-500 to-red-500' },
  }[status];

  return (
    <footer className="flex items-center justify-center py-3 px-5 bg-white border-t border-slate-200/60 flex-shrink-0 shadow-sm">
      <motion.button
        type="button"
        onClick={handleSubmit}
        disabled={status === STATUS.loading}
        aria-label="Submit pipeline for analysis"
        aria-busy={status === STATUS.loading}
        className={`
          inline-flex items-center gap-2.5 px-8 py-2.5
          rounded-full font-semibold text-sm text-white
          bg-gradient-to-r ${config.bg}
          shadow-md disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          transition-colors duration-300
        `}
        whileHover={status === STATUS.idle ? { y: -2, boxShadow: '0 10px 28px rgba(99,102,241,0.38)' } : {}}
        whileTap={status === STATUS.idle ? { scale: 0.96 } : {}}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={status}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2"
          >
            <config.Icon
              size={15}
              className={status === STATUS.loading ? 'animate-spin' : ''}
              aria-hidden="true"
            />
            {config.label}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </footer>
  );
};
