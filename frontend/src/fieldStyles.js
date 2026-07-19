// fieldStyles.js — shared input/textarea/label Tailwind classes
export const inputCls = [
  'w-full rounded-lg border border-slate-200 bg-white',
  'text-slate-800 text-xs font-medium',
  'px-3 py-2 leading-normal',
  'placeholder:text-slate-400',
  'caret-indigo-600',
  'selection:bg-indigo-100 selection:text-slate-900',
  'hover:border-slate-300',
  'focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-400',
  'transition-all duration-200',
].join(' ');

export const selectCls = `${inputCls} cursor-pointer appearance-none`;

export const textareaCls = [
  'w-full rounded-lg border border-slate-200 bg-white',
  'text-slate-800 text-xs font-medium leading-relaxed',
  'px-3 py-2',
  'placeholder:text-slate-400',
  'caret-indigo-600',
  'selection:bg-indigo-100 selection:text-slate-900',
  'hover:border-slate-300',
  'focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-400',
  'resize-none transition-all duration-200',
].join(' ');

export const labelCls = [
  'flex flex-col gap-1.5',
  'text-[10px] font-bold text-slate-500 uppercase tracking-wide',
].join(' ');
