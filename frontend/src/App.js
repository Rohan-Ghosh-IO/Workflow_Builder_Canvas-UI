// App.js
import { Workflow } from 'lucide-react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: '#dde9f7' }}>

      {/* ── Header ─────────────────────────────────────────── */}
      <header className="flex items-center gap-3 px-5 py-2.5 bg-white border-b border-slate-200/60 flex-shrink-0 shadow-sm z-20">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md flex-shrink-0">
          <Workflow size={16} color="white" strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <h1 className="text-[13px] font-bold text-slate-800 leading-tight tracking-tight">Pipeline Builder</h1>
          <p className="text-[10px] text-slate-400 leading-tight font-medium">Visual workflow automation</p>
        </div>
      
      </header>

      {/* ── Toolbar ────────────────────────────────────────── */}
      <PipelineToolbar />

      {/* ── Canvas ─────────────────────────────────────────── */}
      <PipelineUI />

      {/* ── Submit Footer ──────────────────────────────────── */}
      <SubmitButton />

    </div>
  );
}

export default App;
