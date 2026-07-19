import React from 'react';
import { motion } from 'framer-motion';
import {
  FileInput, BrainCircuit, SendHorizontal, FileText,
  StickyNote, Filter, ShieldCheck, Database, Clock3
} from 'lucide-react';
import { NODE_CONFIG } from './nodeConfig';

const ICONS = {
  customInput:    FileInput,
  llm:            BrainCircuit,
  customOutput:   SendHorizontal,
  text:           FileText,
  customNote:     StickyNote,
  customFilter:   Filter,
  customAuth:     ShieldCheck,
  customDatabase: Database,
  customDelay:    Clock3,
};

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event) => {
    const appData = { nodeType: type };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const Icon = ICONS[type] || FileInput;
  const accent = NODE_CONFIG[type]?.accent;
  const iconBg = accent?.icon || 'bg-slate-500';

  return (
    <motion.div
      draggable
      onDragStart={onDragStart}
      className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl shadow-sm cursor-grab select-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      whileHover={{ y: -2, boxShadow: '0 6px 20px rgba(99,102,241,0.13)', borderColor: '#a5b4fc' }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      role="button"
      aria-label={`Drag ${label} node onto canvas`}
      tabIndex={0}
    >
      <span className={`w-6 h-6 rounded-lg ${iconBg} flex items-center justify-center flex-shrink-0 shadow-sm`}>
        <Icon size={13} color="white" strokeWidth={2.5} aria-hidden="true" />
      </span>
      <span className="text-[12px] font-semibold text-slate-700 whitespace-nowrap leading-none">{label}</span>
    </motion.div>
  );
};