// baseNode.js
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Handle, Position, useReactFlow } from 'reactflow';
import { MoreHorizontal, Trash2 } from 'lucide-react';

const nodeAnim = {
  initial: { opacity: 0, scale: 0.94, y: 6 },
  animate: { opacity: 1, scale: 1,    y: 0 },
  transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
};

export const BaseNode = ({
  id,
  title,
  subtitle,
  icon: Icon,
  accent = {},
  handles = [],
  children,
}) => {
  const {
    bg      = 'bg-slate-50',
    icon: iconBg = 'bg-slate-500',
    badge,
  } = accent;

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { deleteElements } = useReactFlow();

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  //del node
  const handleDelete = (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    deleteElements({ nodes: [{ id }] });
  };

  // Group handles by position for even distribution
  const byPos = handles.reduce((acc, h) => {
    (acc[h.position] ??= []).push(h);
    return acc;
  }, {});

  return (
    <motion.div
      {...nodeAnim}
      className="relative min-w-[240px] w-fit bg-white rounded-xl border border-slate-200 shadow-sm select-none"
      whileHover={{ boxShadow: '0 8px 28px rgba(0,0,0,0.10)', y: -1 }}
      style={{ transition: 'box-shadow 0.2s ease' }}
    >
      {/* ── Handles ─────────────────────────────────────────── */}
      {handles.map((h) => {
        const group = byPos[h.position] ?? [];
        const idx   = group.findIndex((x) => x.id === h.id);
        const count = group.length;
        const pct   = ((idx + 1) * 100) / (count + 1);
        const isV   = h.position === Position.Left || h.position === Position.Right;
        const style = isV ? { top: `${pct}%` } : { left: `${pct}%` };
        const isSource = h.type === 'source';

        return (
          <Handle
            key={h.id}
            type={h.type}
            position={h.position}
            id={h.id}
            style={style}
            aria-label={`${h.type} handle: ${h.id}`}
            className={`
              !w-3.5 !h-3.5 !border-2 !border-white !shadow-md !cursor-crosshair
              transition-transform duration-150
              ${isSource ? '!bg-indigo-500' : '!bg-slate-400'}
            `}
          />
        );
      })}

      {/* ── Header ──────────────────────────────────────────── */}
      <div className={`flex items-center gap-2.5 px-3.5 py-2.5 ${bg} border-b border-slate-100 rounded-t-xl`}>
        {Icon && (
          <div className={`w-7 h-7 rounded-lg ${iconBg} flex items-center justify-center flex-shrink-0 shadow-sm`} aria-hidden="true">
            <Icon size={14} color="white" strokeWidth={2.5} />
          </div>
        )}
        <div className="flex-1 min-w-0 leading-none">
          <div className="flex items-center gap-1.5">
            <p className="text-[13px] font-bold text-slate-800 tracking-tight truncate">{title}</p>
            {badge && (
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-600 border border-indigo-200 uppercase tracking-wide flex-shrink-0">
                {badge}
              </span>
            )}
          </div>
          {subtitle && <p className="text-[10px] text-slate-400 font-medium mt-0.5 truncate">{subtitle}</p>}
        </div>

        {/* ── 3-dot menu ──────────────────────────────────── */}
        <div ref={menuRef} className="relative flex-shrink-0">
          <button
            className="w-6 h-6 rounded-md flex items-center justify-center text-slate-300 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
            aria-label="Node options"
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            onClick={(e) => { e.stopPropagation(); setMenuOpen((o) => !o); }}
          >
            <MoreHorizontal size={13} />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                role="menu"
                aria-label="Node actions"
                initial={{ opacity: 0, scale: 0.92, y: -4 }}
                animate={{ opacity: 1, scale: 1,    y: 0  }}
                exit={{    opacity: 0, scale: 0.92, y: -4 }}
                transition={{ duration: 0.12 }}
                className="absolute right-0 top-8 z-50 min-w-[130px] bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden py-1"
              >
                <button
                  role="menuitem"
                  onClick={handleDelete}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <Trash2 size={13} aria-hidden="true" />
                  Delete node
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────── */}
      {children && (
        <div className="px-3.5 py-3 flex flex-col gap-2.5">
          {children}
        </div>
      )}
    </motion.div>
  );
};
